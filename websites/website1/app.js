const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const app = express();
const host = "127.0.0.1";
const port = "4000";


nunjucks.configure(__dirname + "/templates", {
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
app.get("/places", (req, res) => {
  res.render("places.html");
});

//post
app.post("/login", (req, res) => {
  console.log(req.body);
});

//listen
app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});
