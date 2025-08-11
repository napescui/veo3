import { Project } from '@/types/editor';
import { IMAGE_DEFAULT_DURATION } from '../config/media';

// Create test image data for demonstrating image playback functionality
export function createTestProject(): Project {
  const testMedia = [
    {
      id: 'img-1',
      name: 'Sample Image 1.jpg',
      type: 'image' as const,
      src: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#4338ca"/>
          <circle cx="200" cy="150" r="80" fill="#fbbf24"/>
          <text x="200" y="250" text-anchor="middle" fill="white" font-family="Arial" font-size="24">Image 1</text>
        </svg>
      `),
      size: 12000,
      duration: IMAGE_DEFAULT_DURATION,
      width: 400,
      height: 300,
      createdAt: new Date()
    },
    {
      id: 'img-2',
      name: 'Sample Image 2.jpg',
      type: 'image' as const,
      src: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#059669"/>
          <rect x="100" y="75" width="200" height="150" fill="#f59e0b"/>
          <text x="200" y="250" text-anchor="middle" fill="white" font-family="Arial" font-size="24">Image 2</text>
        </svg>
      `),
      size: 15000,
      duration: IMAGE_DEFAULT_DURATION,
      width: 400,
      height: 300,
      createdAt: new Date()
    },
    {
      id: 'img-3',
      name: 'Sample Image 3.jpg',
      type: 'image' as const,
      src: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#dc2626"/>
          <polygon points="200,50 250,150 150,150" fill="#6366f1"/>
          <text x="200" y="250" text-anchor="middle" fill="white" font-family="Arial" font-size="24">Image 3</text>
        </svg>
      `),
      size: 18000,
      duration: IMAGE_DEFAULT_DURATION,
      width: 400,
      height: 300,
      createdAt: new Date()
    }
  ];

  const testClips = [
    {
      id: 'clip-1',
      mediaId: 'img-1',
      trackId: 'track-1',
      startTime: 0,
      endTime: IMAGE_DEFAULT_DURATION,
      sourceStartTime: 0,
      sourceEndTime: IMAGE_DEFAULT_DURATION,
      speed: 1,
      opacity: 1,
      transform: {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        anchorX: 0.5,
        anchorY: 0.5
      }
    },
    {
      id: 'clip-2',
      mediaId: 'img-2',
      trackId: 'track-1',
      startTime: IMAGE_DEFAULT_DURATION + 1,
      endTime: (IMAGE_DEFAULT_DURATION + 1) + IMAGE_DEFAULT_DURATION,
      sourceStartTime: 0,
      sourceEndTime: IMAGE_DEFAULT_DURATION,
      speed: 1,
      opacity: 0.8,
      transform: {
        x: 0,
        y: 0,
        scaleX: 1.2,
        scaleY: 1.2,
        rotation: 0,
        anchorX: 0.5,
        anchorY: 0.5
      }
    },
    {
      id: 'clip-3',
      mediaId: 'img-3',
      trackId: 'track-1',
      startTime: (IMAGE_DEFAULT_DURATION + 1) * 2,
      endTime: (IMAGE_DEFAULT_DURATION + 1) * 2 + IMAGE_DEFAULT_DURATION,
      sourceStartTime: 0,
      sourceEndTime: IMAGE_DEFAULT_DURATION,
      speed: 1,
      opacity: 1,
      transform: {
        x: 0,
        y: 0,
        scaleX: 0.8,
        scaleY: 0.8,
        rotation: 15,
        anchorX: 0.5,
        anchorY: 0.5
      }
    }
  ];

  const testTracks = [
    {
      id: 'track-1',
      name: 'Video Track 1',
      type: 'video' as const,
      clips: testClips,
      muted: false,
      solo: false,
      locked: false,
      height: 80
    }
  ];

  return {
    id: 'test-project',
    name: 'Image Playback Test Project',
    version: 1,
    width: 1920,
    height: 1080,
    fps: 30,
    duration: (IMAGE_DEFAULT_DURATION + 1) * 3,
    media: testMedia,
    tracks: testTracks,
    effects: [],
    transitions: [],
    markers: [],
    settings: {
      previewQuality: 'full' as const,
      snapEnabled: true,
      rippleDelete: false,
      magneticTimeline: true
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };
}