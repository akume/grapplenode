// map fixtures for this application

steal("jquery/dom/fixture", function(){
	
	$.fixture.make("technique", 5, function(i, technique){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
      id: i,
			name: "technique "+i,
      url         : 'http://www.youtube.com/embed/7afkv4ih68c',
      timeline    : [{time: 234, technique:3}, {time: 2348, technique:89},],
      directions  : [{time: 234, technique:3}, {time: 2348, technique:89},],
      counters    : [{time: 2444, technique:45}, {time: 23485, technique:349},],
      created_at  : new Date(),
      created_by  : 'akume',
      featured    : false,
      meta        : {
                      votes : 123412,
                      favs  : 234
                    }
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