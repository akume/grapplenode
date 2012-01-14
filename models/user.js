var mongoose    = require("mongoose");

var Schema      = mongoose.Schema;
var ObjectId    = Schema.ObjectId;

var User = new Schema({
	email		: {type:String , index:{unique: true}, validate:[/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Please enter a valid email"]},
	username	: {type: String, index:{unique: true} },
	password	: String,
	role		: {type: String, default: 'user' },
	facebookid	: {type: Number, index:{unique: true} },
  //a set of sequences that the user saves
  sequences : Array,
  favorites : Array
});

exports.User = User;
