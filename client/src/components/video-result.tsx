
import { Button } from "@/components/ui/button";
import { Check, Download, Share, Clock, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Video as VideoType } from "@shared/schema";

interface VideoResultProps {
  video: VideoType;
}

export default function VideoResult({ video }: VideoResultProps) {
  const { toast } = useToast();

  const handleDownload = () => {
    if (!video.id) return;

    try {
      // Use server download endpoint which serves from downloads folder
      const downloadUrl = `/api/videos/${video.id}/download`;
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `video-${video.id}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download dimulai",
        description: "Video sedang didownload dari server.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Gagal download video",
        description: "Silakan coba lagi nanti.",
        variant: "destructive",
      });
    }
  };

  const handlePreview = () => {
    if (!video.videoPath && !video.videoUrl) return;

    try {
      // Preview from downloads folder if available, otherwise from original URL
      const previewUrl = video.videoPath ? video.videoPath : video.videoUrl;
      window.open(previewUrl, '_blank');
      
      toast({
        title: "Preview dibuka",
        description: "Video preview dibuka di tab baru.",
      });
    } catch (error) {
      console.error("Preview error:", error);
      toast({
        title: "Gagal membuka preview",
        description: "Silakan coba lagi nanti.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    if (navigator.share && video.videoUrl) {
      navigator.share({
        title: 'Check out this AI-generated video!',
        text: `Generated from prompt: "${video.prompt}"`,
        url: video.videoUrl,
      });
    } else if (video.videoUrl) {
      navigator.clipboard.writeText(video.videoUrl);
      toast({
        title: "Link copied",
        description: "Video URL copied to clipboard.",
      });
    }
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "Unknown";
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-accent">Video Generated Successfully!</h3>
            <p className="text-sm text-slate-400">Your 8-second AI video is ready</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreview}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 border-blue-500 text-white"
            data-testid="button-preview-video"
          >
            <Video className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 border-green-500 text-white"
            data-testid="button-download-video"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border-slate-600"
            data-testid="button-share-video"
          >
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative bg-black rounded-xl overflow-hidden mb-4">
        <video 
          className="w-full h-auto max-h-96" 
          controls 
          preload="metadata"
          playsInline
          crossOrigin="anonymous"
          src={video.videoUrl || undefined}
          onLoadedMetadata={(e) => {
            const duration = e.currentTarget.duration;
            console.log('Video loaded, duration:', duration);
          }}
          onError={(e) => {
            console.error('Video error:', e);
          }}
          onCanPlay={() => {
            console.log('Video can play');
          }}
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay Info */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
          <Clock className="w-3 h-3 inline mr-1" />
          8s
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-400">
        <div>
          <strong>Prompt:</strong> <span className="text-slate-300">{video.prompt}</span>
        </div>
        <div>
          Generated: <span>{formatTime(video.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
