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
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      app: {
        files: '.tmp/scripts/app.js',
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['<%= yeoman.app %>/spec/**/*.spec.js'],
        tasks: ['newer:jshint:test', 'karma']
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
        files: ['<%= yeoman.app %>/scripts/**/*.html'],
        tasks: ['html2js:all']
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
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: ['<%= yeoman.app %>', '.tmp'],
          middleware: function(connect) {
            return [
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              connect.static('.tmp'),
              connect().use('/data', connect.static('./data')),
              connect.static(appConfig.app)
            ];
          }
        },
        proxies: [{
          context: '/api',
          host: 'localhost',
          port: 8092,
          https: false,
          changeOrigin: false
        }]
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
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

    watchify: {
      options: {
        debug: true
      },
      dev: {
        src: './app/scripts/app.js',
        dest: '.tmp/scripts/app.js'
      }
    },

    browserify: {
      dist: {
        src: './app/scripts/app.js',
        dest: '.tmp/scripts/app.js'
      },
      options: {
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
        base: '<%= yeoman.app %>',
        module: 'uib-templates',
        fileHeaderString: 'module.exports =',
        singleModule: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      },
      all: {
        src: ['<%= yeoman.app %>/scripts/**/*.html'],
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
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
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
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('make', [
    'clean:server',
    'html2js',
    'browserify'
  ]);


  grunt.registerTask('serve', [
    'clean:server',
    'copy:dev',
    'stylus:dev',
    'html2js',
    'watchify',
    'configureProxies',
    'connect',
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
