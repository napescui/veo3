import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/stores/editorStore';
import { usePlaybackStore } from '../../state/playback';
import { Clip, Track } from '@/types/editor';
import { formatTimecode } from '@/utils/timecode';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    clipId?: string;
    startX: number;
    startTime: number;
  }>({ isDragging: false, startX: 0, startTime: 0 });

  const {
    project,
    selectedClips,
    setZoom,
    selectClip,
    updateClip,
    splitClip,
    clearSelection
  } = useEditorStore();

  const {
    currentTime,
    isPlaying,
    seek,
    play,
    pause
  } = usePlaybackStore();

  const PIXELS_PER_SECOND = 50 * 1; // Default zoom, can be made dynamic later
  const TRACK_HEIGHT = 80;
  const RULER_HEIGHT = 40;

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = x / PIXELS_PER_SECOND;
    
    seek(Math.max(0, time));
  };

  const handleClipMouseDown = (e: React.MouseEvent, clip: Clip) => {
    e.stopPropagation();
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setDragState({
      isDragging: true,
      clipId: clip.id,
      startX: e.clientX - rect.left,
      startTime: clip.startTime
    });
    
    selectClip(clip.id, e.metaKey || e.ctrlKey);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.isDragging || !dragState.clipId) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const deltaX = e.clientX - rect.left - dragState.startX;
    const deltaTime = deltaX / PIXELS_PER_SECOND;
    const newStartTime = Math.max(0, dragState.startTime + deltaTime);
    
    const clip = project?.tracks
      .flatMap(t => t.clips)
      .find(c => c.id === dragState.clipId);
    
    if (clip) {
      const duration = clip.endTime - clip.startTime;
      updateClip(clip.id, {
        startTime: newStartTime,
        endTime: newStartTime + duration
      });
    }
  };

  const handleMouseUp = () => {
    setDragState({ isDragging: false, startX: 0, startTime: 0 });
  };

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState.isDragging]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!project) return;
    
    switch (e.key) {
      case 's':
      case 'S':
        if (selectedClips.length > 0) {
          selectedClips.forEach(clipId => {
            splitClip(clipId, currentTime);
          });
        }
        break;
      case 'Delete':
      case 'Backspace':
        // Delete selected clips
        break;
      case ' ':
        e.preventDefault();
        if (isPlaying) {
          pause();
        } else {
          play();
        }
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedClips, currentTime, isPlaying, play, pause]);

  if (!project) return null;

  const timelineDuration = Math.max(project.duration, 60); // Minimum 60 seconds
  const timelineWidth = timelineDuration * PIXELS_PER_SECOND;

  return (
    <div className="bg-slate-900 border-t border-slate-700 flex-1 flex flex-col overflow-hidden">
      {/* Timeline Ruler */}
      <div className="bg-slate-800 border-b border-slate-700" style={{ height: RULER_HEIGHT }}>
        <div 
          className="relative h-full"
          style={{ width: timelineWidth, marginLeft: 0 }}
        >
          {/* Time markers */}
          {Array.from({ length: Math.ceil(timelineDuration) + 1 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full border-l border-slate-600 flex items-end pb-1"
              style={{ left: i * PIXELS_PER_SECOND }}
            >
              <span className="text-xs text-slate-400 ml-1">
                {formatTimecode(i, project.fps)}
              </span>
            </div>
          ))}
          
          {/* Playhead */}
          <div
            className="absolute top-0 w-px bg-red-500 z-20 pointer-events-none"
            style={{ 
              left: currentTime * PIXELS_PER_SECOND,
              height: '100vh'
            }}
          >
            <div className="w-3 h-3 bg-red-500 -ml-1.5 -mt-1" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto"
        onClick={handleTimelineClick}
      >
        <div 
          className="relative"
          style={{ width: timelineWidth, height: project.tracks.length * TRACK_HEIGHT }}
        >
          {/* Tracks */}
          {project.tracks.map((track, trackIndex) => (
            <div
              key={track.id}
              className="absolute w-full border-b border-slate-700"
              style={{ 
                top: trackIndex * TRACK_HEIGHT,
                height: TRACK_HEIGHT
              }}
            >
              {/* Track Header */}
              <div className="absolute left-0 w-40 h-full bg-slate-800 border-r border-slate-700 flex items-center px-3 z-10">
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{track.name}</div>
                  <div className="text-xs text-slate-400 capitalize">{track.type}</div>
                </div>
                <div className="flex gap-1">
                  <button 
                    className="w-6 h-6 rounded text-xs bg-slate-600 hover:bg-slate-500"
                    onClick={() => {}} // Track controls will be implemented later
                  >
                    M
                  </button>
                  <button 
                    className="w-6 h-6 rounded text-xs bg-slate-600 hover:bg-slate-500"
                    onClick={() => {}} // Track controls will be implemented later
                  >
                    S
                  </button>
                </div>
              </div>

              {/* Clips */}
              <div className="ml-40 h-full relative">
                {track.clips.map(clip => {
                  const clipWidth = (clip.endTime - clip.startTime) * PIXELS_PER_SECOND;
                  const clipLeft = clip.startTime * PIXELS_PER_SECOND;
                  const isSelected = selectedClips.includes(clip.id);
                  
                  return (
                    <motion.div
                      key={clip.id}
                      className={`absolute top-2 bottom-2 rounded border-2 cursor-pointer overflow-hidden ${
                        isSelected 
                          ? 'border-blue-400 bg-blue-600/80' 
                          : 'border-slate-500 bg-slate-600/80'
                      } ${track.type === 'video' ? 'bg-gradient-to-r from-purple-600/80 to-blue-600/80' : 'bg-gradient-to-r from-green-600/80 to-emerald-600/80'}`}
                      style={{
                        left: clipLeft,
                        width: Math.max(clipWidth, 20)
                      }}
                      onMouseDown={(e) => handleClipMouseDown(e, clip)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.1 }}
                    >
                      {/* Clip Content */}
                      <div className="h-full flex items-center px-2">
                        <div className="text-xs text-white truncate">
                          {project.media.find(m => m.id === clip.mediaId)?.name || 'Unknown'}
                        </div>
                      </div>
                      
                      {/* Resize handles */}
                      <div className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize bg-white/20 opacity-0 hover:opacity-100" />
                      <div className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-white/20 opacity-0 hover:opacity-100" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="bg-slate-800 border-t border-slate-700 p-2 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-300">Zoom:</label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={1}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-20"
          />
          <span className="text-xs text-slate-400">1.0x</span>
        </div>
        
        <button
          onClick={clearSelection}
          className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-sm text-white"
        >
          Clear Selection
        </button>
        
        <div className="flex-1" />
        
        <div className="text-sm text-slate-300">
          {formatTimecode(currentTime, project.fps)} / {formatTimecode(project.duration, project.fps)}
        </div>
      </div>
    </div>
  );
}