var mongoose    = require("mongoose");
var util        = require("util");
var fs          = require("fs");

var User = mongoose.model("User");
var Technique = mongoose.model("Technique");

module.exports = {
  
  // GET /
  get_index : function(req, res){
    Technique.findOne({featured:true},{},{},function(err,technique){
		if (technique){
          res.render('index', {title: 'Grappledge', technique:technique});
        } else {
          res.send("no techniques found", 404);
        }
	});
  },
  
  // /sessions/new
  sessions_new: function(req, res)
  {
  	res.render('sessions/new', {locals: {redir: req.query.redir}});
  }, 
  
  sessions: function(req, res)
  {
  	User.findOne({username:req.body.login},{},{},function(err, user)
  	{
  		if (user && user.password == req.body.password)
  		{
  			req.session.user = user;
  			res.redirect(req.body.redir || '/');
  		}
  		else 
  		{
  			req.flash('warn', 'Login failed');
  			res.render('sessions/new', {locals: {redir: req.body.redir}});
  		}
  	})
  },
  
  sessions_destroy: function(req, res)
  {
  	delete req.session.user;
  	res.redirect('/');
  }
  
}
