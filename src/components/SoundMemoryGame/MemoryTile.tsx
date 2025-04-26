import React, { useState, useEffect } from 'react';
import { playTone } from '../../utils/soundUtils';
import { GameTheme, THEME_CONFIGS } from '../../types';

interface MemoryTileProps {
  id: number;
  toneId: number;
  isFlipped: boolean;
  isMatched: boolean;
  disabled: boolean;
  theme: GameTheme;
  onClick: (id: number) => void;
}

const MemoryTile: React.FC<MemoryTileProps> = ({
  id,
  toneId,
  isFlipped,
  isMatched,
  disabled,
  theme,
  onClick
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Handle animation when tile is flipped
  useEffect(() => {
    if (isFlipped) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isFlipped]);
  
  // Play sound when tile is flipped
  useEffect(() => {
    if (isFlipped && !isMatched) {
      playTone(toneId);
    }
  }, [isFlipped, isMatched, toneId]);
  
  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onClick(id);
    }
  };
  
  // Get theme configuration
  const themeConfig = THEME_CONFIGS[theme];
  
  // Generate background color based on toneId (only visible when matched)
  const getBgColor = () => {
    return isMatched ? themeConfig.colors[toneId % themeConfig.colors.length] : 'bg-white';
  };
  
  return (
    <div 
      className={`relative w-full pb-[100%] cursor-pointer transition-transform duration-300 ${isAnimating ? 'scale-[0.95]' : ''}`}
      onClick={handleClick}
    >
      <div 
        className={`absolute inset-0 rounded-lg shadow-md ${getBgColor()} transform transition-all duration-300 
          ${isFlipped || isMatched ? 'rotate-y-180' : ''} 
          flex items-center justify-center
          ${disabled && !isMatched ? 'opacity-70' : 'opacity-100'}
          ${isMatched ? 'ring-4 ring-yellow-300 animate-pulse' : ''}
        `}
      >
        {isFlipped || isMatched ? (
          <div className="text-white text-3xl font-bold transform rotate-y-180">
            {themeConfig.symbols[toneId % themeConfig.symbols.length]}
          </div>
        ) : (
          <div className={`${theme === 'minecraft' ? 'bg-stone-800' : 'bg-gradient-to-br from-purple-600 to-purple-800'} absolute inset-0 rounded-lg flex items-center justify-center`}>
            <span className="text-white text-2xl">?</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryTile;