module.exports = function(grunt) {
  "use strict";
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      boxSizing: {
        src: ['src/behavior/boxsizing/head', 'tmp/behavior/boxsizing/script.js', 'src/behavior/boxsizing/foot'],
        dest: 'polyfills/boxsizing.htc'
      }
    },
    uglify: {
      boxSizing: {
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
      docs: {
        options: {
          style: 'expanded'
        },
        files: {
          './docs/css/grid-default.css': './src/scss/bundles/default.scss',
          './docs/css/grid-responsive.css': './src/scss/bundles/responsive.scss',
          './docs/css/grid-fluid.css': './src/scss/bundles/fluid.scss',
          './docs/css/grid-resized.css': './src/scss/bundles/resized.scss',
          './docs/css/docs.css': './src/scss/docs/docs.scss'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js'],
      jshintrc: './.jshintrc'
    },
    template: {
      responsive: {
        src: './docs-generator/grid.hbs',
        engine: "handlebars",
        dest: './docs/grid-responsive.html',
        variables: {
          title: "Responsive grid examples",
          example: require('./docs-generator/examples.json'),
          responsive: true
        }
      },
      'default': {
        src: './docs-generator/grid.hbs',
        engine: "handlebars",
        dest: './docs/grid-default.html',
        variables: {
          title: "Default grid examples",
          example: require('./docs-generator/examples.json'),
          'default': true
        }
      },
      legacy: {
        src: './docs-generator/grid.hbs',
        engine: "handlebars",
        dest: './docs/grid-legacy.html',
        variables: {
          title: "Legacy grid examples",
          example: require('./docs-generator/examples.json'),
          legacy: true
        }
      },
      fluid: {
        src: './docs-generator/grid.hbs',
        engine: "handlebars",
        dest: './docs/grid-fluid.html',
        variables: {
          title: "Fluid grid examples",
          example: require('./docs-generator/examples.json'),
          fluid: true
        }
      },
      resized: {
        src: './docs-generator/grid.hbs',
        engine: "handlebars",
        dest: './docs/grid-resized.html',
        variables: {
          title: "Resized grid examples",
          example: require('./docs-generator/examples.json'),
          resized: true
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
            rename: function () {
              return './docs/index.html';
            }
          }
        ],
        options: {
          template: './docs-generator/markdown-wrapper.jst',
          preCompile: function() {},
          postCompile: function() {},
          templateContext: {}
        }
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
    clean: {
      before: ['./docs', './tmp'],
      after: ['./tmp']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-templater');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-prettify');

  // Default task(s).
  grunt.registerTask('default', ['clean:before', 'jshint', 'uglify', 'concat', 'docs', 'clean:after']);

  grunt.registerTask('docs', 'Generating static documentation files', function () {
    var handlebars = require('handlebars');

    handlebars.registerPartial('column', grunt.file.read('./docs-generator/partials/column.hbs', {encoding: 'utf8'}));
    handlebars.registerPartial('examples', grunt.file.read('./docs-generator/partials/examples.hbs', {encoding: 'utf8'}));
    handlebars.registerPartial('head', grunt.file.read('./docs-generator/partials/head.hbs', {encoding: 'utf8'}));

    grunt.task.run(['template', 'markdown:docs', 'prettify:docs', 'sass']);
    
  });

};