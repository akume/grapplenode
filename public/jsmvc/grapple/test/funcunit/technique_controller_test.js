/*global module: true, ok: true, equals: true, S: true, test: true */
module("technique", {
	setup: function () {
		// open the page
		S.open("/");

		//make sure there's at least one technique on the page before running a test
		S('.technique').exists();
	},
	//a helper function that creates a technique
	create: function () {
		S("[name=name]").type("Ice");
		S("[name=description]").type("Cold Water");
		S("[type=submit]").click();
		S('.technique:nth-child(2)').exists();
	}
});
/*
test("techniques present", function () {
	ok(S('.technique').size() >= 1, "There is at least one technique");
});

test("create techniques", function () {

	this.create();

	S(function () {
		ok(S('.technique:nth-child(2) td:first').text().match(/Ice/), "Typed Ice");
	});
});

test("edit techniques", function () {

	this.create();

	S('.technique:nth-child(2) a.edit').click();
	S(".technique input[name=name]").type(" Water");
	S(".technique input[name=description]").type("\b\b\b\b\bTap Water");
	S(".update").click();
	S('.technique:nth-child(2) .edit').exists(function () {

		ok(S('.technique:nth-child(2) td:first').text().match(/Ice Water/), "Typed Ice Water");

		ok(S('.technique:nth-child(2) td:nth-child(2)').text().match(/Cold Tap Water/), "Typed Cold Tap Water");
	});
});

test("destroy", function () {

	this.create();

	S(".technique:nth-child(2) .destroy").click();

	//makes the next confirmation return true
	S.confirm(true);

	S('.technique:nth-child(2)').missing(function () {
		ok("destroyed");
	});

});*/