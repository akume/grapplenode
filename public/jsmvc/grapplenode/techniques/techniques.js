steal('jquery/controller',
      'jquery/controller/view',
      'jquery/view/ejs',
      'mxui/data',
      'suna/assetlist',
      'suna/assetfilter')
	.then( './views/init.ejs',
        './views/list_template.ejs',
        './views/featured.ejs',
        './views/sequence.ejs',
        function($){

/**
 * @class Grapplenode.Techniques
 */
$.Controller('Grapplenode.Techniques',
/** @Static */
{
	defaults :
  { },
  listensTo: ['playasset']
},
/** @Prototype */
{
	init : function(){
		this.element.html(this.view("init.ejs"));
	},

  "{$.route} nav set": function (clientState, ev, val) {
    if (val == 'techniques')
      this.setfeatured();
  },

  "{$.route} techniques set": function (clientState, ev, val) {
    this.element.find('.page-menu .active').removeClass('active').end()
      .find('.page-menu li a[alt ='+val+']').parent().addClass('active');

      if (val == 'featured')
        this.setfeatured();
      else if (val == 'sequences')
        this.setsequences();
      else if (val == 'popular')
        this.setpopular();
  },

  ".page-menu li a click": function(elem, ev)
  {
    $.route.attrs({techniques:$(elem).attr('alt')}, true);
  },

  setfeatured: function()
  {
    this.element.find('.techniques-content').html(this.view("featured.ejs"));

    var technique = Grapplenode.Models.Technique;
    this.element.find('.takedowns').suna_assetlist({ model: technique, params: new Mxui.Data({featured: true, classification: "takedown", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });

    this.element.find('.passes').suna_assetlist({ model: technique, params: new Mxui.Data({featured: true, classification: "pass", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });

    this.element.find('.sweeps').suna_assetlist({ model: technique, params: new Mxui.Data({featured: true, classification: "sweep", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });

    this.element.find('.tc').suna_assetlist({ model: technique, params: new Mxui.Data({featured: true, classification: "tc", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });

    this.element.find('.escapes').suna_assetlist({ model: technique, params: new Mxui.Data({featured: true, classification: "escape", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });

    this.element.find('.submissions').suna_assetlist({ model: technique, params: new Mxui.Data({featured: true, classification: "submission", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });
  },

  setsequences: function()
  {
    this.element.find('.techniques-content').html(this.view("sequence.ejs"));

    var sequence = Grapplenode.Models.Sequence;
    this.element.find('.takedowns').suna_assetlist({ model: sequence, params: new Mxui.Data({classification: "takedown", limit:7 }),
      listtemplate: '//grapplenode/sequence/views/list_template.ejs'
    });

    this.element.find('.passes').suna_assetlist({ model: sequence, params: new Mxui.Data({classification: "pass", limit:7 }),
      listtemplate: '//grapplenode/sequence/views/list_template.ejs'
    });

  },

  setpopular: function()
  {
    this.element.find('.techniques-content').html(this.view("featured.ejs"));

    var technique = Grapplenode.Models.Technique;
    this.element.find('.takedowns').suna_assetlist({ model: technique, params: new Mxui.Data({classification: "takedown", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });

    this.element.find('.passes').suna_assetlist({ model: technique, params: new Mxui.Data({classification: "pass", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });

    this.element.find('.sweeps').suna_assetlist({ model: technique, params: new Mxui.Data({classification: "sweep", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });

    this.element.find('.tc').suna_assetlist({ model: technique, params: new Mxui.Data({classification: "tc", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });

    this.element.find('.escapes').suna_assetlist({ model: technique, params: new Mxui.Data({classification: "escape", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });

    this.element.find('.submissions').suna_assetlist({ model: technique, params: new Mxui.Data({classification: "submission", limit:7 }),
      listtemplate: '//grapplenode/techniques/views/list_template.ejs'
    });
  }

})

});