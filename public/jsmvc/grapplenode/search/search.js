steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Grapplenode.Search
 */
$.Controller('Grapplenode.Search',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html("//grapplenode/search/views/init.ejs",{});
    var technique = Grapplenode.Models.Technique;

    /*
     * { model: technique, params: new Mxui.Data({ filter: "featured" }),
     detailtemplate: '//screeners/series/views/detailtemplate.ejs'
     }
     * */
    this.element.find('.filter').suna_assetfilter({ model: technique, params: this.options.params,
      customtemplate:'//grapplenode/techniques/views/filter_template.ejs',
      filtertext:'filter by keyword',
      filters: [
        {
          selectlabel: "classifications",
          selectoptions: [{value: '', label: ''},
            {value: 'takedown', label: 'Takedown'},
            {value: 'pass', label: 'Pass'},
            {value: 'sweep', label: 'Sweep'},
            {value: 'transition', label: 'Transition'},
            {value: 'control', label: 'Control'},
            {value: 'submission', label: 'Submission'}]
        },
        {
          selectlabel: "positions",
          selectoptions: [{value: '', label: ''},
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
        },
        {
          selectlabel: "classifications",
          selectoptions: [{value: '', label: ''},
            {value: 'neutral', label: 'Neutral'},
            {value: 'top', label: 'Top'},
            {value: 'bottom', label: 'Bottom'}]
        },
        {
          selectlabel: "actions",
          selectoptions: [{value: '', label: ''},
            {value: 'offense', label: 'Offense'},
            {value: 'defense', label: 'Defense'},
            {value: 'counter', label: 'Counter'}]
        },
        {
          selectlabel: "sort by",
          selectoptions: [{value: 'relevance', label: 'Relevance'},
            {value: 'upload', label: 'Upload Date'},
            {value: 'view', label: 'View Count'},
            {value: 'rating', label: 'Rating'}
          ]
        }
      ]});


    this.element.find('.list').suna_assetlist({ model: technique, params: this.options.params,
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });
	}
})

});