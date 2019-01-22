const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const User = require("./models/User");
const Boardgame = require("./models/Boardgame");
const PORT = process.env.PORT || 8080;
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const parseString = require("xml2js").parseString;
const axios = require("axios");
const _ = require('lodash');

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
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/user/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

app.get("/user/logout", function(req, res) {
  req.logout();
  res.send("User logged out.");
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
    res.json({ email: req.user.email });
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
  req.logIn(user, function(err) {
    if (err) {
      return next(err);
    }
    return res.send({ loggedIn: true });
  });
});

async function filterApiResponse(response, gameId) {
  const allowed = [
    "image",
    "name",
    "yearpublished",
    "description",
    "minplayers",
    "maxplayers",
    "playingtime",
    "minplaytime",
    "maxplaytime",
    "statistics",
    "averageweight",
    "minage"
  ];
  const filtered = Object.keys(response)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: response[key]
      };
    }, {});

  const boardgame = await new Boardgame({
    image: filtered.image,
    yearPublished: filtered.yearpublished[0]["$"].value,
    minPlayers: filtered.minplayers[0]["$"].value,
    maxPlayers: filtered.maxplayers[0]["$"].value,
    playingTime: filtered.playingtime[0]["$"].value,
    title: filtered.name[0]["$"].value,
    description: filtered.description[0],
    bggRating: Number(filtered.statistics[0].ratings[0].average[0]["$"].value).toFixed(2),
    complexity: Number(filtered.statistics[0].ratings[0].averageweight[0]["$"].value).toFixed(2),
    age: filtered.minage[0]["$"].value,
    gameId
  });
  await boardgame.save()

  return boardgame;
}

app.get("/api/boardgame/:gameId", async (req, res) => {
  const gameId = req.params.gameId;
  Boardgame.findOne({gameId})
    .then((game) => {
      if (game) {
        res.json(game)
      } else {
        axios
          .get(`https://www.boardgamegeek.com/xmlapi2/thing`, {
            params: {
              id: gameId,
              videos: 1,
              stats: 1
            }
          })
          .then(response => {
            parseString(response.data, async function (err, result) {
              const filtered = await filterApiResponse(result.items.item[0], gameId);

              res.json(filtered);
            });
          })
          .catch(e => {
            res.send("error");
          });
      }
    })
});

app.get("/api/search", (req, res) => {
  console.log(req.query)
  if (!_.isEmpty(req.query)) {
    req.query.type = 'boardgame';
    req.query.exact = req.query.exact || 0;
    axios.get('https://www.boardgamegeek.com/xmlapi2/search', {
      params: req.query
    })
      .then( async (response) => {
        let results = [];
        await parseString(response.data, (err, result) => {
           results = result.items.item.map((game) => {
             return {
               gameId: game['$'].id,
               title: game['name'][0]['$'].value,
               yearPublished: game['yearpublished'][0]['$'].value
             }
           })
        });
        res.send(results);
      })
      .catch(() => {
        console.log('error att hämta');
      });
  } else {
    res.send('Det fanns ingen sökterm');
  }
});

// /**
//  * Filtering xml api call to JSON with keys defined in Allowed array
//  *
//  */
// app.post('/api/boardgame', (response) => {

//   const allowed = [
//     'image',
//     'name',
//     'yearpublished',
//     'description',
//     'minplayers',
//     'maxplayers',
//     'playingtime',
//     'minplaytime',
//     'maxplaytime',
//     'statistics'
//   ];
//   const filtered = Object.keys(response)
//     .filter(key => allowed.includes(key))
//     .reduce((obj, key) => {
//       return {
//         ...obj,
//         [key]: response[key]
//       };
//     }, {});

//   const restructured = {
//     image: filtered.image,
//     yearpublished: filtered.yearpublished[0]['$'].value,
//     minplayers: filtered.minplayers[0]['$'].value,
//     maxplayers: filtered.maxplayers[0]['$'].value,
//     playingtime: filtered.playingtime[0]['$'].value,
//     name: filtered.name[0]['$'].value,
//     description: filtered.description[0],
//     rating: filtered.statistics[0].ratings[0].average[0]['$'].value
//   }

//   res.json(restructured);
// });

app.listen(PORT, () => {
  console.log("Express is running on port", PORT);
});
