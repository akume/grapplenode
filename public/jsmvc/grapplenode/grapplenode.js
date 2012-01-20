steal(
	'./models/models.js',		// steals all your models
	'./fixtures/fixtures.js',	// sets up fixtures for your models
  'jquery/dom/route',
  'grapplenode/navigation',
  'grapplenode/home',
  'grapplenode/search',
  'grapplenode/techniques',
	function(){					// configure your application
    // configure your application
    $.ajaxSetup({ cache: false })
    //navigation
    $.route.ready(false)
      ("/:tab", { tab: "home" })
      ("/search/:search");

		$('nav').grapplenode_navigation({username : USER.username,
      onNav: function (nav) {
        if (nav == 'techniques')
          $('#techniques').grapplenode_techniques();
        else if (nav == 'search')
          $('#search').grapplenode_search();
      }
    });

    $('#home').grapplenode_home();

    $.route.ready(true);
	})