module.exports = function(grunt) {
    "use strict";

    var path = require('path');

    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt-config'),
        config: {
            pkg: grunt.file.readJSON('package.json')
        }
    });


  grunt.registerTask('docs', 'Generating static documentation files', function () {
    var handlebars = require('handlebars');

    grunt.file.expand('./docs-generator/partials/*.hbs').forEach(function(path) {
        handlebars.registerPartial(path.split('/').pop().split('.').shift(), grunt.file.read(path, {encoding: 'utf8'}));
    });
    grunt.task.run(['template', 'markdown', 'prettify:docs', 'sass', 'finalDocsCleanup']);
  });

  grunt.registerTask('finalDocsCleanup', function () {
    grunt.file.copy('./docs-generator/js/jquery.toc.min.js', './docs/js/jquery.toc.min.js');
    grunt.file.copy('./docs-generator/js/test.js', './docs/js/test.js');
    grunt.file.copy('./bower_components/o-useragent/polyfills/boxsizing.htc', './docs/polyfills/boxsizing.htc');
  });


  grunt.registerTask('default', ['clean:before', 'jshint', 'docs', 'clean:after']);

};