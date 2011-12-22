steal("funcunit", function(){
	module("grapplenode test", { 
		setup: function(){
			S.open("//grapplenode/grapplenode.html");
		}
	});
	
	test("Copy Test", function(){
		equals(S("h1").text(), "Welcome to JavaScriptMVC 3.2!","welcome text");
	});
})