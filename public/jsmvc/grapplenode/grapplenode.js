steal(
  'grapplenode/grapplenode.css',
  './models/models.js',		// steals all your models
	//'./fixtures/fixtures.js',	// sets up fixtures for your models
  'jquery/dom/route',
  'grapplenode/navigation',
  'grapplenode/home',
  'grapplenode/search',
  'grapplenode/techniques',
  'grapplenode/tech',
  'grapplenode/locker',
  'grapplenode/community',

	function()
    {					// configure your application
        var username = window.USER ? window.USER.username: '';
        // configure your application
        $.ajaxSetup({ cache: false });
        //navigation
        $.route.ready(false)
          ("/:nav", { nav: "home" })
          ("/search/:search")
          ("/techniques/:techniques", {techniques:"featured"})
          ("/t/:t");

		$('nav').grapplenode_navigation({username : username,
            onNav: function (nav) {
                $('body').find('section').html('').append('<div id=' + nav + ' ></div>');

                if (nav == 'home')
                  $('#home').grapplenode_home();
                else if (nav == 'search')
                    $('#search').grapplenode_search();
                else if (nav == 'techniques')
                  $('#techniques').grapplenode_techniques();
                else if (nav == 't')
                  $('#t').grapplenode_tech();
                else if (nav == 'locker')
                  $('#locker').grapplenode_locker();
                else if (nav == 'community')
                  $('#community').grapplenode_community();
              }
            });

        $('#home').grapplenode_home();
        $.route.ready(true);
	})