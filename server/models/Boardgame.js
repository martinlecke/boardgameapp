const mongoose = require('mongoose');

const boardgameSchema = new mongoose.Schema({
  image: [String],
  yearPublished: String,
  minPlayers: String,
  maxPlayers: String,
  playingTime: String,
  title: String,
  description: String,
  bggRating: String,
  complexity: String,
  age: String,
  gameId: {
    type: Number,
    unique: true
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Boardgame', boardgameSchema)