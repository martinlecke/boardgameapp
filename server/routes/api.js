const express = require("express");
const router = express.Router();
const _ = require('lodash');
const axios = require('axios');
const parseString = require("xml2js").parseString;
const Boardgame = require("../models/Boardgame");

router.get("/search", (req, res) => {
  console.log(req.query);
  if (!_.isEmpty(req.query)) {
    req.query.type = "boardgame";
    req.query.exact = req.query.exact || 0;
    axios
      .get("https://www.boardgamegeek.com/xmlapi2/search", {
        params: req.query
      })
      .then(async response => {
        parseString(response.data, async (err, result) => {
          let results = await result.items.item
            .map(game => {
              if (game["yearpublished"]) {
                const gameId = game["$"].id,
                  title = game["name"][0]["$"].value,
                  yearPublished = game["yearpublished"][0]["$"].value;
                return { gameId, title, yearPublished };
              }
              return false;
            })
            .filter(game => game);

            res.send(results)
            
        });
      })
      .catch(e => {
        console.log("error att hämta", e);
      });
  } else {
    res.send("Det fanns ingen sökterm");
  }
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
    bggRating: Number(
      filtered.statistics[0].ratings[0].average[0]["$"].value
    ).toFixed(2),
    complexity: Number(
      filtered.statistics[0].ratings[0].averageweight[0]["$"].value
    ).toFixed(2),
    age: filtered.minage[0]["$"].value,
    gameId
  });
  await boardgame.save();

  return boardgame;
}

function fetchBoardgameById(gameId) {
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
              const filtered = await filterApiResponse(
                result.items.item[0],
                gameId
              );

              return filtered;
            });
          })
          .catch(e => {
            console.log("error");
          });
}

router.get("/boardgame/:gameId", async (req, res) => {
  const gameId = req.params.gameId;
  Boardgame.findOne({ gameId }).then(async (game) => {
    if (game) {
      res.json(game);
    } else {
      let games = await fetchBoardgameById(gameId);
      res.send(games);  
    }
  });
});

module.exports = router;