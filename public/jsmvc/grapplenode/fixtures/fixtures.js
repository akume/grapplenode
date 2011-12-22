// map fixtures for this application

steal("jquery/dom/fixture", function(){
	
	$.fixture.make("technique", 5, function(i, technique){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "technique "+i,
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})
	$.fixture.make("user", 5, function(i, user){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "user "+i,
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})
})