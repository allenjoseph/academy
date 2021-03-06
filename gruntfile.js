var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({

        bower: {
            install: {
                options: {
                    targetDir: './static/vendor',
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
            dist: {
                options:{
                    debug: true,
                    transform: ['babelify']
                },
                files:{ 'static/js/academy.js' : [
                        'static/js/app/app.js',
                        'static/js/app/commons/*.js',
                        'static/js/app/models/*.js',
                        'static/js/app/collections/*.js',
                        'static/js/app/router.js',
                        'static/js/app/components/**/*.js',
                    ]
                }
            },
        },

        uglify: {
            default: {
                files: { 'static/js/academy.min.js': [
                        'static/vendor-bower/js/jquery-ui/jquery-ui.js',
                        'static/js/academy.js'
                    ]
                }
            }
        },

        stylus: {
            compile: {
                options: {
                    compress: false
                },
                files: { 'static/css/app/app.css': [
                        'static/css/stylus/*.styl',
                    ]
                }
            }
        },

        cssmin: {
            target: {
                files: { 'static/css/academy.min.css': [
                        'static/vendor/css/font-awesome.min.css',
                        'static/css/app/*.css',
                    ]
                }
            }
        },

        copy: {
            fonts: {
                expand: true,
                cwd: 'static/vendor/fonts',
                src: ['**'],
                dest: 'static/fonts'
            },

        },

        watch:{
            options: {livereload: true},
            browserify: {
                files: ['static/js/app/**/*.js'],
                tasks: ['browserify', 'uglify']
            },
            css: {
                files: [
                    'static/css/stylus/*.styl',
                ],
                tasks: ['stylus:compile','cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', [
        'bower:install',
        'copy:fonts',
        'stylus:compile',
        'cssmin',
        'browserify',
        'uglify',
    ]);
    grunt.registerTask('default', ['watch']);
};
