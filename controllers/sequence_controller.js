var mongoose    = require("mongoose");
var util        = require("util");
var fs          = require("fs");

var Sequence = mongoose.model("Sequence");

module.exports = {

  // GET /techniques/:id
  get_sequences : function(req, res){

    var query = Sequence.find({});

    //TODO: add keyword metadata search
    if (req.param('search'))
      query.where('name' , RegExp(req.param('search').replace('.', ' '), 'i'));

    if (req.param('featured') && req.param('featured') == 'true')
      query.where('featured' , true);

    if (req.param('popular'))
      query.sort('votes', -1);

    if (req.param('limit'))
      query.limit(parseInt(req.param('limit')));

    if (req.param('offset'))
      query.skip(parseInt(req.param('offset')));

    query.run(function(err, sequences){
      if (sequences){
        res.send(JSON.stringify(sequences), 200);
      } else {
        res.send("no sequences found", 404);
      }
    });
  },

  get_sequence : function(req, res){
    console.log(req.param('_id'));
    Sequence.findById(req.param('_id'), function (err, sequence){
      if (sequence){
        res.send(JSON.stringify(sequence), 200);
      } else {
        res.send("no sequence found", 404);
      }
    });
  }

};
