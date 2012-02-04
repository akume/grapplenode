/**
 * Module dependencies.
 */

var express 	= require('express'),
	mongoose    = require("mongoose"),
	everyauth	= require('everyauth'),
	db_host     = "127.0.0.1",
	db_name     = "grapplenode",
	app_version = "1.0.0",
	app_port    = 3001,

	app = module.exports = express.createServer(),
	db  = mongoose.connect("mongodb://" + db_host + "/" + db_name);




/*
 * models
 *
 * all the model imports and mongoose mappings and stuff
 *
 */
mongoose.model("User", require("./models/user").User);
mongoose.model("Technique", require("./models/technique").Technique);

//Authentication
var util = require('util'),
  fs	 = require('fs'),
  Promise = everyauth.Promise,
  users 	= require('./lib/users'),
  oauthSecrets = JSON.parse(fs.readFileSync('secrets.json', 'utf-8')),
  User = mongoose.model("User");;

everyauth.facebook
  .appId(oauthSecrets.facebook.appId)
  .appSecret(oauthSecrets.facebook.appSecret)
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


// Configuration
var pub = __dirname + '/public';
app.configure(function(){
  //app.use(express.logger());
  app.use(express.methodOverride());
  app.use(express.bodyParser());

  app.use(express.cookieParser());
  app.use(express.session({ secret: 'cum to me' }));
  app.use(everyauth.middleware());
  everyauth.everymodule.findUserById( function (userId, callback) {
	  User.findById(userId, callback);
	  // callback has the signature, function (err, user) {...}
	});

  app.use(app.router);
  app.use(express.compiler({ src: pub, enable: ['sass'] })); 

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  console.log("grapplenode version " + app_version + " now running on port " + app_port);
}); 

app.configure('development', function(){
  app.use(express.static(pub));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
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


// Routes
everyauth.helpExpress(app);
var index_controller= require("./controllers/index_controller");
var technique_controller= require("./controllers/technique_controller");
var error_controller= require("./controllers/error_controller");
var admin_controller= require("./controllers/admin_controller");

app.get('/', index_controller.get_index);
app.get('/techniques', technique_controller.get_technique);
app.get('/techniques/:id', technique_controller.get_technique);
app.get('/admin/', admin_controller.get_admin);
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

var on_autoexit=function (filename) {console.log("bye bye"); } // if it returns false it means to ignore exit this time;  
autoexit_watch(__dirname,".js", on_autoexit);
//autoexit_watch(__dirname,".html", on_autoexit);
