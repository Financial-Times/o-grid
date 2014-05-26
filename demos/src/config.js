var configurations = require('./configurations'),
    demos = {
        test: {
            data: 'demos/src/configurations.js',
            js: 'demos/src/js/style-switcher.js',
            sass: 'demos/src/scss/default.scss',
            template: 'demos/src/test.mustache'
        }
    };

Object.keys(configurations).forEach(function (key) {
    demos[key] = {
        data: {
            description: configurations[key]
        },
        sass: 'demos/src/scss/' + key + '.scss',
        template: 'demos/src/layout.mustache'
    };
});

module.exports = {
    options: {
        scriptMode: 'browserify'
    },
    demos: demos
};
