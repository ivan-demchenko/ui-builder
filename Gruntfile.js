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

    env: {
      dev: {
        NODE_ENV: 'development',
        DEBUG: 'uib:*',
        Q_DEBUG: '1',
        UIB_MNG_HOST: 'mongo',
        UIB_RDS_HOST: 'redis'
      },
      prod: {
        NODE_ENV: 'production',
        UIB_MNG_HOST: 'mongo',
        UIB_RDS_HOST: 'redis'
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: [
          '<%= yeoman.app %>/scripts/**/*.js',
          '!<%= yeoman.app %>/scripts/**/*.spec.js'
        ],
        tasks: ['newer:jshint', 'browserify:app'],
        options: {
          livereload: true
        }
      },
      ws: {
        files: ['<%= yeoman.app %>/uib-socket-client.js'],
        tasks: ['browserify:ws'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: [
          '<%= yeoman.app %>/**/*.spec.js',
          '<%= yeoman.app %>/test/mock/**/*.js'
        ],
        tasks: ['browserify:app', 'newer:jshint', 'karma'],
        options: {
          livereload: true
        }
      },
      fontIcons: {
        files: [
          '<%= yeoman.app %>/styles/icons/*.css',
          '<%= yeoman.app %>/styles/font/*.{eot,svg,ttf,woff}'
        ],
        tasks: ['newer:copy:dev', 'stylus'],
        options: {
          livereload: true
        }
      },
      stylus: {
        files: ['<%= yeoman.app %>/styles/**/*.styl'],
        tasks: ['stylus:dev'],
        options: {
          livereload: true
        }
      },
      templates: {
        files: ['<%= yeoman.app %>/**/*.jade'],
        tasks: ['newer:jade:frontend', 'html2js:all', 'browserify:app'],
        options: {
          livereload: true
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
          '.tmp/scripts/uib-socket-client.js': '<%= yeoman.app %>/uib-socket-client.js'
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

    jade: {
      frontend: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/',
          src: ['**/*.jade'],
          dest: '.tmp',
          ext: '.html'
        }]
      }
    },

    html2js: {
      options: {
        base: '.tmp',
        module: 'uib-templates',
        fileHeaderString: 'module.exports =',
        singleModule: true,
        rename: function(moduleName) {
          return '/frontend/' + moduleName;
        },
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      },
      all: {
        src: ['.tmp/**/*.html'],
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

    // Copies remaining files to places other tasks can use
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles/font',
          dest: '.tmp/font',
          src: ['*.*']
        }, {
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
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/styles/font',
          dest: '<%= yeoman.dist %>/font',
          src: ['*.*']
        }, {
          expand: true,
          cwd: '.tmp/scripts',
          dest: '<%= yeoman.dist %>/scripts',
          src: ['*.js']
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/internal',
          dest: '<%= yeoman.dist %>/internal',
          src: ['*.js']
        }]
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          ext: 'js, html',
          watch: ['server', 'data'],
          ignore: ['node_modules/**']
        }
      }
    },

    concurrent: {
      dev: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }

  });

  grunt.registerTask('serve', [
    'env:dev',
    'clean:server',
    'copy:dev',
    'stylus:dev',
    'jade',
    'html2js',
    'browserify',
    'concurrent:dev'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'html2js:all',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('default', [
    'clean:dist',
    'jade',
    'html2js',
    'browserify',
    'stylus:dist',
    'copy:dist'
  ]);
};
