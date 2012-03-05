steal('jquery/model', function(){

/**
 * @class Grapplenode.Models.Sequence
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend sequence services.  
 */
$.Model('Grapplenode.Models.Sequence',
/* @Static */
{
  //TODO make sequence route and controller on the server.
  id:       '_id',
	findAll:  "/sequences",
  findOne:  "/sequences/{_id}",
  create:   "/sequences",
 	update:   "/sequences/{_id}",
  destroy:  "/sequences/{_id}"
},
/* @Prototype */
{});

})