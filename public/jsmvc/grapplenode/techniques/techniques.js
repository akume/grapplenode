steal('jquery/controller',
      'jquery/controller/view',
      'jquery/view/ejs',
      'mxui/data',
      'suna/assetlist',
      'suna/assetfilter')
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

    /* this.element.find('#sublinks').suna_assetfilter({ model: technique, params: this.options.params,
     filters: [{value: 'browse', label: 'Browse'},
     {value: 'popular', label: 'Most Popular'},
     {value: 'recent', label: 'Recently Added'},
     {value: 'favorites', label: 'Favorites'},
     {value: 'spotlight', label: 'Spotlight'}
     ]});*/

	},

  "{$.route} tab set": function (clientState, ev, val) {
    }
})

});