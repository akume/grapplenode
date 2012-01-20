steal( 'jquery/controller',
    'jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Grapplenode.Home
 */
$.Controller('Grapplenode.Home',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html("//grapplenode/home/views/init.ejs",{});
	},

  "input.search keyup": function (elem, ev) {
    if (ev.keyCode === 13) {
      this.search(elem, ev)
    } else if ($(elem).val().length >= 3) {
      //this.options.model.findAll({ search: $(elem).val() }, this.callback('autosearch'));
    } else {
      //this.element.find('.autocomplete').html('').hide();
    }
  },

  search:function(elem, ev)
  {
    $.route.attrs({search: $(elem).val()}, true)
    $(elem).val('');
  }
})

});