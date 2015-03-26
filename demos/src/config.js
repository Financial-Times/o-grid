'use strict';
var configurations = require('./configurations.json');
var demos = [];

Object.keys(configurations).forEach(function(key) {
	demos.push({
		name: key,
		description: configurations[key],
		sass: 'demos/src/scss/' + key + '.scss',
		template: 'demos/src/layout.mustache',
		bodyClasses: 'demo',
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
	bodyClasses: 'test',
	expanded: false
});

module.exports = {
	demos: demos
};
