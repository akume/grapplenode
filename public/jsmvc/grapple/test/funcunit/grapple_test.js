module("grapple test", { 
	setup: function(){
		S.open("//media/js/grapple/grapple.html");
	}
});

test("Copy Test", function(){
	equals(S("h1").text(), "Welcome to JavaScriptMVC 3.0!","welcome text");
});