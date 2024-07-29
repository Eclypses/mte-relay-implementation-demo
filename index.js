const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
const port = 3000;
app.set("view engine", "handlebars");
app.engine("handlebars", engine());
app.set("views", "./views");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render("main", { layout: "index" });
});

app.get("/login", (req, res) => {
  res.render("login", { layout: "index" });
});

app.post("/login", (req, res) => {
  if (!req.body.password || req.body.password !== "P@ssw0rd!") {
    return res.render("login", {
      layout: "index",
      error: "Password is incorrect.",
    });
  }
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { layout: "index" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
