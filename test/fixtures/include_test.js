/* include_test.js */

//@define debug
//@define zero 0
//@define emptyString ''
//@define foo smart

var foo = function(){

//@include ./include_1.js

    for (var i = 0; i < Things.length; i++) {
        Things[i];
    }
};