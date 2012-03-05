var mongoose    = require("mongoose");

var Schema      = mongoose.Schema;
var ObjectId    = Schema.ObjectId;

var Technique = new Schema({
  name        : {type:String, default: ''},

  vimeoid     : {type:String, default: ''},
  youtubeid     : {type:String, default: ''},

  continuations  : Array,
  counters    : Array,
  variations  : Array,
  defenses    : Array,

  created_at  : {type : Date, default : Date.now},
  created_by  : {type:ObjectId, default: '4db3b3b582976b0000000002'},

featured    : {type:Boolean, default: false},
  votes       : Number,
  favs        : Number,

  meta        : Array,
  starttime : 0,
  cliplength : Number,

  action : {type:String, default: ''},
  classification : {type:String, default: ''},
  direction : {type:String, default: ''},
  location : {type:String, default: ''},
  position : {type:String, default: ''}

});

exports.Technique = Technique;
