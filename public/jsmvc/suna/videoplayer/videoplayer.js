steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Suna.Videoplayer
 */
$.Controller('Suna.Videoplayer',
/** @Static */
{
	defaults : {
    detailtemplate:''
  }
},
/** @Prototype */
{
	init : function(){},

  setfeature: function (asset) {
    //this.element.find('.detail').html($.View(this.options.detailtemplate, asset));
    //TODO: need to create a space for the technique's description and a detail template
  },

  playasset: function (asset) {
    if (this.asset != null && asset.id == this.asset.id && this.element.find("object").length > 0)
      return;

    this.asset = asset;
    $('body').scrollTop(0);

    this.setfeature(this.asset);
    if (this.element.css("display") == "none")
      this.element.fadeIn().html("//suna/videoplayer/views/init.ejs",{});
    //TODO: place a loading image under the player prior to loading.

    this.load_iframe()
    /*TODO will eventually want to have a player to avoid cross domain errors.
    (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') ?
      this.load_iframe() :
      this.load_flash_player();*/
  },

  load_flash_player: function () {
    //TODO: have to check if this will cause a memory leak.
    this.player.api_unload()
    if (this.player == null) {
      this.element.find('.flashcontainer')
        .html( (this.asset.vimeoid != '' ? this.view('vimeo') : this.view('youtube')), this.asset)
      this.player= document.getElementById('flashplayer');

    } else {
      this.player.load({ file: this.data.url, start: this.asset.resumetime });
    }
  },

  load_iframe: function()
  {
    this.element.find('.flashcontainer')
      .html( (this.asset.vimeoid != '' ? this.view('ivimeo', this.asset) : this.view('iyoutube', this.asset)))
  }
})

});

/*



    load_html_player: function () {
      var hasSetTime = false;
      var self = this;
      this.element.find(".mediaplayer").html(this.view("html5-video", { url: this.data.url, currentTime: this.asset.resumetime }))
      var video = this.element.find(".mediaplayer").find('video').get(0);
      video.addEventListener('timeupdate', function (evt) {
        if (!hasSetTime) {
          try {
            if (self.asset.resumetime > 0)
              evt.target.currentTime = self.asset.resumetime;

            hasSetTime = true
          }
          catch (e)
          { }
        }

        self.setresumetime({ position: evt.target.currentTime });
      });
    },

    setresumetime: function (obj) {
      /*RELEASE: we are currently not tracking the resume time
       var currentdate = new Date();
       var position = _.isNumber(obj) ? obj : obj.position;
       if ((currentdate.getTime() - this.date.getTime()) > 5000) {
       this.date = currentdate;
       this.asset.resumetime = Math.ceil(position);
       this.options.model.track({ resumetime: this.asset.resumetime, id: this.asset.id });

       //TODO make this generic
       var $mods = $('.screeners_models_movie_' + this.asset.id)


       var percent = obj.position / obj.duration;

       if (this.asset.watchstatus != 'resume' && percent < 0.965) {
       $mods.find('button').each(function () {
       $(this).attr('class', 'resume').attr('value', 'resume').text('resume')
       })

       this.asset.watchstatus = 'resume';
       }
       else if (percent > 0.965) {
       $mods.find('button').each(function () {
       $(this).attr('class', 'watchagain').attr('value', 'watchagain').text('watchagain')
       })

       this.asset.watchstatus = 'watchagain';
       }

       $mods.each(function () {
       var model = $(this).model();
       model.watchstatus = (percent < 0.965) ? 'resume' : 'watchagain';
       model.resumetime = position;
       })
       this.asset.resumetime = position;
       }

    },

    hideasset: function () {
      this.element.find(".mediaplayer").hide().end()
        .find('ul.pages li.active').click();
      if (this.player) {
        this.player.remove()
        this.player = null;
      }
    }
  })

});
*
* */