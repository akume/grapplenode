var mongoose    = require("mongoose");
var util        = require("util");
var fs          = require("fs");
var oauthSecrets = JSON.parse(fs.readFileSync('./secrets.json', 'utf-8')),
OAuth2 = require('oauth2').OAuth2,
HTTPConsume = require('../util/httpconsume').HTTPConsume;

var User = mongoose.model("User");
var Technique = mongoose.model("Technique");

var https = require('https'), qs = require('querystring');

function createUser(req, res, data) {
	User.findOne({email:data.email}, {}, {}, function(err, user) {
		if(user){
			user.facebookid= data.id;
			user.save( function() {
				sessionUserRedirect(req, res, user);
			});
		} else {
			var user = new User({
				email: data.email,
				facebookid: data.id
			});
			user.save( function() {
				sessionUserRedirect(req, res, user);
			});		
		}
	});
}

function getUser(req, res, data) {
	if (data) {
		User.findOne({facebookid:data.id}, {}, {}, function(err, user) {
			if (user) {
				sessionUserRedirect(req, res, user);
			} else {
				createUser(req, res, data);
			}
		});
	} else if (req.body.login) {
		User.findOne({
			username:req.body.login
		}, {}, {}, function(err, user) {
			if (user && user.password == req.body.password) {
				sessionUserRedirect(req, res, user);
			} else {
				req.flash('warn', 'Login failed');
				res.render('auth/new', {
					locals: {
						redir: req.body.redir
					}
				});
			}
		})
	} else {
		req.flash('warn', 'Login failed');
		res.render('auth/new', {
			locals: {
				redir: req.body.redir
			}
		});
	}
}

function sessionUserRedirect(req, res, user) {
	req.session.user = user;
	if (req.body)
		res.redirect(req.body.redir || '/');
	else
		res.redirect('/');
}

module.exports = {

	// GET /
	get_index : function(req, res) {
		Technique.findALL({
			featured:true
		}, {}, {}, function(err,techniques) {
			if (techniques) {
				res.render('index', {
					title: 'Grappledge',
					technique:techniques
				});
			} else {
				res.send("no techniques found", 404);
			}
		});
	},
	facebook_auth: function(req, res) {

		var client_id = oauthSecrets.facebook.clientId;
		var provider = 'facebook';
		var redirect_uri = 'http://localhost:3001/auth/facebook/callback';
		res.redirect('https://www.facebook.com/dialog/oauth?client_id=' + client_id
		+ '&redirect_uri='+ redirect_uri+'&scope=email');
	},
	google_auth: function(req, res) {

		var client_id = '582833444971.apps.googleusercontent.com';
		var provider = 'google';
		var redirect_uri = 'http://localhost/auth/google/callback';

		res.redirect(
		'https://accounts.google.com/o/oauth2/auth?client_id=' + client_id
		+ '&redirect_uri=' + redirect_uri +
		'&scope=https://www.google.com/m8/feeds/&response_type=code');
	},
	provider_auth_callback: function(req, res) {
		if (req.params.provider === "facebook") {
			var oauth2 = new OAuth2({
				base: "graph.facebook.com",
				tokenUrl: "/oauth/access_token",
				redirectUri: 'http://localhost:3001/auth/facebook/callback',
				id: oauthSecrets.facebook.clientId,
				secret: oauthSecrets.facebook.clientSecret
			});

			oauth2.accessToken(req.query.code, {}, function(status, result) {
				if (status == 200) {
					var httpconsume = new HTTPConsume({
						base:'graph.facebook.com',
						path:'/me'
					});
					var obj = qs.parse(result);
					console.log(obj.access_token)
					httpconsume.request({access_token: obj.access_token}, {}, 
						function(status, data) {
							getUser(req, res, data)
					});
				}
			});
		}

		if (req.params.provider === "google") {
			var oauth2 = new OAuth2({
				host: "accounts.google.com",
				accessTokenPath: "/o/oauth2/token",
				clientId: oauthSecrets.google.clientId,
				clientSecret: oauthSecrets.google.clientSecret
			});
			oauth2.accessToken(req.query.code, 'http://127.0.0.1:3001/auth/google/callback', function(error, result) {
				res.send(JSON.stringify({
					error: error,
					result: result
				}));
			});
		}
	},
	// /sessions/new
	sessions_new: function(req, res) {
		res.render('sessions/new', {
			locals: {
				redir: req.query.redir
			}
		});
	},
	sessions: function(req, res) {
		getUser(req, res, null);
	},
	sessions_destroy: function(req, res) {
		delete req.session.user;
		res.redirect('/');
	}
}