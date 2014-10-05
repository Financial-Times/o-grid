var configurations = require('./configurations'),
    demos = {
        test: {
            name: 'test',
            data: 'demos/src/configurations.js',
            js: 'demos/src/js/style-switcher.js',
            sass: 'demos/src/scss/default.scss',
            template: 'demos/src/test.mustache',
            expanded: false
        }
    };

Object.keys(configurations).forEach(function (key) {
    demos[key] = {
        name: key,
        description: configurations[key],
        sass: 'demos/src/scss/' + key + '.scss',
        template: 'demos/src/layout.mustache',
        expanded: (key == 'default')
    };
});

var demosArray = [];
for (var i in demos) {
    if (demos.hasOwnProperty(i)) demosArray.push(demos[i]);
};

module.exports = {
    options: {
        scriptMode: 'browserify'
    },
    demos: demosArray
};
