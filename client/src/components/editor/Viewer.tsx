import { useRef, useEffect } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { MediaFile } from '@/types/editor';

export default function Viewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { project, timeline } = useEditorStore();

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
  }, [project, timeline.currentTime]);

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
    // For now, just render a placeholder
    ctx.save();

    // Apply transform
    const centerX = project!.width / 2;
    const centerY = project!.height / 2;
    
    ctx.translate(centerX, centerY);
    ctx.rotate(clip.transform.rotation * Math.PI / 180);
    ctx.scale(clip.transform.scaleX, clip.transform.scaleY);
    ctx.globalAlpha = clip.opacity;

    // Render based on media type
    if (media.type === 'video') {
      // Placeholder for video frame
      ctx.fillStyle = '#4a5568';
      ctx.fillRect(-media.width! / 2, -media.height! / 2, media.width!, media.height!);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Video Frame', 0, 0);
    } else if (media.type === 'image') {
      // Placeholder for image
      ctx.fillStyle = '#2d3748';
      ctx.fillRect(-100, -100, 200, 200);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Image', 0, 0);
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