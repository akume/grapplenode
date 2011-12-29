steal( 'jquery/controller',
      'jquery/controller/view',
      'jquery/view/ejs',
      'suna/assetlist',
      'suna/assetfilter',
      'suna/videoplayer',
      'mxui/data')
	.then( './views/init.ejs', function($){

/**
 * @class Grapplenode.Techniques
 */
$.Controller('Grapplenode.Techniques',
/** @Static */
{
	defaults :
  {
    params: new Mxui.Data({ filter: "browse" })
  },
  listensTo: ['playasset']
},
/** @Prototype */
{
	init : function(){
		this.element.html(this.view("init.ejs"));
    var technique = Grapplenode.Models.Technique;

    this.element.find('.video').suna_videoplayer();
    /*
    * { model: technique, params: new Mxui.Data({ filter: "featured" }),
     detailtemplate: '//screeners/series/views/detailtemplate.ejs'
     }
    * */
    this.element.find('.filter').suna_assetfilter({ model: technique, params: this.options.params,
      filters: [{ value: 'recent', label: 'Recently Added'},
                {value: 'favorites', label: 'Favorites'},
                {value: 'standing', label: 'Standing'},
                {value: 'mount', label: 'Mount'},
                {value: 'smount', label: 'S-Mount'},
                {value: 'back', label: 'Back'},
                {value: 'turtle', label: 'Turtle'},
                {value: 'sidecontrol', label: 'Side Control'},
                {value: 'kneeonbelly', label: 'Knee on Belly'},
                {value: 'northsouth', label: 'North/South'},
                {value: 'closedG', label: 'Closed'},
                {value: 'rubberG', label: 'Rubber'},
                {value: 'spiderG', label: 'Spider'},
                {value: 'delarivaG', label: 'de la Riva'},
                {value: 'revdelarivaG', label: 'Reverse de la Riva'},
                {value: 'butterflyG', label: 'Butterfly'},
                {value: 'halfG', label: 'Half'},
                {value: 'invertedhalfG', label: 'Inverted-Half'},
                {value: 'deephalfG', label: 'Deep Half'},
                {value: 'tornadoG', label: 'Tornado'},
                {value: 'xG', label: 'X-Guard'},
                {value: '50/50G', label: '50/50'},
                {value: 'rules', label: 'IBJJF Rules'}]
    })

    this.element.find('.list').suna_assetlist({ model: technique, params: this.options.params,
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    })
	},

  '.list playasset': function(el, ev, asset)
  {
    this.loadvideo(asset);
  },

  loadvideo: function(asset)
  {
    this.element.find('.video').suna_videoplayer('playasset', asset)
  },

  "{$.route} tab set": function (clientState, ev, val) {
      if (val != "tecniques")
        this.element.find('.video').suna_videoplayer("hideasset");
    }
})

});