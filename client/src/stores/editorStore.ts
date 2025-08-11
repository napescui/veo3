import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Project, TimelineState, ViewerState, Track, Clip, MediaFile } from '@/types/editor';

interface EditorState {
  // Project
  project: Project | null;
  hasUnsavedChanges: boolean;
  
  // Timeline
  timeline: TimelineState;
  
  // Viewer
  viewer: ViewerState;
  
  // Selection
  selectedClips: string[];
  selectedTracks: string[];
  
  // Actions
  setProject: (project: Project) => void;
  updateProject: (updates: Partial<Project>) => void;
  addTrack: (track: Track) => void;
  removeTrack: (trackId: string) => void;
  updateTrack: (trackId: string, updates: Partial<Track>) => void;
  addClip: (clip: Clip) => void;
  removeClip: (clipId: string) => void;
  updateClip: (clipId: string, updates: Partial<Clip>) => void;
  addMedia: (media: MediaFile) => void;
  removeMedia: (mediaId: string) => void;
  setCurrentTime: (time: number) => void;
  setZoom: (zoom: number) => void;
  setPlaying: (playing: boolean) => void;
  selectClip: (clipId: string, addToSelection?: boolean) => void;
  selectTrack: (trackId: string, addToSelection?: boolean) => void;
  clearSelection: () => void;
  splitClip: (clipId: string, time: number) => void;
  duplicateClip: (clipId: string) => void;
  setInPoint: (time?: number) => void;
  setOutPoint: (time?: number) => void;
}

const defaultProject: Project = {
  id: 'new-project',
  name: 'Untitled Project',
  version: 1,
  fps: 30,
  width: 1920,
  height: 1080,
  duration: 0,
  tracks: [
    {
      id: 'v1',
      type: 'video',
      name: 'Video 1',
      locked: false,
      muted: false,
      solo: false,
      height: 80,
      clips: []
    },
    {
      id: 'a1',
      type: 'audio',
      name: 'Audio 1',
      locked: false,
      muted: false,
      solo: false,
      height: 60,
      clips: []
    }
  ],
  media: [],
  effects: [],
  transitions: [],
  markers: [],
  settings: {
    previewQuality: 'half',
    snapEnabled: true,
    rippleDelete: false,
    magneticTimeline: true
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

const defaultTimeline: TimelineState = {
  currentTime: 0,
  zoom: 1,
  scrollX: 0,
  selectedClips: [],
  selectedTracks: [],
  isPlaying: false,
  isLooping: false
};

const defaultViewer: ViewerState = {
  safeMargins: false,
  rulers: false,
  guides: false,
  backgroundColor: '#000000'
};

export const useEditorStore = create<EditorState>()(
  subscribeWithSelector((set, get) => ({
    project: defaultProject,
    hasUnsavedChanges: false,
    timeline: defaultTimeline,
    viewer: defaultViewer,
    selectedClips: [],
    selectedTracks: [],

    setProject: (project) => {
      set({ project, hasUnsavedChanges: false });
    },

    updateProject: (updates) => {
      const { project } = get();
      if (!project) return;
      
      set({
        project: { ...project, ...updates, updatedAt: new Date() },
        hasUnsavedChanges: true
      });
    },

    addTrack: (track) => {
      const { project } = get();
      if (!project) return;
      
      set({
        project: {
          ...project,
          tracks: [...project.tracks, track],
          updatedAt: new Date()
        },
        hasUnsavedChanges: true
      });
    },

    removeTrack: (trackId) => {
      const { project } = get();
      if (!project) return;
      
      set({
        project: {
          ...project,
          tracks: project.tracks.filter(t => t.id !== trackId),
          updatedAt: new Date()
        },
        hasUnsavedChanges: true
      });
    },

    updateTrack: (trackId, updates) => {
      const { project } = get();
      if (!project) return;
      
      set({
        project: {
          ...project,
          tracks: project.tracks.map(t => 
            t.id === trackId ? { ...t, ...updates } : t
          ),
          updatedAt: new Date()
        },
        hasUnsavedChanges: true
      });
    },

    addClip: (clip) => {
      const { project } = get();
      if (!project) return;
      
      set({
        project: {
          ...project,
          tracks: project.tracks.map(t => 
            t.id === clip.trackId 
              ? { ...t, clips: [...t.clips, clip] }
              : t
          ),
          duration: Math.max(project.duration, clip.endTime),
          updatedAt: new Date()
        },
        hasUnsavedChanges: true
      });
    },

    removeClip: (clipId) => {
      const { project } = get();
      if (!project) return;
      
      set({
        project: {
          ...project,
          tracks: project.tracks.map(t => ({
            ...t,
            clips: t.clips.filter(c => c.id !== clipId)
          })),
          updatedAt: new Date()
        },
        hasUnsavedChanges: true,
        selectedClips: get().selectedClips.filter(id => id !== clipId)
      });
    },

    updateClip: (clipId, updates) => {
      const { project } = get();
      if (!project) return;
      
      set({
        project: {
          ...project,
          tracks: project.tracks.map(t => ({
            ...t,
            clips: t.clips.map(c => 
              c.id === clipId ? { ...c, ...updates } : c
            )
          })),
          updatedAt: new Date()
        },
        hasUnsavedChanges: true
      });
    },

    addMedia: (media) => {
      const { project } = get();
      if (!project) return;
      
      set({
        project: {
          ...project,
          media: [...project.media, media],
          updatedAt: new Date()
        },
        hasUnsavedChanges: true
      });
    },

    removeMedia: (mediaId) => {
      const { project } = get();
      if (!project) return;
      
      set({
        project: {
          ...project,
          media: project.media.filter(m => m.id !== mediaId),
          updatedAt: new Date()
        },
        hasUnsavedChanges: true
      });
    },

    setCurrentTime: (time) => {
      set(state => ({
        timeline: { ...state.timeline, currentTime: time }
      }));
    },

    setZoom: (zoom) => {
      set(state => ({
        timeline: { ...state.timeline, zoom }
      }));
    },

    setPlaying: (playing) => {
      set(state => ({
        timeline: { ...state.timeline, isPlaying: playing }
      }));
    },

    selectClip: (clipId, addToSelection = false) => {
      set(state => ({
        selectedClips: addToSelection 
          ? [...state.selectedClips, clipId]
          : [clipId],
        selectedTracks: []
      }));
    },

    selectTrack: (trackId, addToSelection = false) => {
      set(state => ({
        selectedTracks: addToSelection 
          ? [...state.selectedTracks, trackId]
          : [trackId],
        selectedClips: []
      }));
    },

    clearSelection: () => {
      set({ selectedClips: [], selectedTracks: [] });
    },

    splitClip: (clipId, time) => {
      const { project } = get();
      if (!project) return;
      
      const clip = project.tracks.flatMap(t => t.clips).find(c => c.id === clipId);
      if (!clip || time <= clip.startTime || time >= clip.endTime) return;
      
      const firstClip = {
        ...clip,
        id: `${clip.id}-1`,
        endTime: time,
        sourceEndTime: clip.sourceStartTime + (time - clip.startTime)
      };
      
      const secondClip = {
        ...clip,
        id: `${clip.id}-2`,
        startTime: time,
        sourceStartTime: clip.sourceStartTime + (time - clip.startTime)
      };
      
      set({
        project: {
          ...project,
          tracks: project.tracks.map(t => ({
            ...t,
            clips: t.clips.flatMap(c => 
              c.id === clipId ? [firstClip, secondClip] : [c]
            )
          })),
          updatedAt: new Date()
        },
        hasUnsavedChanges: true
      });
    },

    duplicateClip: (clipId) => {
      const { project } = get();
      if (!project) return;
      
      const clip = project.tracks.flatMap(t => t.clips).find(c => c.id === clipId);
      if (!clip) return;
      
      const duplicatedClip = {
        ...clip,
        id: `${clip.id}-copy`,
        startTime: clip.endTime,
        endTime: clip.endTime + (clip.endTime - clip.startTime)
      };
      
      get().addClip(duplicatedClip);
    },

    setInPoint: (time) => {
      const currentTime = time ?? get().timeline.currentTime;
      set(state => ({
        timeline: { ...state.timeline, inPoint: currentTime }
      }));
    },

    setOutPoint: (time) => {
      const currentTime = time ?? get().timeline.currentTime;
      set(state => ({
        timeline: { ...state.timeline, outPoint: currentTime }
      }));
    }
  }))
);

// Auto-save functionality
let autoSaveTimer: NodeJS.Timeout;

useEditorStore.subscribe(
  (state) => state.hasUnsavedChanges,
  (hasUnsavedChanges) => {
    if (hasUnsavedChanges) {
      clearTimeout(autoSaveTimer);
      autoSaveTimer = setTimeout(() => {
        const project = useEditorStore.getState().project;
        if (project) {
          localStorage.setItem('jrenn-autosave', JSON.stringify(project));
          console.log('Project auto-saved');
        }
      }, 3000);
    }
  }
);