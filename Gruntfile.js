/*
 * grunt-prebuilder
 * https://github.com/Nytramr/grunt-prebuilder
 *
 * Copyright (c) 2014 Martin Rubinsztein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        prebuilder: {
            default_options: {
                options: {
                },
                files: [
                    {dest:'tmp/default_options', src:['test/fixtures/include_test.js', 'test/fixtures/testing.js']}
                ]
            },
            custom_options: {
                options: {
                    definitions: {skip9and10:true},
                    separator: ''
                },
                files: [
                    {dest:'tmp/custom_options', src:['test/fixtures/include_test.js', 'test/fixtures/testing.js']}
                ]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'prebuilder', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
