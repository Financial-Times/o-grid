'use strict';
var configurations = require('./configurations.json');
var demos = [];

Object.keys(configurations).forEach(function(key) {
	demos.push({
		name: key,
		description: configurations[key],
		sass: 'demos/src/scss/' + key + '.scss',
		template: 'demos/src/layout.mustache',
		htmlClasses: 'demo',
		expanded: (key === 'default')
	});
});

demos.push({
	name: 'test',
	description: 'test demo',
	sass: 'demos/src/scss/default.scss',
	template: 'demos/src/test.mustache',
	data: 'demos/src/configurations.json',
	js: 'demos/src/js/style-switcher.js',
	htmlClasses: 'test',
	expanded: false,
	dependencies: ["o-buttons@^2.0.0"]
});

module.exports = {
	demos: demos
};
