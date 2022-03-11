const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const routes = require("./server/routes/user");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`port open and listening on port: ${port}`);
});

//Express fileuploader
app.use(fileUpload());

//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Parse application in JSON
app.use(bodyParser.json());

//Static files
app.use(express.static("public"));

//Image support
app.use(express.static("server"));
app.use(express.static("images"));
app.use("/upload", express.static(__dirname + 'server/controllers/upload'))

//Templating Engine
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

//Router
// app.get("", (req, res) => {
//   res.render("home");
// });
app.use("/", routes);

//DB Operations
//connection
const pool = mysql.createPool({
  connctionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//Connection check to db
pool.getConnection((err, result) => {
  if (err) throw console.log(err);
  console.log(`Connected as ID: ${result.threadId}`);
});
