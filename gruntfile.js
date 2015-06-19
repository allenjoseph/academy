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
            dev: {
                options:{
                    debug: true,
                    transform: ['reactify']
                },
                files:{
                    'static/js/app/bundle.js' : 'static/js/app/components/*.js'
                }
            }
        },

        watch:{
            browserify: {
                files: ['static/js/app/components/*.js'],
                tasks: ['browserify:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('bower', ['bower:install']);
    grunt.registerTask('default', ['watch']);
};
