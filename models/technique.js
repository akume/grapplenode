var mongoose    = require("mongoose");

var Schema      = mongoose.Schema;
var ObjectId    = Schema.ObjectId;

var Technique = new Schema({
  name        : String,
  url         : String,
  timeline    : Array,
  directions  : Array,
  counters    : Array,
  created_at  : {type : Date, default : Date.now},
  created_by  : ObjectId,
  meta        : {
        votes : Number
      , favs  : Number
      , keys  : Array
    }
});

exports.Technique = Technique;