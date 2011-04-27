var mongoose    = require("mongoose");
var util        = require("util");
var fs          = require("fs");

var Technique = mongoose.model("Technique");

module.exports = {
  
  // GET /techniques/:id
  get_technique : function(req, res){
    Technique.find({},{},{}, function(err, techniques){
        if (techniques){
          res.send(JSON.stringify(techniques), 200);
        } else {
          res.send("no techniques found", 404);
        }
    });
  }
  
}
