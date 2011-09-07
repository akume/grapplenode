var mongoose    = require("mongoose"),
	User 		= mongoose.model("User");

module.exports = {
                  
	findOrCreateByFacebookData : function(session, facebookUserData, promise)
	{
	// if there is a session add this facebook id to that person's session
		if (session.auth && session.auth.userId)
		{
			User.findById(session.auth.userId, function(err, user)
			{
				if (err)
				{
					console.log("Error using users/session/facebookId:");
					console.log(err);
					promise.fail(err);
					return;
				}
				
				if (user) {
					user.facebookid= facebookUserData.id;
					user.facebookdata = facebookUserData;
					user.save()
					promise.fulfill(user);
				}
			})
		}
		else 
		{
			User.findOne({facebookid:facebookUserData.id}, function(err, user) 
			{
				if (err)
				{
					console.log("Error using users/facebookId:");
					console.log(err);
					promise.fail(err);
					return;
				}
				
				if (user) {
					promise.fulfill(user);
				} 
				else 
				{
					var newuser = new User({
						email : facebookUserData.email,
						username : facebookUserData.username,
						facebookid : facebookUserData.id,
						facebookdata : facebookUserData
					});
					newuser.save( function() {
						promise.fulfill(newuser);
					});	
				}
			});
		}
	},
	
	findOrCreateByGoogleData : function(session, googleUserData, promise)
	{
		// if there is a session add this google id to that person's session
		if (session.auth && session.auth.userId)
		{
			User.findById(session.auth.userId, function(err, user)
			{
				if (err)
				{
					console.log("Error using users/session/googleId:");
					console.log(err);
					promise.fail(err);
					return;
				}
				
				if (user) {
					user.googleid= googleUserData.id;
					user.googledata = googleUserData;
					user.save()
					promise.fulfill(user);
				}
			})
		}
		else 
		{
			User.findOne({googleid:googleUserData.id}, function(err, user) 
			{
				if (err)
				{
					console.log("Error using users/googleId:");
					console.log(err);
					promise.fail(err);
					return;
				}
				
				if (user) {
					promise.fulfill(user);
				} 
				else 
				{
					var newuser = new User({
						email : googleUserData.id,
						username : googleUserData.id,
						googleid : googleUserData.id,
						googledata : googleUserData
					});
					newuser.save( function() {
						promise.fulfill(newuser);
					});	
				}
			});
		}
	}
}
