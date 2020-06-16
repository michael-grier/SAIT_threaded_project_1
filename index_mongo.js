const express = require("express");
const path = require("path");
const app = express();
const mongo = require("mongodb").MongoClient;
const controler = require("./public/js/controler.js");
const dp = require("./views/DynPage.js");


// connecting to mongo database
const url = "mongodb://localhost:27017";
var conn;
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

// js files
app.use(express.static('public'));

// css-files
//app.use(express.static('')));

// media
//app.use(express.static(path.join(__dirname, 'public/img')));

// static html-files
app.use(express.static(lv_view, {
	extensions: ["html"]
}));

// routing post request and updating data base
app.post('/register', (req, res, next)=>{	

// update database
	email = req.body.Email;
	controler.selDataMongo([email, conn, req], controler.updateDataMongo);

// redirect to confirmation 
	res.redirect("examineeauth");

});

app.get("/confirm", (req, res)=>{
	
// reselect and confirm
    controler.selDataMongo	([email, conn, lv_view, res], dp.genConfirm);

});




// default error handler
app.use((req, res, next)=>{
	res.status(404).sendFile(__dirname + "/views/404.html")
});