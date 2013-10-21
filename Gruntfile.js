module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['source/behavior/boxsizing/head', 'tmp/behavior/boxsizing/script.js', 'source/behavior/boxsizing/foot'],
        dest: 'dist/behavior/boxsizing.htc'
      },
      dev: {
        src: ['source/behavior/boxsizing/head', 'source/behavior/boxsizing/script.js', 'source/behavior/boxsizing/foot'],
        dest: 'build/behavior/boxsizing.htc'
      }
    },
    uglify: {
      dist: {
        options: {compress: true},
        files: {
          './tmp/behavior/boxsizing/script.js': ['source/behavior/boxsizing/script.js']
        }
      }
    },
    watch: {
      sass: {
        files: ['source/sass/**/*'],
        tasks: ['sass']
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
          './build/css/docs.css': './source/sass/docs/docs.scss'
        }
      },
      dist: {                            
        options: {                       
          style: 'compressed'
        },
        files: {
          './dist/css/grid.<%= pkg.version %>.min.css': './source/sass/bundles/responsive.scss', // 'destination': 'source'
          './dist/css/grid-legacy.<%= pkg.version %>.min.css': './source/sass/bundles/legacy.scss'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'node/**/*.js'],
      jshintrc: './.jshintrc'
    },
    template: {
      responsive: {
        src: './views/grid.hbs',
        engine: "handlebars",
        dest: './docs/grid-responsive.html',
        variables: {
          title: "Grid example and demo",
          example: require('./node/examples.json'),
          responsive: true
        }
      },
      'default': {
        src: './views/grid.hbs',
        engine: "handlebars",
        dest: './docs/grid-default.html',
        variables: {
          title: "Grid example and demo",
          example: require('./node/examples.json'),
          'default': true
        }
      },
      legacy: {
        src: './views/grid.hbs',
        engine: "handlebars",
        dest: './docs/grid-legacy.html',
        variables: {
          title: "Grid example and demo",
          example: require('./node/examples.json'),
          legacy: true
        }
      }
    },
    markdown: {
      docs: {
        files: [
          {
            expand: true,
            src: 'README.md',
            dest: './docs/',
            ext: '.html'
          }
        ]
      }
    },
    prettify: {
      docs: {
        expand: true,
        cwd: './docs/',
        src: ['*.html'],
        dest: './docs/'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-templater');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-prettify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'concat', 'sass']);

  grunt.registerTask('docs', 'Generating static documentation files', function () {
    var handlebars = require('handlebars');

    handlebars.registerPartial('column', grunt.file.read('./views/partials/column.hbs', {encoding: 'utf8'}));
    handlebars.registerPartial('examples', grunt.file.read('./views/partials/examples.hbs', {encoding: 'utf8'}));
    handlebars.registerPartial('head', grunt.file.read('./views/partials/head.hbs', {encoding: 'utf8'}));

    grunt.task.run(['template:responsive', 'template:default', 'template:legacy', 'markdown:docs', 'prettify:docs']);
  });  



};