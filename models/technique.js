var mongoose    = require("mongoose");

var Schema      = mongoose.Schema;
var ObjectId    = Schema.ObjectId;

var Technique = new Schema({
  name        : {type:String, default: ''},
  url         : {type:String, default: ''},
  timeline    : Array,
  directions  : Array,
  counters    : Array,
  created_at  : {type : Date, default : Date.now},
  created_by  : {type:ObjectId, default: '4db3b3b582976b0000000002'},
  featured    : {type:Boolean, default: false},
  meta        : {	
        votes : Number
      , favs  : Number
      , keys  : Array
    }
});

exports.Technique = Technique;