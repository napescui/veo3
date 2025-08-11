import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface PlaybackState {
  // Current playback time in seconds
  currentTime: number;
  
  // Playback state
  isPlaying: boolean;
  isLooping: boolean;
  
  // Playback controls
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  setLooping: (looping: boolean) => void;
  
  // Internal animation frame management
  rafId: number | null;
  lastTimestamp: number;
  
  // Project duration (calculated from clips)
  duration: number;
  setDuration: (duration: number) => void;
}

export const usePlaybackStore = create<PlaybackState>()(
  subscribeWithSelector((set, get) => ({
    currentTime: 0,
    isPlaying: false,
    isLooping: false,
    rafId: null,
    lastTimestamp: 0,
    duration: 0,

    play: () => {
      const state = get();
      if (state.isPlaying) return;
      
      set({ isPlaying: true, lastTimestamp: performance.now() });
    },

    pause: () => {
      const state = get();
      if (!state.isPlaying) return;
      
      if (state.rafId) {
        cancelAnimationFrame(state.rafId);
      }
      
      set({ isPlaying: false, rafId: null });
    },

    stop: () => {
      const state = get();
      
      if (state.rafId) {
        cancelAnimationFrame(state.rafId);
      }
      
      set({ 
        isPlaying: false, 
        rafId: null, 
        currentTime: 0 
      });
    },

    seek: (time: number) => {
      const state = get();
      const clampedTime = Math.max(0, Math.min(time, state.duration));
      
      set({ currentTime: clampedTime });
    },

    setLooping: (looping: boolean) => {
      set({ isLooping: looping });
    },

    setDuration: (duration: number) => {
      set({ duration: Math.max(0, duration) });
    }
  }))
);

// Animation loop for playback
let globalRafId: number | null = null;

usePlaybackStore.subscribe(
  (state) => state.isPlaying,
  (isPlaying) => {
    if (isPlaying) {
      const tick = (timestamp: number) => {
        const state = usePlaybackStore.getState();
        
        if (!state.isPlaying) return;
        
        const deltaTime = (timestamp - state.lastTimestamp) / 1000; // Convert to seconds
        let newTime = state.currentTime + deltaTime;
        
        // Handle end of timeline
        if (newTime >= state.duration) {
          if (state.isLooping) {
            newTime = 0;
          } else {
            usePlaybackStore.getState().pause();
            usePlaybackStore.getState().seek(state.duration);
            return;
          }
        }
        
        usePlaybackStore.setState({ 
          currentTime: newTime, 
          lastTimestamp: timestamp 
        });
        
        if (state.isPlaying) {
          globalRafId = requestAnimationFrame(tick);
          usePlaybackStore.setState({ rafId: globalRafId });
        }
      };
      
      usePlaybackStore.setState({ lastTimestamp: performance.now() });
      globalRafId = requestAnimationFrame(tick);
      usePlaybackStore.setState({ rafId: globalRafId });
    } else {
      if (globalRafId) {
        cancelAnimationFrame(globalRafId);
        globalRafId = null;
        usePlaybackStore.setState({ rafId: null });
      }
    }
  }
);