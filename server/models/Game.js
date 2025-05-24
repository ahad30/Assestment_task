const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  player1Score: {type: Number, default: 0},
  player2Score: {type: Number, default: 0},
  currentPlayer: {type: 'String' , default: 'Player 1'},
  wordHistory: [{word: 'String' , player: 'String'}],
  lastWord: {type: 'String' , default: ''}
});

const GameModel = mongoose.model('Game', gameSchema);

module.exports = GameModel