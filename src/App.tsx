import React, { useState } from 'react';
import HomePage from './components/HomePage';
import SoundMemoryGame from './components/SoundMemoryGame/SoundMemoryGame';

// Add custom CSS for animations
const customStyles = `
  @keyframes rotate-y-180 {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(180deg); }
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
  }

  @keyframes bounce-in {
    0% { transform: scale(0.8); opacity: 0; }
    70% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }

  .animate-bounce-in {
    animation: bounce-in 0.6s ease-out;
  }
`;

function App() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  
  const handleStartGame = (gameId: string) => {
    setCurrentGame(gameId);
  };
  
  const handleBackToMenu = () => {
    setCurrentGame(null);
  };
  
  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200">
        {currentGame === 'sound-memory' ? (
          <SoundMemoryGame onBackToMenu={handleBackToMenu} />
        ) : (
          <HomePage onStartGame={handleStartGame} />
        )}
      </div>
    </>
  );
}

export default App;