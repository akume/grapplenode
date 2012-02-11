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
  id:       '_id',
	findAll:  "/techniques",
  findOne : "/techniques/{_id}",
  create :  "/techniques",
 	update :  "/techniques/{_id}",
  destroy : "/techniques/{_id}"
},
/* @Prototype */
{
  formatname: function(){
    if (this.name.length > 20)
      return this.name.substring(0,20) + "...";
    else
      return this.name;
  }

});

});