import { useRef, useEffect, useState } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { usePlaybackStore } from '../../state/playback';
import { MediaFile, Clip } from '@/types/editor';
import { CANVAS_SETTINGS } from '../../config/media';

interface CompositorProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Compositor({ 
  width = CANVAS_SETTINGS.defaultWidth, 
  height = CANVAS_SETTINGS.defaultHeight,
  className = ""
}: CompositorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { project } = useEditorStore();
  const { currentTime } = usePlaybackStore();
  
  const [loadedMedia, setLoadedMedia] = useState<Map<string, HTMLImageElement | HTMLVideoElement>>(new Map());
  const [audioElements, setAudioElements] = useState<Map<string, HTMLAudioElement>>(new Map());

  // Load media elements when project media changes
  useEffect(() => {
    if (!project) return;

    const loadMedia = async () => {
      const mediaMap = new Map<string, HTMLImageElement | HTMLVideoElement>();
      const audioMap = new Map<string, HTMLAudioElement>();
      
      for (const media of project.media) {
        try {
          if (media.type === 'image') {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = media.src;
            });
            mediaMap.set(media.id, img);
          } else if (media.type === 'video') {
            const video = document.createElement('video');
            video.crossOrigin = 'anonymous';
            video.muted = true;
            video.preload = 'metadata';
            video.playsInline = true;
            await new Promise((resolve, reject) => {
              video.onloadedmetadata = resolve;
              video.onerror = reject;
              video.src = media.src;
            });
            mediaMap.set(media.id, video);
          } else if (media.type === 'audio') {
            const audio = document.createElement('audio');
            audio.crossOrigin = 'anonymous';
            audio.preload = 'metadata';
            await new Promise((resolve, reject) => {
              audio.onloadedmetadata = resolve;
              audio.onerror = reject;
              audio.src = media.src;
            });
            audioMap.set(media.id, audio);
          }
        } catch (error) {
          console.warn(`Failed to load media ${media.name}:`, error);
        }
      }
      
      setLoadedMedia(mediaMap);
      setAudioElements(audioMap);
    };

    loadMedia();
  }, [project?.media]);

  // Render frame based on current time
  useEffect(() => {
    if (!canvasRef.current || !project) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderFrame(ctx, currentTime);
  }, [project, currentTime, loadedMedia]);

  // Sync audio playback with timeline
  useEffect(() => {
    if (!project) return;

    const { isPlaying } = usePlaybackStore.getState();
    
    // Find active audio clips at current time
    const activeAudioClips = project.tracks
      .filter(track => track.type === 'audio')
      .flatMap(track => track.clips)
      .filter(clip => currentTime >= clip.startTime && currentTime < clip.endTime);

    activeAudioClips.forEach(clip => {
      const audioElement = audioElements.get(clip.mediaId);
      if (!audioElement) return;

      const localTime = currentTime - clip.startTime + clip.sourceStartTime;
      
      // Sync audio time with timeline
      if (Math.abs(audioElement.currentTime - localTime) > 0.1) {
        audioElement.currentTime = localTime;
      }

      // Control audio playback
      if (isPlaying && audioElement.paused) {
        audioElement.play().catch(err => console.warn('Audio play failed:', err));
      } else if (!isPlaying && !audioElement.paused) {
        audioElement.pause();
      }
    });

    // Pause audio not in timeline
    audioElements.forEach((audioElement, mediaId) => {
      const isActive = activeAudioClips.some(clip => clip.mediaId === mediaId);
      if (!isActive && !audioElement.paused) {
        audioElement.pause();
      }
    });
  }, [currentTime, audioElements, project]);

  const renderFrame = (ctx: CanvasRenderingContext2D, time: number) => {
    if (!project) return;

    // Clear canvas
    ctx.fillStyle = CANVAS_SETTINGS.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Find active clips at current time
    const activeClips = project.tracks
      .filter(track => track.type === 'video')
      .flatMap(track => track.clips.filter(clip => 
        time >= clip.startTime && time < clip.endTime
      ))
      .sort((a, b) => {
        // Sort by track order (later tracks on top)
        const trackA = project.tracks.find(t => t.clips.includes(a));
        const trackB = project.tracks.find(t => t.clips.includes(b));
        return project.tracks.indexOf(trackA!) - project.tracks.indexOf(trackB!);
      });

    // Render each active clip
    activeClips.forEach(clip => {
      const media = project.media.find(m => m.id === clip.mediaId);
      if (!media) return;

      const clipTime = time - clip.startTime;
      const sourceTime = clip.sourceStartTime + (clipTime * clip.speed);

      renderClip(ctx, clip, media, sourceTime);
    });
  };

  const renderClip = (ctx: CanvasRenderingContext2D, clip: Clip, media: MediaFile, sourceTime: number) => {
    const mediaElement = loadedMedia.get(media.id);
    if (!mediaElement) {
      // Show loading placeholder
      renderPlaceholder(ctx, 'Loading...', '#4a5568');
      return;
    }

    ctx.save();

    // Apply transform
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    
    ctx.translate(centerX, centerY);
    ctx.rotate(clip.transform.rotation * Math.PI / 180);
    ctx.scale(clip.transform.scaleX, clip.transform.scaleY);
    ctx.globalAlpha = clip.opacity;

    // Calculate dimensions
    const mediaWidth = media.width || 100;
    const mediaHeight = media.height || 100;
    
    // Scale to fit canvas while maintaining aspect ratio
    const scaleX = ctx.canvas.width / mediaWidth;
    const scaleY = ctx.canvas.height / mediaHeight;
    const scale = Math.min(scaleX, scaleY) * 0.8; // 80% to leave some margin
    
    const renderWidth = mediaWidth * scale;
    const renderHeight = mediaHeight * scale;

    try {
      if (media.type === 'video' && mediaElement instanceof HTMLVideoElement) {
        // Set video time to match timeline
        const videoTime = Math.max(0, Math.min(sourceTime, media.duration || 0));
        if (Math.abs(mediaElement.currentTime - videoTime) > 0.1) {
          mediaElement.currentTime = videoTime;
        }
        
        // Draw video frame
        ctx.drawImage(
          mediaElement,
          -renderWidth / 2,
          -renderHeight / 2,
          renderWidth,
          renderHeight
        );
      } else if (media.type === 'image' && mediaElement instanceof HTMLImageElement) {
        // Draw image (images don't need time synchronization)
        ctx.drawImage(
          mediaElement,
          -renderWidth / 2,
          -renderHeight / 2,
          renderWidth,
          renderHeight
        );
      }
    } catch (error) {
      // Fallback to error placeholder if rendering fails
      renderPlaceholder(ctx, 'Error', '#ef4444');
    }

    ctx.restore();
  };

  const renderPlaceholder = (ctx: CanvasRenderingContext2D, text: string, color: string) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(-100, -50, 200, 100);
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, 0, 0);
    ctx.restore();
  };

  if (!project) return null;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="max-w-full max-h-full bg-black rounded-lg border border-white/20"
        style={{ aspectRatio: `${width}/${height}` }}
      />
    </div>
  );
}