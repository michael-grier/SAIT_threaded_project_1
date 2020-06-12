const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.listen(8000, () =>{ console.log("Server is running")});

app.use(bodyParser.urlencoded({ extended: true }));

const currentPath = __dirname;

app.set("views", path.join(currentPath, "views"));
// app.set("view engine", "html");
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static("views", {extensions: ["html"]}));

// app.use(express.static(__dirname + '/views'));

const url = "mongodb://localhost/invigulus";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

//this sets up event handling for errors connecting to mongodb
//the error mesage is sent to the error output of the console
db.on("error", console.error.bind(console, "error connecting to mongoDB"));

//this output will be produced once when the db connection is opened
db.once("open", ()=>{ console.log("Connected to MongoDB"); });

app.get("/", (req, res) => {
  res.sendFile(currentPath + "/views/landing.html");
})