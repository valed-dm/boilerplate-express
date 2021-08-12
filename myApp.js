var express = require("express");
var app = express();
var bodyParser = require("body-parser");
console.log("Hello World");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    return res.json({ message: "HELLO JSON" });
  } else {
    return res.json({ message: "Hello json" });
  }
});
app.use("/public", express.static(__dirname + "/public"));
app.get(
  "/now",
  function(req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function(req, res) {
    res.json({ time: req.time });
  }
);
app.get("/:word/echo", function(req, res) {
  res.json({ echo: req.params.word });
});
app.route("/name").post(function(req, res) {
  res.json({ name: req.body.first + " " + req.body.last });
});

module.exports = app;
