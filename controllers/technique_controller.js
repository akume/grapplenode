var mongoose    = require("mongoose");
var util        = require("util");
var fs          = require("fs");

var Technique = mongoose.model("Technique");

module.exports = {
  
  // GET /techniques/:id
  get_techniques : function(req, res){

    var query = Technique.find({});

    //TODO: add keyword metadata search
    if (req.param('search'))
      query.where('name' , RegExp(req.param('search').replace('.', ' '), 'i'));

    if (req.param('search'))
      query.where('name' , RegExp(req.param('search').replace('.', ' '), 'i'));

    if (req.param('classification'))
      query.where('classification' , req.param('classification'));

    if (req.param('position'))
      query.where('position' , req.param('position'));

    if (req.param('location'))
      query.where('location' , req.param('location'));

    if (req.param('action'))
      query.where('action' , req.param('action'));

    if (req.param('limit'))
      query.limit(parseInt(req.param('limit')));

    if (req.param('offset'))
      query.skip(parseInt(req.param('offset')));

    query.run(function(err, techniques){
          if (techniques){
            res.send(JSON.stringify(techniques), 200);
          } else {
            res.send("no techniques found", 404);
          }
      });
  },

  get_technique : function(req, res){
    console.log(req.param('_id'));
    Technique.findById(req.param('_id'), function (err, technique){
      if (technique){
        res.send(JSON.stringify(technique), 200);
      } else {
        res.send("no techniques found", 404);
      }
    });
  }
  
};
