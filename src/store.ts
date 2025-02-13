import { create } from 'zustand';

interface Heart {
  position: [number, number, number];
  id: string;
  scale: number;
}

interface Obstacle {
  position: [number, number, number];
  id: string;
}

interface GameState {
  hearts: Heart[];
  obstacles: Obstacle[];
  score: number;
  level: number;
  targetScore: number;
  showInstructions: boolean;
  addHeart: (position: [number, number, number]) => void;
  removeHeart: (id: string) => void;
  addObstacle: () => void;
  removeObstacle: (id: string) => void;
  incrementScore: (points: number) => void;
  checkLevelUp: () => void;
  toggleInstructions: () => void;
}

export const useStore = create<GameState>((set, get) => ({
  hearts: [],
  obstacles: [],
  score: 0,
  level: 1,
  targetScore: 10,
  showInstructions: true,
  addHeart: (position) =>
    set((state) => ({
      hearts: [...state.hearts, { 
        position, 
        id: Math.random().toString(36).substr(2, 9),
        scale: 1
      }],
    })),
  removeHeart: (id) =>
    set((state) => ({
      hearts: state.hearts.filter(heart => heart.id !== id)
    })),
  addObstacle: () =>
    set((state) => ({
      obstacles: [...state.obstacles, {
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        ],
        id: Math.random().toString(36).substr(2, 9)
      }]
    })),
  removeObstacle: (id) =>
    set((state) => ({
      obstacles: state.obstacles.filter(obstacle => obstacle.id !== id)
    })),
  incrementScore: (points) =>
    set((state) => ({
      score: state.score + points
    })),
  checkLevelUp: () =>
    set((state) => {
      if (state.score >= state.targetScore) {
        return {
          level: state.level + 1,
          targetScore: state.targetScore * 2,
        };
      }
      return state;
    }),
  toggleInstructions: () =>
    set((state) => ({
      showInstructions: !state.showInstructions
    })),
}));