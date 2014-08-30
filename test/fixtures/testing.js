/* Testing */

//@define 4to8
//@define 9and10
var miArray = [
//@include 123
//@ifdef 4to8
//@include ./scr/456.js
, 7, 8
//@ifndef skip9and10
//@ifdef 9and10
, 9, 10
//@endif
//@else
//@ifdef 9and10
, "9'", "10'"
//@endif
//@endif
];