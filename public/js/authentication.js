function take_headshot() {
 // take snapshot and get image data
 Webcam.snap( function(data_uri) {
 // display results in page
 document.getElementById('headshot').innerHTML =
  '<img id="stuheadshot" src="'+data_uri+'"/>';
 } );

}

function take_id() {
 // take snapshot and get image data
 Webcam.snap( function(data_uri) {
 // display results in page
 document.getElementById('photoid').innerHTML =
  '<img id="stuphotoid" src="'+data_uri+'"/>';
 } );

}