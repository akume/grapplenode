steal( 'jquery/controller',
        'jquery/event/hover',
        'jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Grapplenode.Navigation
 */
$.Controller('Grapplenode.Navigation',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function()
  {
		this.element.html("//grapplenode/navigation/views/init.ejs",{username: this.options.username});
	},

  "{$.route} tab set": function (clientState, ev, val) {
    this.element.find('.tab.active').removeClass('active').end()
    if (this.element.find('a[alt='+val+']').length == 0)
      val = this.options.defaultTab

    this.element.find('.' + val).addClass('active');
    $('body').find('.activetab').removeClass('activetab').end()
      .find('#' + val).addClass('activetab')

    if (this.options.onTab)
      this.options.onTab(val);
  },

  ".tab click": function (elem, ev) {
    $.route.attr('tab',$(elem).attr('alt'))
  },

  "#auth-links click": function(elem, ev)
  {
    this.element.find('#auth-types').fadeIn('fast');
  },

  "#auth-links hoverleave": function(elem, ev)
  {
    this.element.find('#auth-types').hide();
  },

  "#auth-types button click": function(elem, ev)
  {
  }


  })

});