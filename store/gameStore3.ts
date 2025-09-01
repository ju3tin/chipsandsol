// store/gameStore2.ts
import { create } from 'zustand';
import { fetchGameState } from '@/utils/api'; // <-- Your API function


export enum GameState {
  WAITING = 'WAITING',
 // STARTED = 'STARTED',
  CRASHED = 'CRASHED',
  RUNNING = 'STARTED',
  timeRemaining = 0,
  STOPPED = 'STOPPED'
}

interface GameStore {
  state: GameState;
  multiplier: number;
  crashPoint: number;
  setGameState: (newState: GameState) => void;
  setMultiplier: (value: number) => void;
  setCrashPoint: (value: number) => void;
  updateFromApi: () => Promise<void>; // <-- Async API updater
}

export const useGameStore = create<GameStore>((set) => ({
  state: GameState.WAITING,
  multiplier: 1.0,
  crashPoint: 0,

  setGameState: (state) => set({ state }),
  setMultiplier: (multiplier) => set({ multiplier }),
  setCrashPoint: (crashPoint) => set({ crashPoint }),

  updateFromApi: async () => {
    try {
      const gameData = await fetchGameState(); // call your backend

      set({
        state: gameData.state,
        multiplier: gameData.multiplier,
        crashPoint: gameData.crashPoint,
      });
    } catch (err) {
      console.error('Failed to fetch game state:', err);
    }
  },
}));
