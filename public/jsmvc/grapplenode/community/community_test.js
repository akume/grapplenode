steal('funcunit').then(function(){

module("Grapplenode.Community", { 
	setup: function(){
		S.open("//grapplenode/community/community.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Grapplenode.Community Demo","demo text");
});


});