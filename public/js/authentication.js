//https://makitweb.com/how-to-capture-picture-from-webcam-with-webcam-js/

let userPicsData = {}

function take_headshot() {
  // take snapshot and get image data
  try {
    Webcam.snap(function (data_uri) {
      // display results in page
      document.getElementById('headshot').innerHTML =
        '<img id="stuheadshot" src="' + data_uri + '"/>';
      Webcam.upload(data_uri, '/examineeauth', function (code, text) {
        // Upload complete!
        // 'code' will be the HTTP response code from the server, e.g. 200
        // 'text' will be the raw response content

        let userPicData = JSON.parse(text.split('upload: ')[1].trim());
        userPicsData['headShot'] = userPicData;
      })
    });
  } catch (e) {

  }

}

function take_id() {

  try {
    //show a user picture and send data to server
    Webcam.snap(function (data_uri) {

      // display results in page
      document.getElementById('photoid').innerHTML =
        '<img id="stuphotoid" src="' + data_uri + '"/>';

      Webcam.upload(data_uri, '/examineeauth', function (code, text) {
        // Upload complete!
        // 'code' will be the HTTP response code from the server, e.g. 200
        // 'text' will be the raw response content


        let userPicData = JSON.parse(text.split('upload: ')[1].trim());
        userPicsData['userID'] = userPicData;

      })
    });
  } catch (e) {
    console.error(e);
  }
  // take snapshot and get image data
}

function sendPicsData(event) {
  // event.preventDefault();
  const userConfirm = confirm('Do you wish to proceed');

  if (userConfirm) {
    const userPics = JSON.stringify(userPicsData)
    console.log('userPics:', userPics)
    const ajax = new XMLHttpRequest();
    ajax.open("POST", "/examineeauth");
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(userPics)

  } else {
    return userConfirm
  }

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
