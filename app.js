require.paths.unshift(__dirname); //make local paths accessible
/**
 * Module dependencies.
 */
var express = require('express');
var mongoose    = require("mongoose");
var controller  = require("./util/controller");


var db_host     = "127.0.0.1";
var db_name     = "grapplenode";
var app_version = "0.0.1";
var app_port    = 3001;

var app = module.exports = express.createServer();
var db  = mongoose.connect("mongodb://" + db_host + "/" + db_name);

/*
* models
*
* all the model imports and mongoose mappings and stuff
*
*/
//mongoose.model("User", require("./models/user").User);
mongoose.model("Technique", require("./models/technique").Technique);


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(express.compiler({ src: __dirname + '/public', enable: ['sass'] }));
  app.use(express.static(__dirname + '/public'));
  
  controller.bootControllers(app);
  
  console.log("grapplenode version " + app_version + " now running on port " + app_port);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Grappledge'
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(app_port);
  console.log("Express server listening on port %d " + (new Date).toTimeString() , app.address().port);
}

// exit if any js file or template file is changed.
// it is ok because this script encapsualated in a batch while(true);
// so it runs again after it exits.
var autoexit_watch=require('lib/autorestart');

var on_autoexit=function (filename) {console.log("bye bye"); } // if it returns false it means to ignore exit this time;  
autoexit_watch(__dirname,".js", on_autoexit);
//autoexit_watch(__dirname,".html", on_autoexit);
