module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // setting folder templates
        dirs: {
            css: 'assets/css',
            images: 'assets/images',
            js: 'assets/js',
            less: 'assets/less',
        },

        // Compile all .less files.
        less: {

            // one to one
            front: {
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.less %>/style.less'
                }
            },
        },

        // Generate POT files.
        makepot: {
            target: {
                options: {
                    exclude: ['build/.*', 'node_modules/*', 'assets/*'],
                    domainPath: '/languages/', // Where to save the POT file.
                    potFilename: 'fb-account-kit.pot', // Name of the POT file.
                    type: 'wp-plugin', // Type of project (wp-plugin or wp-theme).
                    potHeaders: {
                        'report-msgid-bugs-to': 'https://example.com',
                        'language-team': 'LANGUAGE <EMAIL@ADDRESS>'
                    }
                }
            }
        },

        uglify: {
            minify: {
                files: {
                    '<%= dirs.js %>/scripts.min.js': ['<%= dirs.js %>/script.js'],
                }
            }
        },

        watch: {
            less: {
                files: ['<%= dirs.less %>/*.less'],
                tasks: ['less:front']
            },

            js: {
                files: [
                    '<%= dirs.js %>/*.js',
                ],
                tasks: [
                    'jshint:all'
                ]
            }
        },

        // Clean up build directory
        clean: {
            main: ['build/']
        },

        // Copy the plugin into the build directory
        copy: {
            main: {
                src: [
                    '**',
                    '!node_modules/**',
                    '!build/**',
                    '!bin/**',
                    '!.git/**',
                    '!Gruntfile.js',
                    '!secret.json',
                    '!package.json',
                    '!composer.json',
                    '!debug.log',
                    '!phpunit.xml',
                    '!.gitignore',
                    '!.gitmodules',
                    '!npm-debug.log',
                    '!plugin-deploy.sh',
                    '!export.sh',
                    '!config.codekit',
                    '!package-lock.json',
                    '!README.md',
                    '!**/nbproject/**',
                    '!assets/less/**',
                    '!tests/**',
                    '!**/Gruntfile.js',
                    '!**/package.json',
                    '!**/readme.md',
                    '!**/*~'
                ],
                dest: 'build/'
            }
        },

        //Compress build directory into <name>.zip and <name>-<version>.zip
        compress: {
            main: {
                options: {
                    mode: 'zip',
                    archive: './build/fb-account-kit-v<%= pkg.version %>.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['**/*'],
                dest: 'fb-account-kit'
            }
        },

        // jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },

            all: [
                'Gruntfile.js',
                '<%= dirs.js %>/*.js',
            ]
        },

        // concat/join files
        concat: {
            example: {
                files: {
                    '<%= dirs.js %>/all-scripts.js': [
                        'script1.js', 'script2.js'
                    ],
                },
            },
        },
    });

    // Load NPM tasks to be used here
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-wp-i18n' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-compress' );
    grunt.loadNpmTasks( 'grunt-notify' );

    grunt.registerTask( 'default', [
        'makepot'
    ]);

    grunt.registerTask( 'release', [
        // 'makepot', 'uglify'
    ]);

    grunt.registerTask( 'zip', [
        'clean', 'copy', 'compress'
    ]);
};
