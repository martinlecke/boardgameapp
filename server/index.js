const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const User = require("./models/User");
const PORT = process.env.PORT || 8080;
const uuid = require("uuid/v4");
const FileStore = require("session-file-store")(session);

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb://localhost:27017/boardgameapp",
    { useNewUrlParser: true }
  )
  .then(async () => {
    console.log("DB Connected!");
  })
  .catch(err => console.error(err));


// add & configure middleware
app.use(
  session({
    genid: req => {
      console.log("Inside the session middleware");
      console.log(req.sessionID);
      return uuid(); // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

app.get("/register", async (req, res) => {
  const user = await new User({
    email: "lecke.martin@gmail.com",
    password: "testpass"
  });
  const random = uuid();
  await user.save();
  return res.send(random);
});

app.get("/test", function(req, res) {
  console.log("Inside the homepage callback function");
  console.log(req.sessionID);
  res.send(`You hit home page!\n`);
});

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log("Express is running on port", PORT);
});
