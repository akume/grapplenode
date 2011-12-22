steal("funcunit/qunit", "grapplenode/fixtures", "grapplenode/models/technique.js", function(){
	module("Model: Grapplenode.Models.Technique")
	
	test("findAll", function(){
		expect(4);
		stop();
		Grapplenode.Models.Technique.findAll({}, function(techniques){
			ok(techniques)
	        ok(techniques.length)
	        ok(techniques[0].name)
	        ok(techniques[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Grapplenode.Models.Technique({name: "dry cleaning", description: "take to street corner"}).save(function(technique){
			ok(technique);
	        ok(technique.id);
	        equals(technique.name,"dry cleaning")
	        technique.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Grapplenode.Models.Technique({name: "cook dinner", description: "chicken"}).
	            save(function(technique){
	            	equals(technique.description,"chicken");
	        		technique.update({description: "steak"},function(technique){
	        			equals(technique.description,"steak");
	        			technique.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Grapplenode.Models.Technique({name: "mow grass", description: "use riding mower"}).
	            destroy(function(technique){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})