const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "../build")));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb://localhost:27017/nodemountain",
    { useNewUrlParser: true }
  )
  .then(async () => {
    console.log("DB Connected!");
  })
  .catch(err => console.error(err));

app.get("/register", async (req, res) => {
  const user = await new User({
    email: "lecke.martin@gmail.com",
    password: "testpass"
  });
  return res.send(user);
});

app.get("/test", function(req, res) {
  return res.send("test");
});

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log("Express is running on port", PORT);
});
