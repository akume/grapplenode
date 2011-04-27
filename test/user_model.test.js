var app = require('../app')
	, assert = require('assert')
	, mongoose    = require("mongoose")
	, User = mongoose.model("User");

require('should');
require('console')
	
	
module.exports = {
	'make sure user default properties': function(){
		User.findOne({'email':'akume325@gmail.com'}, function(err, user){
			user.should.have.property('email');
			user.should.have.property('username');
			user.should.have.property('password');	
		})
	},
	
	'make sure user email validates': function(){
		user= new User();
		user.email= 'asdf';
		user.username= 'asdf';
		user.password= 'asdf';
		user.save(function(err){
			assert.equal(err.message, 'Validation failed');
		});
	}
}
  