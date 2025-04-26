import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Palette } from 'lucide-react';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import VictoryScreen from './VictoryScreen';
import { GameTile, Player, GameState, GameProps, GameTheme, THEME_CONFIGS } from '../../types';
import { playClickSound, playMatchSound } from '../../utils/soundUtils';

const SoundMemoryGame: React.FC<GameProps> = ({ onBackToMenu }) => {
  // Game state
  const [gameState, setGameState] = useState<GameState>(() => {
    // Create initial game state
    const initialPlayers: Player[] = [
      { id: 1, name: 'Player 1', score: 0 },
      { id: 2, name: 'Player 2', score: 0 }
    ];
    
    // Create and shuffle tiles
    const toneIds = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
    shuffleArray(toneIds);
    
    const initialTiles: GameTile[] = toneIds.map((toneId, index) => ({
      id: index,
      toneId,
      isFlipped: false,
      isMatched: false
    }));
    
    return {
      tiles: initialTiles,
      players: initialPlayers,
      currentPlayerIndex: 0,
      selectedTiles: [],
      turnCount: 1,
      gameOver: false,
      winner: null,
      theme: 'classic' as GameTheme
    };
  });
  
  // Theme selector state
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  
  // Destructure state for convenience
  const { 
    tiles, 
    players, 
    currentPlayerIndex, 
    selectedTiles, 
    turnCount,
    gameOver, 
    winner,
    theme
  } = gameState;
  
  // Check if board should be disabled
  const disableBoard = selectedTiles.length >= 2 || gameOver;
  
  // Helper to shuffle array
  function shuffleArray(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Check if the game is over
  const checkGameOver = useCallback((updatedTiles: GameTile[]) => {
    const allMatched = updatedTiles.every(tile => tile.isMatched);
    
    if (allMatched) {
      // Find player with highest score
      const maxScore = Math.max(...players.map(p => p.score));
      const winners = players.filter(p => p.score === maxScore);
      
      // If there's a tie, winner is null
      const gameWinner = winners.length === 1 ? winners[0] : null;
      
      return { gameOver: true, winner: gameWinner };
    }
    
    return { gameOver: false, winner: null };
  }, [players]);
  
  // Handle tile click
  const handleTileClick = (id: number) => {
    if (selectedTiles.length >= 2 || gameOver) return;
    
    playClickSound();
    
    // Update tiles state
    setGameState(prev => {
      // If tile is already flipped or matched, do nothing
      const clickedTile = prev.tiles.find(t => t.id === id);
      if (!clickedTile || clickedTile.isFlipped || clickedTile.isMatched) {
        return prev;
      }
      
      // Flip the clicked tile
      const updatedTiles = prev.tiles.map(tile => 
        tile.id === id ? { ...tile, isFlipped: true } : tile
      );
      
      // Add to selected tiles
      const newSelectedTiles = [...prev.selectedTiles, id];
      
      return {
        ...prev,
        tiles: updatedTiles,
        selectedTiles: newSelectedTiles
      };
    });
  };
  
  // Process turn when two tiles are selected
  useEffect(() => {
    if (selectedTiles.length === 2) {
      const [firstId, secondId] = selectedTiles;
      const firstTile = tiles.find(t => t.id === firstId);
      const secondTile = tiles.find(t => t.id === secondId);
      
      if (firstTile && secondTile) {
        // Check if tiles match
        const isMatch = firstTile.toneId === secondTile.toneId;
        
        // Wait before processing the turn
        const timer = setTimeout(() => {
          setGameState(prev => {
            // Update tiles based on match result
            const updatedTiles = prev.tiles.map(tile => {
              if (tile.id === firstId || tile.id === secondId) {
                return {
                  ...tile,
                  isFlipped: isMatch,
                  isMatched: isMatch
                };
              }
              return tile;
            });
            
            // Update score if match
            let updatedPlayers = [...prev.players];
            if (isMatch) {
              playMatchSound();
              
              updatedPlayers = updatedPlayers.map((player, idx) => 
                idx === prev.currentPlayerIndex 
                  ? { ...player, score: player.score + 1 }
                  : player
              );
            }
            
            // Switch players if no match
            const nextPlayerIndex = isMatch 
              ? prev.currentPlayerIndex 
              : (prev.currentPlayerIndex + 1) % prev.players.length;
              
            // Check if game is over
            const { gameOver, winner } = checkGameOver(updatedTiles);
            
            return {
              ...prev,
              tiles: updatedTiles,
              players: updatedPlayers,
              currentPlayerIndex: nextPlayerIndex,
              selectedTiles: [],
              turnCount: prev.turnCount + (isMatch ? 0 : 1),
              gameOver,
              winner
            };
          });
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [selectedTiles, tiles, checkGameOver]);
  
  // Reset game
  const handlePlayAgain = () => {
    playClickSound();
    
    // Create and shuffle tiles
    const toneIds = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
    shuffleArray(toneIds);
    
    const newTiles: GameTile[] = toneIds.map((toneId, index) => ({
      id: index,
      toneId,
      isFlipped: false,
      isMatched: false
    }));
    
    // Reset game state but keep player names and theme
    setGameState(prev => ({
      tiles: newTiles,
      players: prev.players.map(p => ({ ...p, score: 0 })),
      currentPlayerIndex: 0,
      selectedTiles: [],
      turnCount: 1,
      gameOver: false,
      winner: null,
      theme: prev.theme
    }));
  };
  
  // Handle theme change
  const handleThemeChange = (newTheme: GameTheme) => {
    playClickSound();
    setGameState(prev => ({ ...prev, theme: newTheme }));
    setShowThemeSelector(false);
  };
  
  // Handle back to menu
  const handleBackToMenu = () => {
    playClickSound();
    onBackToMenu();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 p-4 md:p-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <button
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={handleBackToMenu}
          >
            <ArrowLeft size={24} className="text-purple-800" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-purple-800">Sound Memory</h1>
          <button
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors relative"
            onClick={() => setShowThemeSelector(!showThemeSelector)}
          >
            <Palette size={24} className="text-purple-800" />
            
            {/* Theme selector dropdown */}
            {showThemeSelector && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                {(Object.keys(THEME_CONFIGS) as GameTheme[]).map((themeKey) => (
                  <button
                    key={themeKey}
                    className={`w-full px-4 py-2 text-left hover:bg-purple-50 flex items-center space-x-2
                      ${theme === themeKey ? 'bg-purple-100 text-purple-800' : 'text-gray-700'}`}
                    onClick={() => handleThemeChange(themeKey)}
                  >
                    <span>{THEME_CONFIGS[themeKey].icon}</span>
                    <span>{THEME_CONFIGS[themeKey].name}</span>
                  </button>
                ))}
              </div>
            )}
          </button>
        </header>
        
        {/* Score board */}
        <ScoreBoard 
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          turnCount={turnCount}
        />
        
        {/* Game board */}
        <GameBoard 
          tiles={tiles}
          onTileClick={handleTileClick}
          disableBoard={disableBoard}
          theme={theme}
        />
        
        {/* Instructions */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow-md">
          <h3 className="text-lg font-bold text-purple-800 mb-2">How to Play:</h3>
          <ul className="text-purple-700 text-sm space-y-1">
            <li>• Take turns flipping two tiles at a time</li>
            <li>• Listen carefully to match the sounds</li>
            <li>• If the sounds match, you get a point and another turn</li>
            <li>• If they don't match, it's the next player's turn</li>
            <li>• The player with the most matches wins!</li>
          </ul>
        </div>
        
        {/* Victory screen */}
        {gameOver && (
          <VictoryScreen 
            winner={winner}
            players={players}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={handleBackToMenu}
          />
        )}
      </div>
    </div>
  );
};

export default SoundMemoryGame;