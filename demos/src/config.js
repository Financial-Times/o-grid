var configurations = require('./configurations'),
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

module.exports = {
    options: {
        scriptMode: 'browserify'
    },
    demos: demos
};
