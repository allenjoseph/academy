var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({

        bower: {
            install: {
                options: {
                    targetDir: './static/vendor-bower',
                    layout: function(type, component, source) {
                        if(type=='js'){
                            return path.join(type, component);
                        }
                        return type;
                    },
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },

        browserify: {
            default: {
                options:{
                    debug: true
                },
                files:{
                    'static/js/app/bundleApp.js' : [
                        'static/js/app/app.js',
                        'static/js/app/utilities.js',
                        'static/js/app/models/*.js',
                        'static/js/app/collections/*.js',
                        'static/js/app/routers/*.js'
                    ]
                }
            },
            react: {
                options:{
                    debug: true,
                    transform: ['reactify']
                },
                files:{
                    'static/js/app/bundle.js' : 'static/js/app/components/**/*.js'
                }
            },
        },

        stylus: {
            compile: {
                options: {
                    compress: false
                },
                files: {
                    'static/css/app.css': [
                        'static/css/stylus/*.styl'
                    ]
                }
            }
        },

        watch:{
            browserify: {
                files: [
                    'static/js/app/app.js',
                    'static/js/app/utilities.js',
                    'static/js/app/models/*.js',
                    'static/js/app/collections/*.js',
                    'static/js/app/routers/*.js'
                ],
                tasks: ['browserify:default']
            },
            browserifyReact: {
                files: ['static/js/app/components/**/*.js'],
                tasks: ['browserify:react']
            },
            stylus: {
                files: [
                    'static/css/stylus/*.styl'
                ],
                tasks: ['stylus:compile']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-stylus');

    grunt.registerTask('clean-vendor', ['bower:install']);
    grunt.registerTask('default', ['watch']);
};
