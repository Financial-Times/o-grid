module.exports = function(grunt) {
    "use strict";

    var path = require('path');

    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt-config'),
        config: {
            pkg: grunt.file.readJSON('package.json')
        }
    });

  grunt.registerTask('copy-boxsizing', function () {
      grunt.file.copy('./bower_components/o-useragent/polyfills/boxsizing.htc', './demos/polyfills/boxsizing.htc');
  });


  grunt.registerTask('default', ['origami-demo', 'sass', 'copy-boxsizing']);//, 'clean:after']);

};