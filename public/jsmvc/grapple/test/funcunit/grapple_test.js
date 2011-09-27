module("grapple test", { 
	setup: function(){
		S.open("/");
	}
});

test("Home Page Facebook Authentication", function(){
	equals(S("li.logo").text(), "Grapplenode","welcome text");
	
	S('#login').exists().click().hasClass('active', function()
	{
		S('#facebook_login').visible(function()
			{
				S('#facebook_login').click(function(){})
				S('#user').visible(function(){
					ok(/akume/.test(S('#user').text()), "User name shows up")
				});
			})
	})
	//check that page has user name appeared on page
	
});