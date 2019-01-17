const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const User = require("./models/User");
const PORT = process.env.PORT || 8080;
const uuid = require("uuid/v4");
const FileStore = require("session-file-store")(session);
const MongoStore = require("connect-mongo")(session);

mongoose
  .connect(
    "mongodb://localhost:27017/boardgameapp",
    { useNewUrlParser: true }
  )
  .then(async () => {
    console.log("DB Connected!");
  })
  .catch(err => console.error(err));

// configure passport.js to use the local strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email }).then(user => {
      if (!user || !user.password) {
        return done(null, false);
      }

      user.verifyPassword(password).then(isMatch => {
        if (!isMatch) {
          return done(null, false);
        }
        /**
         * If no error, then return user to done method
         */
        return done(null, user);
      });
    });
  })
);

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  console.log("THIS IS ID", user);
  User.findById(user).then(user => {
    done(null, user);
  });
});

// create the server
const app = express();

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    },
    secret: "!Id!K7L16HBAkoYu",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 30 * 24 * 60 * 60,
      autoRemove: "native"
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send(`This is ze homepage /`);
});

app.get("/user/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.send('you are logged in');
  } else {
    res.send("You are not logged in");
  }
});

app.post("/user/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

// testroute for auth
app.get("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("This is an auth route");
  } else {
    res.redirect("/");
  }
});

app.post("/user/register", async (req, res) => {
  let user = await new User({
    email: req.body.email,
    password: req.body.password
  });
  await user.save();
  res.send(user);
});

app.listen(PORT, () => {
  console.log("Express is running on port", PORT);
});
