const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const User = require("./models/User");
const PORT = process.env.PORT || 8080;
const MongoStore = require("connect-mongo")(session);
const cors = require('cors');

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
  User.findById(user).then(user => {
    done(null, user);
  });
});

// create the server
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    },
    secret: "iuwebfhwfb8ywebf8wyebfwe8fyb",
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
    res.json({loggedIn: true});
  } else {
    res.json({loggedIn: false});
  }
});

app.post("/user/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

app.get('/user/logout', function (req, res) {
  req.logout();
  res.send('User logged out.');
});

// testroute for auth
app.get("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("This is an auth route");
  } else {
    res.redirect("/");
  }
});

app.get("/user/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({email: req.user.email});
  } else {
    res.send("You are not logged in");
  }
});

app.post("/user/register", async (req, res) => {
  let user = await new User({
    email: req.body.email,
    password: req.body.password
  });
  await user.save();
  req.logIn(user, function (err) {
    if (err) { return next(err); }
    return res.send({loggedIn: true});
  });
});

app.listen(PORT, () => {
  console.log("Express is running on port", PORT);
});
