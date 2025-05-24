import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaClock, FaUser, FaTrophy, FaExclamationTriangle } from 'react-icons/fa';

function HomePage() {
  const [game, setGame] = useState(null);
  const [word, setWord] = useState('');
  const [players, setPlayers] = useState(['Player 1', 'Player 2']);
  const [timer, setTimer] = useState(10);
  const [notification, setNotification] = useState(null);
  const timerRef = useRef(null);

  // Start a new game
  const startGame = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/games', {
        players: players.map(name => ({ name }))
      });
      setGame(response.data);
      setTimer(10);
      startTimer();
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  // Submit a word
  const submitWord = async () => {
    if (!word || !game) return;
    
    try {
      const response = await axios.post(
        `http://localhost:5000/api/games/${game._id}/words`,
        { word, playerIndex: game.currentPlayer }
      );
      setGame(response.data);
      setWord('');
      setTimer(10);
      setNotification({
        type: 'success',
        message: `Nice! ${game.players[game.currentPlayer].name} scored a point!`
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.response?.data?.error || 'Error submitting word'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Timer logic
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    setTimer(10);
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeout = async () => {
    if (!game) return;
    
    try {
      const response = await axios.post(
        `http://localhost:5000/api/games/${game._id}/timeout`
      );
      setGame(response.data);
      setTimer(10);
      startTimer();
      setNotification({
        type: 'warning',
        message: `${game.players[game.currentPlayer].name} didn't answer in time! -1 point`
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error handling timeout:', error);
    }
  };

  useEffect(() => {
    if (game) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [game?.currentPlayer]);

  if (!game) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Shiritori Game</h1>
          
          <div className="space-y-4">
            {players.map((player, index) => (
              <div key={index} className="flex items-center">
                <FaUser className="text-indigo-500 mr-2" />
                <input
                  type="text"
                  value={player}
                  onChange={(e) => {
                    const newPlayers = [...players];
                    newPlayers[index] = e.target.value;
                    setPlayers(newPlayers);
                  }}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>

          <button
            onClick={startGame}
            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4">
      {notification && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'error' ? 'bg-red-100 text-red-800' :
          notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">Shiritori Game</h1>
        
        {/* Game Info */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <FaClock className={`mr-2 ${timer <= 5 ? 'text-red-500 animate-pulse' : 'text-indigo-500'}`} />
              <span className={`font-semibold ${timer <= 5 ? 'text-red-600' : ''}`}>
                Time Left: {timer}s
              </span>
            </div>
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
              Current Turn: {game.players[game.currentPlayer].name}
            </div>
          </div>

          <div className="flex justify-between">
            {game.players.map((player, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg ${index === game.currentPlayer ? 'bg-indigo-100 border-2 border-indigo-300' : 'bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <FaUser className={`mr-2 ${index === game.currentPlayer ? 'text-indigo-600' : 'text-gray-500'}`} />
                  <span className="font-medium">{player.name}</span>
                </div>
                <div className="flex items-center mt-1">
                  <FaTrophy className="text-yellow-500 mr-2" />
                  <span>Score: {player.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Word Input */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex">
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder={`Enter a word starting with "${game.lastLetter || '...'}"`}
              className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyPress={(e) => e.key === 'Enter' && submitWord()}
            />
            <button
              onClick={submitWord}
              className="bg-indigo-600 text-white py-2 px-4 rounded-r hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
          {game.lastLetter && (
            <p className="mt-2 text-sm text-gray-600">
              Word must start with: <span className="font-bold">{game.lastLetter}</span>
            </p>
          )}
          <p className="mt-1 text-sm text-gray-600">
            Minimum 4 letters, no repeats
          </p>
        </div>

        {/* Word History */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-indigo-700 mb-3">Word History</h2>
          {game.wordHistory.length === 0 ? (
            <p className="text-gray-500">No words submitted yet</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {game.wordHistory.map((word, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded border`}
                >
                   {word}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;