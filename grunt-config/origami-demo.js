module.exports = {
    demos: {
        test: {
            viewModel: require('../demo-src/configurations'),
            js: 'js/style-switcher.js',
            sass: 'scss/bundles/default.scss',
            template: 'test.mustache',
            scriptMode: 'browserify'
        }
    }
};
