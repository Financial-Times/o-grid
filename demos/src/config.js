var configurations = require('./configurations.json'),
	demos = [];

Object.keys(configurations).forEach(function(key) {
	demos.push({
		name: key,
		description: configurations[key],
		sass: 'demos/src/scss/' + key + '.scss',
		template: 'demos/src/layout.mustache',
		expanded: (key === 'default')
	});
});

demos.push({
	name: 'test',
	description: 'test demo',
	data: 'demos/src/configurations.json',
	js: 'demos/src/js/style-switcher.js',
	sass: 'demos/src/scss/default.scss',
	template: 'demos/src/test.mustache',
	expanded: false
});

module.exports = {
	demos: demos
};
