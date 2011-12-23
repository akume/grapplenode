steal('funcunit').then(function(){

module("Suna.Assetlist", { 
	setup: function(){
		S.open("//suna/assetlist/assetlist.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Suna.Assetlist Demo","demo text");
});


});