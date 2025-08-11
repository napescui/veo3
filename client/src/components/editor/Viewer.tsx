import { useEffect } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { usePlaybackStore } from '../../state/playback';

import Compositor from '../Viewer/Compositor';

export default function Viewer() {
  const { project } = useEditorStore();
  const { currentTime, setDuration } = usePlaybackStore();

  // Update duration when project changes
  useEffect(() => {
    if (!project) return;

    // Calculate total project duration from all clips
    const totalDuration = project.tracks
      .flatMap(track => track.clips)
      .reduce((max, clip) => Math.max(max, clip.endTime), 0);

    setDuration(totalDuration);
  }, [project, setDuration]);



  if (!project) return null;

  return (
    <div className="flex-1 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative">
        <Compositor 
          width={project.width}
          height={project.height}
          className="max-w-full max-h-full"
        />
        
        {/* Preview Overlay */}
        <div className="absolute inset-0 border-2 border-purple-500/30 rounded-lg pointer-events-none" />
        
        {/* Safe Margins (optional) */}
        <div className="absolute inset-4 border border-yellow-500/30 rounded pointer-events-none opacity-50" />
        
        {/* Playback time indicator */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(1).padStart(4, '0')}
        </div>
      </div>
    </div>
  );
}