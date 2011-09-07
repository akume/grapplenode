var mongoose    = require("mongoose");
var Technique = mongoose.model("Technique");

module.exports = {

	// GET /
	get_index : function(req, res) {
		Technique.find({
			featured:true
		}, {}, {}, function(err,techniques) {
			if (techniques) {
				res.render('index', {
					title: 'Grappledge',
					techniques:techniques
				});
			} else {
				res.send("no techniques found", 404);
			}
		});
	}
}