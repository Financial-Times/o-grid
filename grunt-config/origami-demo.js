module.exports = {
    demos: {
        layout: {
            js: 'js/style-switcher.js',
            sass: 'scss/bundles/default.scss',
            template: 'layout.mustache',
            scriptMode: 'browserify'
        },
        test: {
            viewModel: require('../demo-src/configurations'),
            js: 'js/style-switcher.js',
            sass: 'scss/bundles/default.scss',
            template: 'test.mustache',
            scriptMode: 'browserify'
        }
    }
};
