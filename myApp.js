var express = require("express");
var app = express();
console.log("Hello World");
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

module.exports = app;
