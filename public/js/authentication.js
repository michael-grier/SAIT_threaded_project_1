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

  try {
    //show a user picture and send data to server
    Webcam.snap(function (data_uri) {
      const imgSRC = data_uri;
      const formdata = new FormData();
      formdata.append("photoid", imgSRC);
      var ajax = new XMLHttpRequest();
      ajax.open("POST", "/examineeauth");
      ajax.send(formdata);
      
      // display results in page
      document.getElementById('photoid').innerHTML =
        '<img id="stuphotoid" src="' + data_uri + '"/>';
    });
  } catch(e) {
    console.error(e);
  }
  // take snapshot and get image data


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
