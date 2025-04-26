import React from 'react';
import { Player } from '../../types';

interface ScoreBoardProps {
  players: Player[];
  currentPlayerIndex: number;
  turnCount: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  currentPlayerIndex,
  turnCount
}) => {
  // Determine leader
  const maxScore = Math.max(...players.map(p => p.score));
  const leader = players.find(p => p.score === maxScore && maxScore > 0);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-purple-800">Game Progress</h2>
        <div className="text-sm text-purple-600">Turn: {turnCount}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {players.map((player, index) => (
          <div 
            key={player.id}
            className={`p-3 rounded-lg transition-all duration-300 ${
              index === currentPlayerIndex 
                ? 'bg-purple-100 ring-2 ring-purple-500' 
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`font-bold ${
                index === currentPlayerIndex ? 'text-purple-800' : 'text-gray-700'
              }`}>
                {player.name}
                {leader && leader.id === player.id && player.score > 0 && (
                  <span className="ml-2 text-yellow-500">👑</span>
                )}
              </div>
              <div 
                className={`text-2xl font-bold ${
                  index === currentPlayerIndex ? 'text-purple-700' : 'text-gray-600'
                }`}
              >
                {player.score}
              </div>
            </div>
            {index === currentPlayerIndex && (
              <div className="text-purple-600 text-sm mt-1 animate-pulse">
                Current Turn
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;