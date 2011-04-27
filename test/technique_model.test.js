var app = require('../app')
	, assert = require('assert')
	, mongoose    = require("mongoose")
	, Technique = mongoose.model("Technique");

require('should');
	
	
module.exports = {
	'make sure technique default properties': function(){
		var technique = new Technique();
		technique.should.have.property('name');
		technique.should.have.property('url');
		technique.should.have.property('timeline');
		technique.should.have.property('directions');
		technique.should.have.property('counters');
		technique.should.have.property('created_at');
		technique.should.have.property('created_by');
		technique.should.have.property('meta');
		technique.should.have.property('featured');
	}
}
  