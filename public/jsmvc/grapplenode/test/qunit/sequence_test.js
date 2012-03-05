steal("funcunit/qunit", "grapplenode/fixtures", "grapplenode/models/sequence.js", function(){
	module("Model: Grapplenode.Models.Sequence")
	
	test("findAll", function(){
		expect(4);
		stop();
		Grapplenode.Models.Sequence.findAll({}, function(sequences){
			ok(sequences)
	        ok(sequences.length)
	        ok(sequences[0].name)
	        ok(sequences[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Grapplenode.Models.Sequence({name: "dry cleaning", description: "take to street corner"}).save(function(sequence){
			ok(sequence);
	        ok(sequence.id);
	        equals(sequence.name,"dry cleaning")
	        sequence.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Grapplenode.Models.Sequence({name: "cook dinner", description: "chicken"}).
	            save(function(sequence){
	            	equals(sequence.description,"chicken");
	        		sequence.update({description: "steak"},function(sequence){
	        			equals(sequence.description,"steak");
	        			sequence.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Grapplenode.Models.Sequence({name: "mow grass", description: "use riding mower"}).
	            destroy(function(sequence){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})