//https://makitweb.com/how-to-capture-picture-from-webcam-with-webcam-js/

function take_headshot() {
  // take snapshot and get image data
  Webcam.snap(function (data_uri) {
    // display results in page
    document.getElementById('headshot').innerHTML =
      '<img id="stuheadshot" src="' + data_uri + '"/>';
  });

}

function take_id() {
  // take snapshot and get image data
  Webcam.snap(function (data_uri) {
    // display results in page
    document.getElementById('photoid').innerHTML =
      '<img id="stuphotoid" src="' + data_uri + '"/>';
  });

}
/* https://www.npmjs.com/package/multer-gridfs-storage */

/*  https://stackoverflow.com/questions/48722959/upload-image-to-mongodb-with-nodejs-and-express (Add mongoDB upload later )
function saveSnap() {
var headImage = document.getElementById("headshot").src;
var idImage = document.getElementById("photoid").src;

Webcam.upload( headshot, 'upload.php', function(code, text) {
  console.log('Saved headshot');
});

Webcam.upload( photoid, 'upload.php', function(code, text) {
  console.log('Saved photoid');
});

}
*/
