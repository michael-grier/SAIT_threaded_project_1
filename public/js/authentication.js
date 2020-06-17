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
     
      // display results in page
      document.getElementById('photoid').innerHTML =
        '<img id="stuphotoid" src="' + data_uri + '"/>';

      Webcam.on('uploadProgress', function (progress) {
        // Upload in progress
        // 'progress' will be between 0.0 and 1.0
        console.log('uploadProgress:', progress)
   
      });

      Webcam.on('uploadComplete', function (code, text) {
        // Upload complete!
        // 'code' will be the HTTP response code from the server, e.g. 200
        // 'text' will be the raw response content
        console.log('code:', code)
        console.log('text:', text)
      });

      Webcam.upload(data_uri, '/examineeauth', function (code, text) {
        // Upload complete!
        // 'code' will be the HTTP response code from the server, e.g. 200
        // 'text' will be the raw response content

        console.log('code:', code)
        console.log('text:', text)
      })
    });
  } catch (e) {
    console.error(e);
  }
  // take snapshot and get image data


}

function sendPicsData() {
  const userConfirm = confirm('Do you wish to proceed');
  if(userConfirm) {
    const headshotPic = document.getElementById('headshot').src;
    const idPic = document.getElementById('take_id').src
    
  } else {
    return userConfirm
  }

  // const headshotPic = document.getElementById('headshot').innerHTML
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
