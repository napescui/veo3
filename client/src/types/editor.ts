// Move file to correct location
export interface MediaFile {
  id: string;
  type: 'video' | 'audio' | 'image';
  name: string;
  src: string;
  proxy?: string;
  duration?: number;
  width?: number;
  height?: number;
  fps?: number;
  thumbnails?: string[];
  waveform?: number[];
  size: number;
  createdAt: Date;
}

export interface Clip {
  id: string;
  mediaId: string;
  trackId: string;
  startTime: number;
  endTime: number;
  sourceStartTime: number;
  sourceEndTime: number;
  speed: number;
  opacity: number;
  volume: number;
  muted: boolean;
  locked: boolean;
  transform: {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
    anchorX: number;
    anchorY: number;
  };
  effects: Effect[];
  keyframes: Keyframe[];
}

export interface Track {
  id: string;
  type: 'video' | 'audio';
  name: string;
  locked: boolean;
  muted: boolean;
  solo: boolean;
  height: number;
  clips: Clip[];
}

export interface Effect {
  id: string;
  type: string;
  name: string;
  enabled: boolean;
  parameters: Record<string, any>;
}

export interface Keyframe {
  id: string;
  property: string;
  time: number;
  value: any;
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export interface Transition {
  id: string;
  type: 'crossfade' | 'dip-to-black' | 'slide' | 'wipe';
  duration: number;
  startClipId: string;
  endClipId: string;
  parameters: Record<string, any>;
}

export interface Marker {
  id: string;
  time: number;
  name: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  version: number;
  fps: number;
  width: number;
  height: number;
  duration: number;
  tracks: Track[];
  media: MediaFile[];
  effects: Effect[];
  transitions: Transition[];
  markers: Marker[];
  settings: {
    previewQuality: 'full' | 'half' | 'quarter';
    snapEnabled: boolean;
    rippleDelete: boolean;
    magneticTimeline: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ExportPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  fps: number;
  format: string;
  codec: string;
  bitrate: string;
  audioBitrate: string;
}

export interface RenderJob {
  id: string;
  projectId: string;
  preset: ExportPreset;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  downloadUrl?: string;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface TimelineState {
  currentTime: number;
  zoom: number;
  scrollX: number;
  selectedClips: string[];
  selectedTracks: string[];
  inPoint?: number;
  outPoint?: number;
  isPlaying: boolean;
  isLooping: boolean;
}

export interface ViewerState {
  safeMargins: boolean;
  rulers: boolean;
  guides: boolean;
  backgroundColor: string;
}