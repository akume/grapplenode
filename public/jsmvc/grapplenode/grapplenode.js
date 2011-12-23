steal(
	'./models/models.js',		// steals all your models
	'./fixtures/fixtures.js',	// sets up fixtures for your models
  'jquery/dom/route',
  'grapplenode/navigation',
  'grapplenode/techniques',
	function(){					// configure your application
    // configure your application
    $.ajaxSetup({ cache: false })
    //navigation
    $.route.ready(false)
      (":tab", { tab: "home" });

		$('nav').grapplenode_navigation({username : USER.username, defaultTab: 'home',
      onTab: function (tab) {
        if (tab == 'techniques')
          $('#techniques').grapplenode_techniques();
      }
    });

    $.route.ready(true);
	})