const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const app = express();
const host = "127.0.0.1";
const port = "5000";


nunjucks.configure(__dirname + "/views", {
  autoescape: true,
  express: app,
});

//Dodiparser parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use static files in folders
app.use(express.static("static"));

//index.html
app.get("/", (req, res) => {
  res.render("index.html");
});

//places.html
app.get("/signin", (req, res) => {
  res.render("signin.html");
});

//post
app.post("/login", (req, res) => {
  console.log(req.body);
});

//listen
app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});
