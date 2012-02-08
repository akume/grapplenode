steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs',
        './views/list.ejs',
        function($){

/**
 * @class Suna.Assetlist
 */
$.Controller('Suna.Assetlist',
/** @Static */
{
	defaults :
  {
    listtemplate: '',
    model: null,
    params: new Mxui.Data
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
    this.element.html(this.view('init'));
    this.newRequest()
	},

  update : function(options){
    // make sure you call super
    this._super(options);
  },

  updateView: function () {
  },

  list: function (assets) {
    this.options.params.attr('updating', false);

    this.element.find('.asset-results').html(this.view('list', { assets: assets, listtemplate: this.options.listtemplate }));
  },

  "{params} updated.attr": function (params, ev, attr, val) {
    if (attr !== 'count' && attr !== 'updating') {
      //want to throttle for rapid updates
      params.attr('updating', true)
      clearTimeout(this.newRequestTimer, 100)
      this.newRequestTimer = setTimeout(this.callback('newRequest'))
    }
  },

  newRequest: function () {
    this.options.model.findAll(this.options.params.attrs(), this.callback('list'))
  },

  '.asset-results img click': function (elem, ev) {
    this.element.trigger('playasset', [$(elem).closest('.asset').model()]);
  }
})

});