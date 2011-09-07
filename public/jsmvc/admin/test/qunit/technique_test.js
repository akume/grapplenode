module("Model: Admin.Models.Technique")

asyncTest("findAll", function(){
	stop(2000);
	Admin.Models.Technique.findAll({}, function(techniques){
		ok(techniques)
        ok(techniques.length)
        ok(techniques[0].name)
        ok(techniques[0].description)
		start()
	});
	
})

asyncTest("create", function(){
	stop(2000);
	new Admin.Models.Technique({name: "dry cleaning", description: "take to street corner"}).save(function(technique){
		ok(technique);
        ok(technique.id);
        equals(technique.name,"dry cleaning")
        technique.destroy()
		start();
	})
})
asyncTest("update" , function(){
	stop();
	new Admin.Models.Technique({name: "cook dinner", description: "chicken"}).
            save(function(technique){
            	equals(technique.description,"chicken");
        		technique.update({description: "steak"},function(technique){
        			equals(technique.description,"steak");
        			technique.destroy();
        			start()
        		})
            })

});
asyncTest("destroy", function(){
	stop(2000);
	new Admin.Models.Technique({name: "mow grass", description: "use riding mower"}).
            destroy(function(technique){
            	ok( true ,"Destroy called" )
            	start();
            })
})