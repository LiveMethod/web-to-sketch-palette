// All of these are equivalent
var colorHex = '#F44336';
var colorRGB = '244,67,54';
var colorRGBA = '244,67,54,1';
var colorHSL = '4,78,96';
var colorHSLA = '4,78,96,1';

// Output should be an object containing RGB colors
// as percentages of max value (255) and alpha from 0 to 1.
// {
//   "red": 0.95686274509804,
//   "green": 0.26274509803922,
//   "blue": 0.21176470588235,
//   "alpha": 1
// }

function hexToSketch(hex){
  var color = hex.toLowerCase();

  // validate the thing is actually hexcode.

  // if the first char is #, remove it
   if (color.charAt(0) == '#') {
    color = color.substring(1);
   }
  
  // if the length is exactly 3, double each character to get 6
  if (color.length == 3){
    chars = color.split('');
    color = chars[0] + chars[0] + chars[1] + chars[1] + chars[2] + chars[2];
  }

  // text that this is a valid hexcode
  var hexTest = /[0-9a-f]{6}/.exec(color);

  if( !hexTest ){
    console.log(color + ' TODO: FAIL');
    return false;
  } else {
    console.log(color + ' looks okay');
  }

  // convert the hexcode to an array of RGB vals formatted for sketch
  var toSketch = [
    parseInt( color.slice(0,2), 16 ) / 255,
    parseInt( color.slice(2,4), 16 ) / 255,
    parseInt( color.slice(4), 16 ) / 255,
  ];

  console.log(toRGB);
}

console.log('calling hex to sketch with color #F44336');
hexToSketch('#F44336');
console.log(' ');

console.log('calling hex to sketch with color #123');
hexToSketch('#123');
console.log(' ');

console.log('calling hex to sketch with color #CAT');
hexToSketch('#CAT');
console.log(' ');