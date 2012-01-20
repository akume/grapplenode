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
    this.settab(val);
  },

  "{$.route} search set": function (clientState, ev, val) {
    this.settab("search");
  },

  settab: function(val)
  {
    this.element.find('.nav.active').removeClass('active').end()

    $('body').find('.activenav').removeClass('activenav').end()
      .find('#' + val).addClass('activenav')

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