// Media configuration constants
export const IMAGE_DEFAULT_DURATION = 5; // seconds
export const VIDEO_FRAME_RATE = 30; // fps
export const AUDIO_DEFAULT_VOLUME = 1.0;

// Supported media types
export const SUPPORTED_IMAGE_FORMATS = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml'
];

export const SUPPORTED_VIDEO_FORMATS = [
  'video/mp4',
  'video/webm',
  'video/mov',
  'video/avi',
  'video/mkv'
];

export const SUPPORTED_AUDIO_FORMATS = [
  'audio/mp3',
  'audio/wav',
  'audio/aac',
  'audio/ogg',
  'audio/flac'
];

// Canvas rendering settings
export const CANVAS_SETTINGS = {
  defaultWidth: 1920,
  defaultHeight: 1080,
  backgroundColor: '#000000'
};

// Fallback settings
export const IMAGE_TO_VIDEO_FALLBACK = import.meta.env.VITE_IMAGE_TO_VIDEO_FALLBACK === 'true';