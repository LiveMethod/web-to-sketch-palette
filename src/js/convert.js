// All of these are equivalent
// var colorHex = '#F44336';
// var colorRGB = '244,67,54';
// var colorRGBA = '244,67,54,1';
// var colorHSL = '4,78,96';
// var colorHSLA = '4,78,96,1';

// Output should be an object containing RGB colors
// as percentages of max value (255) and alpha from 0 to 1.
// {
//   "red": 0.95686274509804,
//   "green": 0.26274509803922,
//   "blue": 0.21176470588235,
//   "alpha": 1
// }

function verify(content){

  input = content.split(/[\s,;\t\n]+/);

  // verified colors get added to this array,
  // which is only processed if no colors fail
  colors = [];

  for(var i = 0; i < input.length; i++){
    if( input[i].length >= 3){
      var color = input[i].toLowerCase();
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

      console.log('testing "' + color + '"')
      // text that this is a valid hexcode
      var hexTest = /^[0-9a-f]{6}$/.exec(color);

      // if it passes the hex regex, save and continue
      if( !hexTest ){
        alertError(input[i]);
        return false;
      } else {
        clearError();
        console.log(color + 'is valid');
        colors.push(color);
      }
    }

    // if this is the last color and we got this far, make available for download.
    if( i+1 == input.length){
      console.log(colors);
      prepDownload(colors);
      // return the downloadable thing here.
      // alert('success! check the console.');
      return false; // prevent reload
    }
  }
}

// prepare for download.
// expexts an array of validated colors
function prepDownload(colors){

  // this array gets filled with sketch color objects
  var sketchColors = [];
  for( var c =  0; c < colors.length; c++){
    sketchColors.push( hexToSketch(colors[c]) )
  }

  var jsonStart = '{ \
    "compatibleVersion": "1.4", \
    "pluginVersion": "1.4", \
    "colors": ';

  var finalValue = jsonStart + JSON.stringify(sketchColors) + '}';

  document.getElementById('download-content').value = finalValue;

  $('.download').hide().fadeIn(500);
}

// yell loudly.
function alertError(input){
  helptext = input.length > 2 ? 'Please make sure you have valid hexidecimal codes. \
    3 or 6 chars, "#" sign optional.' : 'Check for stray line breaks at the end. '
  error = $('<div class="error">\
    <strong>No Bueno.</strong>\
    <p>The robot couldn\'t make sense of "'+input+'"</p>\
    <p>' + helptext + '</p></div>');
  $('.error-wrap').html(error);
  $('.download').hide();
}

// retract loud yelling
function clearError(){
  $('.error-wrap').html(' ');
}


// expects a lowercase 6 digit string like 'ff9827'
function hexToSketch(hex){
  // convert the hexcode to a sketch color object
  var toSketch = {
    "red": parseInt( hex.slice(0,2), 16 ) / 255,
    "green": parseInt( hex.slice(2,4), 16 ) / 255,
    "blue": parseInt( hex.slice(4), 16 ) / 255,
    "alpha": 1
  };

  // console.log(toSketch);
  return toSketch;
}

// this bit of serverless download brilliance via
// https://stackoverflow.com/questions/3665115/

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
