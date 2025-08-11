import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/stores/editorStore';
import { MediaFile } from '@/types/editor';
import { 
  Upload, 
  Video, 
  Music, 
  Image as ImageIcon, 
  Trash2, 
  Play,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function MediaBin() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const { project, addMedia, removeMedia, addClip } = useEditorStore();

  const handleFileUpload = async (files: FileList) => {
    setUploading(true);
    
    for (const file of Array.from(files)) {
      try {
        const mediaFile = await processFile(file);
        addMedia(mediaFile);
        
        toast({
          title: "Media Added",
          description: `${file.name} has been added to your project`
        });
      } catch (error) {
        toast({
          title: "Upload Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive"
        });
      }
    }
    
    setUploading(false);
  };

  const processFile = async (file: File): Promise<MediaFile> => {
    return new Promise((resolve, reject) => {
      const mediaFile: MediaFile = {
        id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: file.type.startsWith('video/') ? 'video' : 
              file.type.startsWith('audio/') ? 'audio' : 'image',
        name: file.name,
        src: URL.createObjectURL(file),
        size: file.size,
        createdAt: new Date()
      };

      if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.onloadedmetadata = () => {
          mediaFile.duration = video.duration;
          mediaFile.width = video.videoWidth;
          mediaFile.height = video.videoHeight;
          mediaFile.fps = 30; // Default, would need more sophisticated detection
          resolve(mediaFile);
        };
        video.onerror = reject;
        video.src = mediaFile.src;
      } else if (file.type.startsWith('audio/')) {
        const audio = document.createElement('audio');
        audio.onloadedmetadata = () => {
          mediaFile.duration = audio.duration;
          resolve(mediaFile);
        };
        audio.onerror = reject;
        audio.src = mediaFile.src;
      } else if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.onload = () => {
          mediaFile.width = img.naturalWidth;
          mediaFile.height = img.naturalHeight;
          mediaFile.duration = 5; // Default duration for images
          resolve(mediaFile);
        };
        img.onerror = reject;
        img.src = mediaFile.src;
      } else {
        reject(new Error('Unsupported file type'));
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const addToTimeline = (media: MediaFile) => {
    if (!project) return;
    
    // Find appropriate track
    const targetTrack = project.tracks.find(t => 
      (media.type === 'video' && t.type === 'video') ||
      (media.type === 'audio' && t.type === 'audio')
    );
    
    if (!targetTrack) return;
    
    // Calculate start time (end of timeline or after last clip)
    const lastClipEnd = Math.max(
      0,
      ...targetTrack.clips.map(c => c.endTime)
    );
    
    const newClip = {
      id: `clip-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      mediaId: media.id,
      trackId: targetTrack.id,
      startTime: lastClipEnd,
      endTime: lastClipEnd + (media.duration || 5),
      sourceStartTime: 0,
      sourceEndTime: media.duration || 5,
      speed: 1,
      opacity: 1,
      volume: 1,
      muted: false,
      locked: false,
      transform: {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        anchorX: 0.5,
        anchorY: 0.5
      },
      effects: [],
      keyframes: []
    };
    
    addClip(newClip);
    
    toast({
      title: "Added to Timeline",
      description: `${media.name} has been added to ${targetTrack.name}`
    });
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Music;
      case 'image': return ImageIcon;
      default: return Upload;
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Media Bin
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver 
              ? 'border-blue-400 bg-blue-400/10' 
              : 'border-slate-600 hover:border-slate-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-300 mb-2">
            Drag & drop media files here or click to browse
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {uploading ? 'Uploading...' : 'Choose Files'}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="video/*,audio/*,image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
        </div>

        {/* Media List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {project?.media.map(media => {
            const IconComponent = getMediaIcon(media.type);
            
            return (
              <motion.div
                key={media.id}
                className="flex items-center gap-3 p-3 bg-slate-700/50 rounded border border-slate-600 hover:border-slate-500 group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.1 }}
              >
                <div className={`w-10 h-10 rounded flex items-center justify-center ${
                  media.type === 'video' ? 'bg-purple-600/20 text-purple-400' :
                  media.type === 'audio' ? 'bg-green-600/20 text-green-400' :
                  'bg-blue-600/20 text-blue-400'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">
                    {media.name}
                  </div>
                  <div className="text-xs text-slate-400 flex gap-2">
                    {media.duration && (
                      <span>{formatDuration(media.duration)}</span>
                    )}
                    {media.width && media.height && (
                      <span>{media.width}×{media.height}</span>
                    )}
                    <span>{formatFileSize(media.size)}</span>
                  </div>
                </div>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addToTimeline(media)}
                    className="w-8 h-8 p-0 text-green-400 hover:text-green-300"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeMedia(media.id)}
                    className="w-8 h-8 p-0 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
          
          {(!project?.media || project.media.length === 0) && (
            <div className="text-center py-8 text-slate-400">
              <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No media files yet</p>
              <p className="text-xs">Upload some files to get started</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}