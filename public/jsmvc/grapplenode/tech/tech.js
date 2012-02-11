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
    params: new Mxui.Data,
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
    this.element.find('.videocontainer').suna_videoplayer("playasset", tech).end()
      .find('.sequences').html("//grapplenode/tech/views/list.ejs",{tech: tech});
  },

  "{$.route} t set": function (clientState, ev, val) {
    this.options.params.attr('_id', val);
    this.newRequest();
  },

  newRequest: function () {
    Grapplenode.Models.Technique.findOne(this.options.params.attrs(), this.callback('show'));
  },

  addSequence:function(tech)
  {

  }
})

});