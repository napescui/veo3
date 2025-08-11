import { useRef, useEffect, useState } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { MediaFile } from '@/types/editor';

export default function Viewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { project, timeline } = useEditorStore();
  const [loadedMedia, setLoadedMedia] = useState<Map<string, HTMLImageElement | HTMLVideoElement>>(new Map());

  // Load media elements when project media changes
  useEffect(() => {
    if (!project) return;

    const loadMedia = async () => {
      const mediaMap = new Map<string, HTMLImageElement | HTMLVideoElement>();
      
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
            await new Promise((resolve, reject) => {
              video.onloadedmetadata = resolve;
              video.onerror = reject;
              video.src = media.src;
            });
            mediaMap.set(media.id, video);
          }
        } catch (error) {
          console.warn(`Failed to load media ${media.name}:`, error);
        }
      }
      
      setLoadedMedia(mediaMap);
    };

    loadMedia();
  }, [project?.media]);

  useEffect(() => {
    if (!canvasRef.current || !project) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render current frame
    renderFrame(ctx, timeline.currentTime);
  }, [project, timeline.currentTime, loadedMedia]);

  const renderFrame = (ctx: CanvasRenderingContext2D, currentTime: number) => {
    if (!project) return;

    // Find active clips at current time
    const activeClips = project.tracks.flatMap(track => 
      track.clips.filter(clip => 
        currentTime >= clip.startTime && currentTime < clip.endTime
      )
    );

    // Sort by track order (video tracks first, then by layer)
    activeClips.sort((a, b) => {
      const trackA = project.tracks.find(t => t.id === a.trackId);
      const trackB = project.tracks.find(t => t.id === b.trackId);
      
      if (trackA?.type !== trackB?.type) {
        return trackA?.type === 'video' ? -1 : 1;
      }
      
      return project.tracks.indexOf(trackA!) - project.tracks.indexOf(trackB!);
    });

    // Render each active clip
    activeClips.forEach(clip => {
      const media = project.media.find(m => m.id === clip.mediaId);
      if (!media) return;

      // Calculate clip local time
      const clipTime = currentTime - clip.startTime;
      const sourceTime = clip.sourceStartTime + (clipTime * clip.speed);

      renderClip(ctx, clip, media, sourceTime);
    });
  };

  const renderClip = (ctx: CanvasRenderingContext2D, clip: any, media: MediaFile, sourceTime: number) => {
    const mediaElement = loadedMedia.get(media.id);
    if (!mediaElement) {
      // Show loading placeholder
      ctx.save();
      const centerX = project!.width / 2;
      const centerY = project!.height / 2;
      
      ctx.translate(centerX, centerY);
      ctx.fillStyle = '#4a5568';
      ctx.fillRect(-100, -50, 200, 100);
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Loading...', 0, 0);
      ctx.restore();
      return;
    }

    ctx.save();

    // Apply transform
    const centerX = project!.width / 2;
    const centerY = project!.height / 2;
    
    ctx.translate(centerX, centerY);
    ctx.rotate(clip.transform.rotation * Math.PI / 180);
    ctx.scale(clip.transform.scaleX, clip.transform.scaleY);
    ctx.globalAlpha = clip.opacity;

    // Calculate dimensions
    const mediaWidth = media.width || 100;
    const mediaHeight = media.height || 100;
    const renderWidth = mediaWidth;
    const renderHeight = mediaHeight;

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
        // Draw image
        ctx.drawImage(
          mediaElement,
          -renderWidth / 2,
          -renderHeight / 2,
          renderWidth,
          renderHeight
        );
      }
    } catch (error) {
      // Fallback to placeholder if rendering fails
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-renderWidth / 2, -renderHeight / 2, renderWidth, renderHeight);
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Error', 0, 0);
    }

    ctx.restore();
  };

  if (!project) return null;

  return (
    <div className="flex-1 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={project.width}
          height={project.height}
          className="max-w-full max-h-full bg-black rounded-lg border border-white/20"
          style={{ aspectRatio: `${project.width}/${project.height}`, maxHeight: '60vh' }}
        />
        
        {/* Preview Overlay */}
        <div className="absolute inset-0 border-2 border-purple-500/30 rounded-lg pointer-events-none" />
        
        {/* Safe Margins (optional) */}
        <div className="absolute inset-4 border border-yellow-500/30 rounded pointer-events-none opacity-50" />
      </div>
    </div>
  );
}