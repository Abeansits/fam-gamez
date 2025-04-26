import React from 'react';
import { Music } from 'lucide-react';
import { playClickSound } from '../utils/soundUtils';

interface HomePageProps {
  onStartGame: (gameId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartGame }) => {
  const handleGameSelect = (gameId: string) => {
    playClickSound();
    onStartGame(gameId);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4 animate-bounce">
            Fun Game Collection
          </h1>
          <p className="text-purple-700 text-lg md:text-xl">
            Tap a game to start playing!
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sound Memory Game Card */}
          <div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleGameSelect('sound-memory')}
          >
            <div className="h-40 bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
              <Music size={80} className="text-white animate-pulse" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-2">Sound Memory Game</h2>
              <p className="text-purple-600">
                Test your memory by matching sounds! Find all the pairs to win.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  2 Players
                </span>
                <span className="text-yellow-500 font-semibold">
                  Version 1.0
                </span>
              </div>
            </div>
          </div>
          
          {/* Future Game Card (Placeholder) */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden opacity-50 cursor-not-allowed">
            <div className="h-40 bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center">
              <div className="text-white text-2xl font-bold">Coming Soon</div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">More Games</h2>
              <p className="text-gray-600">
                Stay tuned for more exciting games coming to our collection!
              </p>
              <div className="mt-4">
                <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                  Future Release
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;