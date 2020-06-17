const express = require("express");
const path = require("path");
const app = express();
const mongo = require("mongodb").MongoClient;
const controler = require("./public/js/controler.js");
const bodyParser = require('body-parser')
const dp = require("./views/thanks.js");

// this package is for multipart form data(image data) from front end --> /examineeauth 
const formidable = require('formidable'), util = require('util');

// connecting to mongo database
const url = "mongodb://localhost:27017";
var conn;
var email;

// try to connect
mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, client) => { if (err = "NULL") console.log("Connected to mongo database"); conn = client; }
);

// start server with success log message
app.listen(8000, ()=>{ console.log("Server started on port 8000");
});


// View directory
lv_view = path.join(__dirname, 'views');

// to render form content
app.use(express.urlencoded( { extended: true } ));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// js files
app.use(express.static(__dirname));

// css-files
//app.use(express.static('')));

// media
//app.use(express.static(path.join(__dirname, 'public/img')));

// static html-files
app.use(express.static(lv_view, {
	extensions: ["html"]
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/landing.html");
})

// routing post request and updating data base
app.post('/register', (req, res, next)=>{	

// update database
	email = req.body.Email;
	controler.selDataMongo([email, conn, req], controler.updateDataMongo);

// redirect to confirmation 
	res.redirect("examineeauth");
});

app.post('/examineeauth', (req, res) => {
  // console.log('req.body:', req)
  // console.log('req:', req)
  const form = new formidable.IncomingForm();

  form.parse(req, ((err, fields, files) => {
    if( err ) {
      console.error(err.message);
      return ;
    }

    const agentPicPath = files.webcam.path;
    const agentPicDate = files.webcam.lastModifiedDate;

    res.writeHead(200, {'content-type' : 'text/plain'});
    res.write('receive upload: \n\n');

    controler.insertPic([email, conn, agentPicPath, agentPicDate])
    // console.log(files, filePath);
    res.end(util.inspect({fields: fields, files: files}));
  }));

})


app.get("/thanks", (req, res)=>{
	
// reselect examinee and generate thanks page 
    controler.selDataMongo	([email, conn, res], dp.genThanks);
	
});

// default error handler
app.use((req, res, next)=>{
	res.status(404).sendFile(__dirname + "/views/404.html")
});