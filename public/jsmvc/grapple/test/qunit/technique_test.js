module("Model: Grapple.Models.Technique")

test("findAll", function(){
	stop(2000);
	Grapple.Models.Technique.findAll({}, function(techniques){
		start()
		ok(techniques)
        ok(techniques.length)
        ok(techniques[0].name)
        ok(techniques[0].description)
	});
	
})

test("create", function(){
	stop(2000);
	new Grapple.Models.Technique({name: "dry cleaning", description: "take to street corner"}).save(function(technique){
		start();
		ok(technique);
        ok(technique.id);
        equals(technique.name,"dry cleaning")
        technique.destroy()
	})
})
test("update" , function(){
	stop();
	new Grapple.Models.Technique({name: "cook dinner", description: "chicken"}).
            save(function(technique){
            	equals(technique.description,"chicken");
        		technique.update({description: "steak"},function(technique){
        			start()
        			equals(technique.description,"steak");
        			technique.destroy();
        		})
            })

});
test("destroy", function(){
	stop(2000);
	new Grapple.Models.Technique({name: "mow grass", description: "use riding mower"}).
            destroy(function(technique){
            	start();
            	ok( true ,"Destroy called" )
            })
})