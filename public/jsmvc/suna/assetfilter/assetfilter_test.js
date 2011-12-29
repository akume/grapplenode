steal('funcunit').then(function(){

module("Suna.Assetfilter", { 
	setup: function(){
		S.open("//suna/assetfilter/assetfilter.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Suna.Assetfilter Demo","demo text");
});


});