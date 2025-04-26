// Define common type definitions

export interface Player {
  id: number;
  name: string;
  score: number;
}

export interface GameTile {
  id: number;
  toneId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  tiles: GameTile[];
  players: Player[];
  currentPlayerIndex: number;
  selectedTiles: number[];
  turnCount: number;
  gameOver: boolean;
  winner: Player | null;
  theme: GameTheme;
}

export interface GameProps {
  onBackToMenu: () => void;
}

export type GameTheme = 'classic' | 'minecraft';

export interface ThemeConfig {
  name: string;
  icon: string;
  symbols: string[];
  colors: string[];
}

export const THEME_CONFIGS: Record<GameTheme, ThemeConfig> = {
  classic: {
    name: 'Classic',
    icon: '♫',
    symbols: ['♪', '♫', '♬', '♩', '♭', '♮', '♯', '𝄞'],
    colors: [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-purple-500',
      'bg-indigo-500',
      'bg-orange-500'
    ]
  },
  minecraft: {
    name: 'Minecraft',
    icon: '⛏️',
    symbols: ['🌳', '⛏️', '🗡️', '🏹', '💎', '🧟', '🐑', '🌟'],
    colors: [
      'bg-emerald-600',
      'bg-stone-700',
      'bg-zinc-800',
      'bg-amber-700',
      'bg-cyan-500',
      'bg-green-800',
      'bg-slate-200',
      'bg-yellow-500'
    ]
  }
};