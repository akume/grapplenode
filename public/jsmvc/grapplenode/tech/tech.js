steal( 'jquery/controller',
        'jquery/view/ejs',
        'suna/videoplayer')
	.then( './views/init.ejs',
          './views/list.ejs',
  function($){

/**
 * @class Grapplenode.Tech
 */
$.Controller('Grapplenode.Tech',
/** @Static */
{
	defaults : {
    params: new Mxui.Data({}),
    model: Grapplenode.Models.Technique
  }
},

/** @Prototype */
{
	init : function(){
    this.element.html("//grapplenode/tech/views/init.ejs",{})
      .find('.videocontainer').suna_videoplayer({onSequence:this.callback('addSequence')});
	},

  show: function(tech){
    this.element.find('.videocontainer').suna_videoplayer("playasset", tech[0]).end()
      .find('.sequences').html("//grapplenode/tech/views/list.ejs",{tech: tech[0]});
  },

  "{$.route} t set": function (clientState, ev, val) {
    this.options.params.attr('id', val);
  },

  "{params} updated.attr": function (params, ev, attr, val) {
    if (attr !== 'count' && attr !== 'updating') {
      //want to throttle for rapid updates
      params.attr('updating', true);
      clearTimeout(this.newRequestTimer);
      this.newRequestTimer = setTimeout(this.callback('newRequest'), 100);
    }
  },

  newRequest: function () {
    this.options.model.findOne(this.options.params.attrs(), this.callback('show'));
  },

  addSequence:function(tech)
  {

  }
})

});