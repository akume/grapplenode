steal('jquery/model', function(){

/**
 * @class Grapplenode.Models.Technique
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend technique services.  
 */
$.Model('Grapplenode.Models.Technique',
/* @Static */
{
	findAll: "/techniques.json",
  	findOne : "/techniques/{id}.json", 
  	create : "/techniques.json",
 	update : "/techniques/{id}.json",
  	destroy : "/techniques/{id}.json"
},
/* @Prototype */
{});

})