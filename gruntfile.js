module.exports = function(grunt) {
    grunt.initConfig({

        bower: {
            install: {
                options: {
                    targetDir: './static/vendor-bower',
                    layout:'byType',
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
                        'static/js/app/models/models.js',
                        'static/js/app/collections/collections.js',
                        'static/js/app/views/course.js',
                        'static/js/app/views/discussion.js',
                        'static/js/app/views/exam.js',
                        'static/js/app/routers/main.js'
                    ]
                }
            },
            react: {
                options:{
                    debug: true,
                    transform: ['reactify']
                },
                files:{
                    'static/js/app/bundle.js' : 'static/js/app/components/*.js'
                }
            },
        },

        watch:{
            browserify: {
                files: ['static/js/app/app.js'],
                tasks: ['browserify:default']
            },
            browserifyReact: {
                files: ['static/js/app/components/*.js'],
                tasks: ['browserify:react']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('bower', ['bower:install']);
    grunt.registerTask('default', ['watch']);
};
