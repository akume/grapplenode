// map fixtures for this application

steal("jquery/dom/fixture", function(){
	
	$.fixture.make("technique", 7, function(i, technique){
    var classifications = ['pass' , 'sweep', 'submission', 'takedown', 'transition', 'control'];
    var positions = ['standing',
                      'mount', 'smount',
                      'back', 'turtle',
                      'sidecontrol', 'kneeonbelly',
                      'northsouth',
                      'closedG', 'rubberG',
                      'spiderG', 'delarivaG', 'revdelrivaG',
                      'butterflyG',
                      'halfG', 'invertedhalfG', 'deephalfG',
                      '50/50G',
                      'xG','singlelegxG'
                      ];
    var locations = ['top', 'bottom', 'neutral'];
    var actions = ['offense', 'defense', 'counter'];
    var vim = ['9768954', '']

    return {
      _id: i,
			name: "technique "+i ,

      vimeoid     : $.fixture.rand( vim , 1)[0],
      youtubeid   : '7afkv4ih68c',

      created_at  : new Date(),
      created_by  : 'akume',

      //if grabbing from another video, timeline signifies the snippet that you are refering to.
      timeline    : {starttime: 234, endtime: 2348},
      //at various points within a technique you can move to another position/attack. this property records these moments and lists the ID
      directions  : [{time: 234, technique:3}, {time: 2348, technique:89}],
      //at various points within a technique you can counter an attack. this property records these moments
      counters    : [{time: 2444, technique:45}, {time: 23485, technique:349}],

      classification: $.fixture.rand( classifications , 1)[0],
      position: $.fixture.rand( positions , 1)[0],
      location: $.fixture.rand( locations , 1)[0],
      action: $.fixture.rand( actions , 1)[0],
      meta        : {},

      featured    : false,
      likes  : 234,
      dislikes : 5,
      views: 2343,
      favorites:10,

      commentnum: 22,
      comments : {}
		}
	})

	$.fixture.make("user", 5, function(i, user){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "user "+i,
			description: $.fixture.rand( descriptions , 1)[0],
      favorites : {},
      likes: {},
      dislikes: {}
		}
	})
})