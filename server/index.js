require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shiritori')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Game model
const gameSchema = new mongoose.Schema({
  players: [{
    name: String,
    score: { type: Number, default: 0 }
  }],
  currentPlayer: { type: Number, default: 0 },
  wordHistory: [String],
  lastLetter: String,
  timer: { type: Number, default: 10 },
  lastAction: { type: String, default: 'start' },
  createdAt: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

// Dictionary API validation
async function validateWord(word) {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.data && response.data[0];
  } catch (error) {
    return false;
  }
}

// Routes
app.post('/api/games', async (req, res) => {
  try {
    const game = new Game({
      players: req.body.players,
      wordHistory: []
    });
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/games/:id/words', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    const { word, playerIndex } = req.body;
    
    // Basic validation
    if (playerIndex !== game.currentPlayer) {
      return res.status(400).json({ error: 'Not your turn' });
    }

    if (game.wordHistory.includes(word.toLowerCase())) {
      return res.status(400).json({ error: 'Word already used' });
    }

    if (word.length < 4) {
      return res.status(400).json({ error: 'Word must be at least 4 letters' });
    }

    if (game.wordHistory.length > 0 && 
        word[0].toLowerCase() !== game.lastLetter.toLowerCase()) {
      return res.status(400).json({ error: `Word must start with "${game.lastLetter}"` });
    }

    // Dictionary validation
    const isValidWord = await validateWord(word);
    if (!isValidWord) {
      game.players[playerIndex].score -= 1;
      game.lastAction = 'invalid';
      await game.save();
      return res.status(400).json({ error: 'Invalid word' });
    }

    // Update game state
    game.wordHistory.push(word.toLowerCase());
    game.lastLetter = word[word.length - 1].toLowerCase();
    game.currentPlayer = (game.currentPlayer + 1) % game.players.length;
    game.players[playerIndex].score += 1;
    game.timer = 10;
    game.lastAction = 'word';
    
    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/games/:id/timeout', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    // Deduct point from current player
    game.players[game.currentPlayer].score -= 1;
    
    // Switch to next player
    game.currentPlayer = (game.currentPlayer + 1) % game.players.length;
    game.timer = 10;
    game.lastAction = 'timeout';
    
    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));