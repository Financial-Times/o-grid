module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/behavior/boxsizing/head', 'tmp/behavior/boxsizing/script.js', 'src/behavior/boxsizing/foot'],
        dest: 'dist/behavior/boxsizing.htc'
      },
      dev: {
        src: ['src/behavior/boxsizing/head', 'src/behavior/boxsizing/script.js', 'src/behavior/boxsizing/foot'],
        dest: 'build/behavior/boxsizing.htc'
      }
    },
    uglify: {
      dist: {
        options: {compress: true},
        files: {
          './tmp/behavior/boxsizing/script.js': ['src/behavior/boxsizing/script.js']
        }
      }
    },
    watch: {
      sass: {
        files: ['src/scss/**/*'],
        tasks: ['sass']
      }
    },
    sass: {                              
      dev: {                            
        options: {                       
          style: 'expanded'
        },
        files: {
          './build/css/grid-default.css': './src/scss/bundles/default.scss', // 'destination': 'source'
          './build/css/grid-responsive.css': './src/scss/bundles/responsive-only.scss', // 'destination': 'source'
          './build/css/grid-legacy.css': './src/scss/bundles/legacy.scss', // 'destination': 'source'
          './build/css/docs.css': './src/scss/docs/docs.scss'
        }
      },
      dist: {                            
        options: {                       
          style: 'compressed'
        },
        files: {
          './dist/css/grid.<%= pkg.version %>.min.css': './src/scss/bundles/responsive.scss', // 'destination': 'source'
          './dist/css/grid-legacy.<%= pkg.version %>.min.css': './src/scss/bundles/legacy.scss'
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
    },
    copy: {
      cssToDocs: {
        files: [{
          expand: true, 
          cwd: 'build/css/',
          src: ['*'], 
          dest: './docs/css/'
        }]

      } 
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
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

    grunt.task.run(['template:responsive', 'template:default', 'template:legacy', 'markdown:docs', 'prettify:docs', 'sass', 'copy:cssToDocs']);
    
  });  

};