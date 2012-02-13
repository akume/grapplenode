/**
 * Module dependencies.
 */

var express 	= require('express'),
	mongoose    = require("mongoose"),
	everyauth	= require('everyauth'),
	app_version = "1.0.0",
	app_port,
  db,
	app = module.exports = express.createServer();


/*
 * models
 * all the model imports and mongoose mappings and stuff
 */
mongoose.model("User", require("./models/user").User);
mongoose.model("Technique", require("./models/technique").Technique);

//Authentication
var util = require('util'),
  fs	 = require('fs'),
  Promise = everyauth.Promise,
  users 	= require('./lib/users'),
  oauthSecrets = JSON.parse(fs.readFileSync('secrets.json', 'utf-8')),
  User = mongoose.model("User");

  var usersById = {};
  var nextUserId = 0;

  function addUser (source, sourceUser) {
    var user;
    if (arguments.length === 1) { // password-based
      user = sourceUser = source;
      user.id = ++nextUserId;
      return usersById[nextUserId] = user;
    } else { // non-password-based
      user = usersById[++nextUserId] = {id: nextUserId};
      user[source] = sourceUser;
    }
    return user;
  }

  usersByLogin = {
    'n3vergiveb4ck': addUser({ login: 'n3vergiveb4ck', password: 'ch4ngem3'})
  };

everyauth.password
  .loginWith('email')
  .getLoginPath('/login')
  .postLoginPath('/login')
  .loginView('login.ejs')
//    .loginLocals({
//      title: 'Login'
//    })
//    .loginLocals(function (req, res) {
//      return {
//        title: 'Login'
//      }
//    })
  .loginLocals( function (req, res, done) {
    setTimeout( function () {
      done(null, {
        title: 'Async login'
      });
    }, 200);
  })
  .authenticate( function (login, password) {
    var errors = [];
    if (!login) errors.push('Missing login');
    if (!password) errors.push('Missing password');
    if (errors.length) return errors;
    var user = usersByLogin[login];
    if (!user) return ['Login failed'];
    if (user.password !== password) return ['Login failed'];
    return user;
  })
  .getRegisterPath('/register')
  .postRegisterPath('/register')
  .registerView('register.ejs')
//    .registerLocals({
//      title: 'Register'
//    })
//    .registerLocals(function (req, res) {
//      return {
//        title: 'Sync Register'
//      }
//    })
  .registerLocals( function (req, res, done) {
    setTimeout( function () {
      done(null, {
        title: 'Async Register'
      });
    }, 200);
  })
  .validateRegistration( function (newUserAttrs, errors) {
    var login = newUserAttrs.login;
    if (usersByLogin[login]) errors.push('Login already taken');
    return errors;
  })
  .registerUser( function (newUserAttrs) {
    var login = newUserAttrs[this.loginKey()];
    return usersByLogin[login] = addUser(newUserAttrs);
  })
  .loginSuccessRedirect('/')
  .registerSuccessRedirect('/');

everyauth.facebook
  .appId(oauthSecrets.facebook.appId)
  .appSecret(oauthSecrets.facebook.appSecret)
  .entryPath('/auth/facebook')
  .callbackPath('/auth/facebook/callback')
  .scope('email')
  .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
    console.log(fbUserMetadata);
    var promise = new Promise();
    users.findOrCreateByFacebookData(session, fbUserMetadata, promise);
    return promise;
  })
  .redirectPath('/');

everyauth.google
  .appId(oauthSecrets.google.clientId)
  .appSecret(oauthSecrets.google.clientSecret)
  .scope('https://www.google.com/m8/feeds') // What you want access to
  .findOrCreateUser( function (session, accessToken, accessTokenExtra, googleUserMetadata) {
		console.log(googleUserMetadata);
		var promise = new Promise();
		users.findOrCreateByGoogleData(session, googleUserMetadata, promise);
		return promise;
  })
  .redirectPath('/');

// Routes
everyauth.helpExpress(app);
var index_controller= require("./controllers/index_controller");
var technique_controller= require("./controllers/technique_controller");
var error_controller= require("./controllers/error_controller");
var admin_controller= require("./controllers/admin_controller");

function authUser(req, res, next) {
  // You would fetch your user from the db
  if (req.loggedIn) {
    next();
  } else {
    res.redirect('/login')
  }
}



// Configuration
var pub = __dirname + '/public';
app.configure(function(){
  //app.use(express.logger());
  app.use(express.methodOverride());
  app.use(express.bodyParser());

  app.use(express.cookieParser());
  app.use(express.session({ secret: 'cum to me' }));
  app.use(everyauth.middleware());

  app.use(app.router);
  app.use(express.compiler({ src: pub, enable: ['sass'] }));

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  console.log("grapplenode version " + app_version + " now running on port " + app_port);
});

app.configure('development', function(){
  app_port= 3001;
  db  = mongoose.connect("mongodb://127.0.0.1/grapplenode");

  app.use(express.static(pub));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

app.configure('production', function(){
  app_port= process.env.PORT;
  db  = mongoose.connect(process.env.MONGOLAB_URI);

  var oneYear = 31557600000;
  app.use(express.static(pub, {maxAge:oneYear}));
  app.use(express.errorHandler());
});

app.dynamicHelpers({
  session: function(req, res)
  {
    return req.session;
  },
  flash: function(req, res)
  {
    return req.flash();
  }
});


app.get('/', authUser, index_controller.get_index);
app.post('/', authUser, index_controller.get_index);
app.get('/techniques/:_id', authUser,  technique_controller.get_technique);
app.get('/techniques', authUser,  technique_controller.get_techniques);
app.get('/admin/', authUser,  admin_controller.get_admin);
/*
app.get('/error/:message', error_controller.get_error);
app.get('/admin/', authUser, adminUser, admin_controller.get_admin);
*/



// Only listen on $ node app.js
if (!module.parent) {
  app.listen(app_port);
  console.log("Express server listening on port %d " + (new Date).toTimeString() , app_port);
}

// exit if any js file or template file is changed.
// it is ok because this script encapsualated in a batch while(true);
// so it runs again after it exits.
var autoexit_watch=require('./lib/autorestart');

var on_autoexit=function (filename) {console.log("bye bye"); }; // if it returns false it means to ignore exit this time;
autoexit_watch(__dirname,".js", on_autoexit);
//autoexit_watch(__dirname,".html", on_autoexit);
