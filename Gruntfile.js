module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        options: {compress: true},
        files: {
          './build/dist/js/grid-legacy-test.<%= pkg.version %>.min.js': ['source/js/grid-legacy-test.js']
        }
      },
      dev: {
        options: {compress: false},
        files: {
          './build/js/grid-legacy-test.js': ['source/js/grid-legacy-test.js']
        }
      }
    },
    watch: {
      sass: {
        files: ['source/sass/**/*'],
        tasks: ['sass']
      },
      js: {
        files: ['source/js/**/*'],
        tasks: ['jshint', 'concat', 'uglify']
      }
    },
    sass: {                              
      dev: {                            
        options: {                       
          style: 'expanded'
        },
        files: {
          './build/css/grid-default.css': './source/sass/bundles/default.scss', // 'destination': 'source'
          './build/css/grid-responsive.css': './source/sass/bundles/responsive-only.scss', // 'destination': 'source'
          './build/css/grid-legacy.css': './source/sass/bundles/legacy.scss', // 'destination': 'source'
          './build/css/dev-prototype.css': './source/sass/dev/dev-prototype.scss'
        }
      },
      dist: {                            
        options: {                       
          style: 'compressed'
        },
        files: {
          './build/dist/css/grid.<%= pkg.version %>.min.css': './source/sass/bundles/responsive.scss', // 'destination': 'source'
          './build/dist/css/grid-legacy.<%= pkg.version %>.min.css': './source/sass/bundles/legacy.scss'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'source/js/**/*.js', 'node/**/*.js'],
      jshintrc: './.jshintrc'
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'sass']);

  // grunt.registerTask('restart', 'Restarting node app', function () {
  //   // Need to look into how grunt can run the app as a child process
  //   //
  //   // http://web-archive-me.com/page/1254392/2013-01-29/http://cobbweb.me/blog/2012/06/07/using-grunt-dot-js-to-build-your-frontend-in-a-node-dot-js-slash-express-dot-js-app/
  //   // http://stackoverflow.com/questions/15044026/running-node-app-through-grunt
  //   // http://stackoverflow.com/questions/13889037/running-node-app-from-grunt-with-watch
  // });

};