var mongoose    = require("mongoose");

var Schema      = mongoose.Schema;
var ObjectId    = Schema.ObjectId;

var User = new Schema({
	email		: {type:String ,validate:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/},
	username	: String,
	password	: String,
	role		: String
});

exports.User = User;