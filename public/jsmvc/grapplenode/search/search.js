steal( 'jquery/controller',
        'jquery/view/ejs',
        'mxui/data')
	.then( './views/init.ejs',
        './views/filter_template.ejs',
        function($){

/**
 * @class Grapplenode.Search
 */
$.Controller('Grapplenode.Search',
/** @Static */
{
	defaults : {
    params: new Mxui.Data({ })
  }
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
        customtemplate:'//grapplenode/search/views/filter_template.ejs',
        filtertext:'filter by keyword',
        filters: [
        {
          selectid:'classification',
          selectlabel: "classifications",
          selectoptions: [{value: '', label: ''},
            {value: 'takedown', label: 'Takedown'},
            {value: 'pass', label: 'Pass'},
            {value: 'sweep', label: 'Sweep'},
            {value: 'tc', label: 'Transition/Control'},
            {value: 'escape', label: 'Escape'},
            {value: 'submission', label: 'Submission'}]
        },
        {
          selectid:'position',
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
          selectid:'location',
          selectlabel: "locations",
          selectoptions: [{value: '', label: ''},
            {value: 'neutral', label: 'Neutral'},
            {value: 'top', label: 'Top'},
            {value: 'bottom', label: 'Bottom'}]
        },
        {
          selectid: "action",
          selectlabel: "actions",
          selectoptions: [{value: '', label: ''},
            {value: 'offense', label: 'Offense'},
            {value: 'defense', label: 'Defense'},
            {value: 'counter', label: 'Counter'}]
        },
        {
          selectid: "order",
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
	},

  "{$.route} search set": function (clientState, ev, val) {
    var technique = Grapplenode.Models.Technique;
    this.options.params.attr('search', val);
  },

  "select change": function(elem, ev)
  {
    if($(elem).val == '')
      this.options.params.removeAttr($(elem).attr('id'));
    else
      this.options.params.attr($(elem).attr('id'), $(elem).val())
  }

})

});