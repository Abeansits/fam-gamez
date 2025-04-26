import React, { useEffect } from 'react';
import { Player } from '../../types';
import { playVictorySound } from '../../utils/soundUtils';

interface VictoryScreenProps {
  winner: Player | null;
  players: Player[];
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({
  winner,
  players,
  onPlayAgain,
  onBackToMenu
}) => {
  // Play victory sound on mount
  useEffect(() => {
    playVictorySound();
  }, []);
  
  // Sort players by score (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const isTie = sortedPlayers.length >= 2 && sortedPlayers[0].score === sortedPlayers[1].score;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full animate-bounce-in">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-800 mb-2">
            {isTie ? "It's a Tie!" : "We Have a Winner!"}
          </h2>
          
          {!isTie && winner && (
            <div className="text-2xl text-purple-600 font-semibold mb-4">
              {winner.name} wins with {winner.score} points!
            </div>
          )}
          
          {isTie && (
            <div className="text-xl text-purple-600 mb-4">
              Both players finished with {sortedPlayers[0].score} points!
            </div>
          )}
          
          <div className="flex justify-center">
            <div className="bg-yellow-100 rounded-full px-6 py-2 animate-pulse">
              <span className="text-yellow-600 font-bold">Game Complete!</span>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold text-purple-800 mb-2">Final Scores:</h3>
          <div className="space-y-2">
            {sortedPlayers.map((player) => (
              <div key={player.id} className="flex justify-between items-center">
                <div className="font-semibold text-purple-700">
                  {player.name}
                  {winner && player.id === winner.id && !isTie && (
                    <span className="ml-2 text-yellow-500">👑</span>
                  )}
                </div>
                <div className="bg-purple-200 rounded-full px-3 py-1 text-purple-800 font-bold">
                  {player.score}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex-1"
            onClick={onPlayAgain}
          >
            Play Again
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex-1"
            onClick={onBackToMenu}
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen;