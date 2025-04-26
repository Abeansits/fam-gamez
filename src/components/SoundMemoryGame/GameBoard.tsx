import React from 'react';
import MemoryTile from './MemoryTile';
import { GameTile, GameTheme } from '../../types';

interface GameBoardProps {
  tiles: GameTile[];
  onTileClick: (id: number) => void;
  disableBoard: boolean;
  theme: GameTheme;
}

const GameBoard: React.FC<GameBoardProps> = ({
  tiles,
  onTileClick,
  disableBoard,
  theme
}) => {
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4">
      {tiles.map((tile) => (
        <MemoryTile
          key={tile.id}
          id={tile.id}
          toneId={tile.toneId}
          isFlipped={tile.isFlipped}
          isMatched={tile.isMatched}
          disabled={disableBoard}
          theme={theme}
          onClick={onTileClick}
        />
      ))}
    </div>
  );
};

export default GameBoard;