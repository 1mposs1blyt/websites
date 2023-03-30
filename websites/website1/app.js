const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const app = express();
const host = "127.0.0.1";
const port = "5000";
const sqlite = require("sqlite3")

nunjucks.configure(__dirname + "/views", {
  autoescape: true,
  express: app,
});

//Dodiparser parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use static files in folders
app.use(express.static("static"));
async function get_data(query, data_query) {
  let db = new sqlite.Database("users.db", (err) => {
    if (err) {
      console.error(err.message);
    } else {
      // console.log("connect to db complete!");
    }
  });
  let sql_queries = {
    all: `SELECT * FROM users`,
    auth: `SELECT * FROM users WHERE name = ? or email = ? AND password = ?`,
    reg:`INSERT INTO users (id,name, email, password) VALUES (?,?, ?, ?)`,
    // cartdelone: `UPDATE usercart SET `
  }
  let sql = sql_queries[query];
  let promise = new Promise((resolve, reject) => {
    db.all(sql, data_query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows)
      }
    });
  })

  let data = await promise;
  db.close();
  return data;
}
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
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.email;
  get_data("auth", [name,email,password]).then((resolve) => {
    if (resolve.lenght == 0) {
      console.log("NULL")
      res.sendStatus(401).send("not ok")
    } else {
      console.log(resolve)
      if (resolve.length > 0) {
        res.status(200).send("Вход вывполнен успешно!")
      }
      else {
        res.status(401).send("not ok")
      }
    }
  })
});
app.post('/reg', (req, res) => {
  console.log(req.body);
  let id = Math.floor(Math.random() * 10000) + 1;
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.email;
  get_data("reg", [id,name,email,password]).then((resolve) => {
    console.log(resolve)
    res.status(200).send("РЕгистрация успешна!")
  })
})
// router.post('/', function (req, res, next) {
//   console.log("auth:",req.sessionID)
//   let nick = req.body.nick;
//   let password = req.body.password;
//   get_data("auth", [nick, password]).then((resolve) => {
//     if (resolve.lenght == 0) {
//       console.log("NULL")
//       res.sendStatus(401)
//     } else {
//       console.log(resolve)
//       if (resolve.length > 0) {
//         res.status(200).send(resolve[0])
//       }
//       else {
//         res.status(401).send("not ok")
//       }
//     }
//   });
// })


//listen
app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});
