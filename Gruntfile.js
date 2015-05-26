// Generated on 2015-04-04 using generator-angular 0.11.1
'use strict';

module.exports = function(grunt) {

  var ngAnnotate   = require('browserify-ngannotate');

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'frontend',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: [
          '<%= yeoman.app %>/scripts/**/*.js',
          '!<%= yeoman.app %>/scripts/**/*.spec.js'
        ],
        tasks: ['newer:jshint', 'browserify:app']
      },
      ws: {
        files: ['<%= yeoman.app %>/uib-socket-client.js'],
        tasks: ['browserify:ws']
      },
      jsTest: {
        files: [
          '<%= yeoman.app %>/**/*.spec.js',
          '<%= yeoman.app %>/test/mock/**/*.js'
        ],
        tasks: ['browserify:app', 'newer:jshint', 'karma']
      },
      fontIcons: {
        files: [
          '<%= yeoman.app %>/styles/icons/*.css',
          '<%= yeoman.app %>/styles/font/*.{eot,svg,ttf,woff}'
        ],
        tasks: ['newer:copy:dev', 'stylus']
      },
      stylus: {
        files: ['<%= yeoman.app %>/styles/**/*.styl'],
        tasks: ['stylus']
      },
      templates: {
        files: ['<%= yeoman.app %>/**/*.html'],
        tasks: ['html2js:all', 'browserify']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/**/*.css'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      }
    },

    browserify: {
      app: {
        files: {
          '.tmp/scripts/uibuilder.js': '<%= yeoman.app %>/scripts/app.js'
        }
      },
      ws: {
        files: {
          '.tmp/scripts/uib-socket-client.js': '<%= yeoman.app %>/uib-socket-client.js',
        }
      },
      options: {
        browserifyOptions: {
          debug: true
        },
        transform: [ngAnnotate]
      }
    },

    ngAnnotate: {
      all: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          dest: '.tmp/scripts',
          src: [
            '**/*.directive.js',
            '**/*.service.js',
            '**/*.filter.js',
            '**/*.controller.js'
          ]
        }]
      }
    },

    html2js: {
      options: {
        base: './',
        module: 'uib-templates',
        fileHeaderString: 'module.exports =',
        singleModule: true,
        rename: function(moduleName) {
          console.log(moduleName);
          return '/' + moduleName;
        },
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      },
      all: {
        src: ['<%= yeoman.app %>/**/*.html'],
        dest: '.tmp/scripts/uib-templates.js'
      }
    },

    stylus: {
      options: {
        use: [require('kouto-swiss')],
        import: ['kouto-swiss'],
        'include css': true
      },
      dev: {
        files: {
          '.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.styl',
          '.tmp/styles/uib-canvas.css': '<%= yeoman.app %>/styles/uib-canvas.styl'
        }
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': '<%= yeoman.app %>/styles/main.styl',
          '<%= yeoman.dist %>/styles/uib-canvas.css': '<%= yeoman.app %>/styles/uib-canvas.styl'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: ['<%= yeoman.app %>/scripts/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['.tmp', '<%= yeoman.dist %>']
        }]
      },
      server: '.tmp'
    },

    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/app.js': '.tmp/scripts/app.js'
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles/font',
          dest: '.tmp/font',
          src: ['*.*']
        }, {
          '.tmp/scripts/uib-socket.client.js': '<%= yeoman.app %>/uib-socket-client.js',
          '.tmp/internal/jquery.js': '<%= yeoman.app %>/internal/jquery.js'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.html',
            '*.txt',
            '*.ico'
          ]
        },{
          expand: true,
          cwd: '<%= yeoman.app %>/styles/font',
          dest: '<%= yeoman.dist %>/font',
          src: ['*.*']
        }]
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('serve', [
    'clean:server',
    'copy:dev',
    'stylus:dev',
    'html2js',
    'browserify',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'html2js:all',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'html2js',
    'browserify',
    'stylus:dist',
    'copy:dist',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
