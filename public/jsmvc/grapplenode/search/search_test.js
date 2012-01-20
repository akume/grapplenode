steal('funcunit').then(function(){

module("Grapplenode.Search", { 
	setup: function(){
		S.open("//grapplenode/search/search.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Grapplenode.Search Demo","demo text");
});


});