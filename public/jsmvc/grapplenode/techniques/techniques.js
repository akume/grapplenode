steal( 'jquery/controller',
      'jquery/controller/view',
      'jquery/view/ejs',
      'suna/assetlist',
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

    /*this.element.find('.carousel').suna_carousel({ model: technique, params: new Mxui.Data({ filter: "featured" }),
      detailtemplate: '//screeners/series/views/detailtemplate.ejs'
    });

    this.element.find('.filter').suna_assetfilter({ model: technique, params: this.options.params,
      filters: [{ value: 'recent', label: 'Recent Episodes' }, { value: 'title', label: 'Title'}]
    })*/

    this.element.find('.list').suna_assetlist({ model: technique, params: this.options.params,
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    })
	}
})

});