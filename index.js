const express = require("express");
const app = express();

app.use(express.static("views", { "extensions": ["html"] }));
app.use(express.static(__dirname));
app.use(express.urlencoded({extended : true}));

app.listen(8000, ()=>{console.log("Server started on port 8000")});

app.get("/", (req, res) => {
	res.redirect("/landing");
}); 

app.get("/landing", (req, res) => {
	res.sendFile("landing");
}); 

app.get("/register", (req, res) => {
	res.sendFile("register");
}); 

//Send 404 page when a page doesn't exist
app.use((req, res, next) => {
	res.status(404).sendFile(__dirname + "/views/404.html");
});