steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs',
        './views/autocomplete.ejs',
        function($){

/**
 * @class Suna.Assetfilter
 */
$.Controller('Suna.Assetfilter',
/** @Static */
{
	defaults :
  {
    model: null,
    params: new Mxui.Data,
    showoverlay : false,
    customtemplate: '',
    customtempobj:'',
    filterclass: '',
    initialindex: 0,
    filtertext:''
  }
},
/** @Prototype */
{
  setup: function (el, options) {
    // check params has attrs
    if (options && options.params && typeof options.params.attrs != 'function') {
      options.params = new Mxui.Data(options.params)
    }
    this._super.apply(this, arguments);
  },

	init : function(){
    $(window).click(this.clear_autocomplete).resize(this.clear_autocomplete);

    this.updateView();
	},

  update: function (options) {
    // make sure you call super
    this._super(options);
    this.updateView();
  },

  updateView: function () {
    this.element.html(this.view('init', { filters: this.options.filters,
      showoverlay: this.options.showoverlay,
      customtemplate: this.options.customtemplate,
      customtempobj: this.options.customtempobj,
      filterclass: this.options.filterclass,
      initialindex: this.options.initialindex,
      filtertext: this.options.filtertext}));
    if (this.options.showoverlay)
    {
      var overlay = this.element.find(".asset-filters li.overlay");
      overlay.css('left', this.element.find(".asset-filters > li.active").position().left)
        .bind('draginit touchstart', this.callback('_dragstart', overlay))
        .bind('dragmove touchmove', this.callback('_dragmove', overlay))
        .bind('dragend touchend', this.callback('_dragend', overlay))
    }
  },

  _dragstart: function (el, ev, drag) {
    if (drag) {
      drag.horizontal()
    }
    else {
      ev.preventDefault()
      var orig = ev.originalEvent;
      $(el).css({
        left: orig.changedTouches[0].pageX - ($(el).width() / 2)
      });
    }
  },

  _dragmove: function (el, ev, drag) {
    if (!drag) {
      ev.preventDefault()
      var orig = ev.originalEvent, left = orig.changedTouches[0].pageX - ($(ev.target).width() / 2);
      if (left < 0)
        left = 0;
      else if (left + $(el).width() > this.element.find(".asset-filters").outerWidth())
        left = this.element.find(".asset-filters").outerWidth() - $(el).width() - 1
      $(el).css({
        left: left
      });
    }
    else {
      if ($(el).position().left < 0) {
        ev.preventDefault()
      }
      if ($(el).position().left + $(el).width() > this.element.find(".asset-filters").outerWidth()) {
        ev.preventDefault();
      }
    }
  },

  _dragend: function (el, ev, drag) {

    if ($(el).position().left < 0) {
      $(el).css('left', '0')
    }
    if ($(el).position().left + $(el).width() > this.element.find(".asset-filters").outerWidth()) {
      $(el).css('left', this.element.find(".asset-filters").outerWidth() - $(el).width() - 1)
    }

    var $li = '', hcenter = $(el).position().left + ($(el).width() / 2)
    this.element.find('.asset-filters > li:not(.search, .overlay)').each(function () {
      var pos = $(this).position()
      if (hcenter >= pos.left && hcenter <= pos.left + $(this).outerWidth()) {
        $li = $(this);
        return false;
      }
    })

    if ($li != '')
      $li.click();
    else
      this.element.find('.asset-filters > li:not(.search, .overlay)').filter(":last").click()

  },

  ".asset-filters > li:not(.search, .overlay) click": function (elem, ev) {
    if (!this.ignore) {
      this.ignore = true;
      this.element.find('.asset-filters li.active').removeClass('active').end()
        .find('input.search').val('SEARCH');
      $(elem).addClass('active');
      if (this.element.find('.asset-filters li.overlay').css('display') == 'none')
        this.element.find('.asset-filters li.overlay').show();
      this.element.find('.asset-filters li.overlay').animate({
        left: $(elem).position().left + 'px',
        opacity: 1.0
      }, 350, 'swing', this.callback('animationcomplete', elem));

      if (!this.options.showoverlay)
        this.animationcomplete(elem)
    }
  },

  animationcomplete: function (elem) {
    this.ignore= false;
    this.options.params.attrs({ filter: $(elem).find('a').attr('alt') });
  },

  ".asset-filters input.search focus": function (elem, ev) {
    $(elem).val('');
    ev.stopPropagation();
    return false;
  },

  '.asset-filters input.search click': function (elem, ev) {
    $(elem).val('');
    ev.stopPropagation();
    return false;
  },

  ".asset-filters input.search blur": function (elem, ev) {
    ($(elem).val() == '') ? $(elem).val(this.options.filtertext || 'SEARCH') : '';
    ev.stopPropagation();
    return false;
  },

  ".asset-filters input.search keyup": function (elem, ev) {
    if (ev.keyCode === 13) {
      this.search(elem, ev)
    } else if ($(elem).val().length >= 3) {
      this.options.model.findAll({ search: $(elem).val() }, this.callback('autosearch'));
    } else {
      this.element.find('.autocomplete').html('').hide();
    }
  },

  autosearch: function (assets) {
    if (assets.length > 0)
      this.element.find('.autocomplete').html(this.view('autocomplete', { assets: assets })).show()
  },

  ".asset-filters .autocomplete li a click": function (elem, ev) {
    this.element.find('input.search').val($(elem).html());
    this.search(this.element.find('input.search'), ev);
  },

  ".asset-filters .autocomplete li a touchstart": function (elem, ev) {
    $(elem).addClass('touch');
  },

  ".asset-filters .autocomplete li a touchend": function (elem, ev) {
    $(elem).removeClass('touch');
    this.element.find('input.search').val($(elem).html());
    this.search(this.element.find('input.search'), ev);
  },

  search: function (elem, ev) {
    this.options.params.attrs({search: $(elem).val(), filter:''});
    var self = this;
    this.element.find('.asset-filters li.active').removeClass('active');
    $(elem).parent('li').addClass('active');
    this.element.find('.asset-filters li.overlay').animate({
      left: $(elem).parent('li').position().left + 'px',
      opacity: 0.0
    }, 350, 'swing', function () { self.element.find('.asset-filters li.overlay').hide() });
    this.element.find('.autocomplete').html('').hide();
  },

  clear_autocomplete: function () {
    $('.asset-filters .autocomplete').html('').hide()
  }
})

});