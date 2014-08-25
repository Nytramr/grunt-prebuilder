/*
 * grunt-prebuilder
 * https://github.com/Nytramr/grunt-prebuilder
 *
 * Copyright (c) 2014 Martin Rubinsztein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('prebuilder', 'Grunt plugin that performs as a C precompiler does.', function() {
        //We need path in order to resolve relative file paths
        var path = require('path');

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        var skipCode = 0;

        var definitions = {};

        //Funtion to process the file content
        var processFile = function(filepath){

            // Read file source.
            var fileContent = grunt.file.read(filepath);

            var fileParts = fileContent.split('//@'); //Lets find all prebuild directives, if any.

            if (fileParts.length > 1) {
                var processParts = [fileParts[0]];
                //Lets see which directives are
                for(var i=1;i<fileParts.length;i++){
                    // var splitedPart = fileParts[i].match(/(\w+)\s+(.*?)[\r\n]((?:.|\n|\r)*)/);
                    var splitedParts = fileParts[i].match(/([\w \.\/\-]+)[\n\r]*((?:.|\n|\r)*)/);
                    if (splitedParts) {
                        var directive = splitedParts[1].match(/(\w+)\s+(.*)/);
                        
                        if (directive[1].toLowerCase() === 'endif') {
                            if(skipCode){
                                skipCode--;
                            }else{
                                //Error
                            }
                            
                        }else if (directive[1].toLowerCase() === 'include') {
                            var includePath = path.join(path.dirname(filepath), directive[2].replace(/['"]/g, '').trim());
                            // importpath = path.resolve(path.dirname(filepath)+'/'+importpath);
                            if(grunt.file.exists(includePath))
                            {
                                processParts.push(processFile(includePath));
                            }
                            else
                            {
                                grunt.log.warn('File "' + includePath + '" not found. Directive omitted');
                            }
                        }else if (directive[1].toLowerCase() === 'define') {
                            //Not the rest of the line is needed, just the first word
                            var def = directive[2].match(/\w+/);

                            if(def && def[0]){
                                definitions[def[0]] = definitions[def[0]] || 1;
                            }

                        }else if (directive[1].toLowerCase() === 'ifdef') {

                        }else if (directive[1].toLowerCase() === 'ifndef') {
                        }

                        processParts.push(splitedParts[2]);
                    }else{
                        //We can't loose the code, lets add it to the parts
                        //TODO: Throw a comment to warn the user

                        processParts.push('//@' + fileParts[i]);

                    }

                }

                return processParts.join('\n');
                
            }

            return fileContent;
        };

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {

            // Concat specified files.
            var srcFiles = f.src.filter(function(filepath) {
            // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(function processEachFile(filepath, index){

                var src = processFile(filepath);

                var destFilePath = path.join(f.dest,path.basename(filepath));
                // Write the destination file.
                grunt.file.write(destFilePath, src);

                // Print a success message.
                grunt.log.writeln('File "' + destFilePath + '" created.');
            });

        });
    });

};