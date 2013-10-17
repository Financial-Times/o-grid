exports.getExamplesConfig = function () {
	"use strict";
	var examples = [

		{
			title: "Example 1 title",
			description: "The grid is made up of 12 virtual columns. Actual columns can span 1 to 12 virtual columns.",
			columns: ["d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1"]
		},

		{
			title: "Example 2 title",
			description: "Two divs, each spanning 6 columns.",
			columns: ["d6", "d6"]
		},

		{
			title: "Example 3 title",
			description: "Three divs, each spanning 4 columns.",
			columns: ["d4", "d4", "d4"]
		},

		{
			title: "Example 4 title",
			description: "Four divs, each spanning 3 columns.",
			columns: ["d3", "d3", "d3", "d3"]
		}

	];
	return examples;
};