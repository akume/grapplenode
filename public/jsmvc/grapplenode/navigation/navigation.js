steal( 'jquery/controller',
        'jquery/view/ejs')
	.then( './views/init.ejs', function($){

/**
 * @class Grapplenode.Navigation
 */
$.Controller('Grapplenode.Navigation',
/** @Static */
{
	defaults : {
  }
},
/** @Prototype */
{
	init : function()
  {
		this.element.html("//grapplenode/navigation/views/init.ejs",{username: this.options.username});
	},

  "{$.route} nav set": function (clientState, ev, val) {
    this.setnav(val);
  },

  "{$.route} search set": function (clientState, ev, val) {
    this.setnav("search");
  },

  "{$.route} techniques set": function (clientState, ev, val) {
    this.setnav("techniques");
  },

  "{$.route} t set": function (clientState, ev, val) {
      this.setnav("t");
  },

  setnav: function(val)
  {
    this.element.find('.active').removeClass('active').end()
      .find('.nav[alt ='+val+']').parent().addClass('active')

    if (this.options.onNav)
      this.options.onNav(val);
  },

  ".nav click": function (elem, ev) {
    $.route.attrs({nav:$(elem).attr('alt')}, true)
  },

  "#auth-links click": function(elem, ev)
  {
    this.element.find('#auth-types').fadeIn('fast');
  },


  "#auth-types button click": function(elem, ev)
  {
  }


  })

});