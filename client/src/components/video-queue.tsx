import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Eye, Clock, CheckCircle, XCircle, Download, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VideoResult from "./video-result";
import type { Video } from "@shared/schema";

interface VideoQueueProps {
  videos: Video[];
}

export default function VideoQueue({ videos }: VideoQueueProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { toast } = useToast();

  const handleDownload = (video: Video) => {
    if (!video.videoUrl) return;

    try {
      window.open(video.videoUrl, '_blank');
      toast({
        title: "Video dibuka",
        description: "Video dibuka di tab baru. Klik kanan pada video untuk menyimpan.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Gagal membuka video",
        description: "Silakan coba lagi atau copy link video.",
        variant: "destructive",
      });
    }
  };

  const handleShare = (video: Video) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500";
      case "success":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTime = (timestamp: string | Date | null) => {
    if (!timestamp) return "";
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const processingCount = videos.filter(v => v.status === "processing").length;
  const successCount = videos.filter(v => v.status === "success").length;
  const failedCount = videos.filter(v => v.status === "failed").length;

  return (
    <div className="space-y-4">
      {/* Queue Stats */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            Video Queue ({videos.length}/10)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-slate-300">Processing: {processingCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-300">Complete: {successCount}</span>
            </div>
            {failedCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-slate-300">Failed: {failedCount}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Video List */}
      {videos.length > 0 && (
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">Recent Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(video.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">
                          {video.originalPrompt || video.prompt}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatTime(video.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge
                        variant="secondary"
                        className={`${getStatusColor(video.status)} text-white text-xs mr-1`}
                      >
                        {video.status}
                      </Badge>
                      {video.status === "success" && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedVideo(video)}
                            className="h-7 w-7 p-0 text-slate-400 hover:text-white"
                            data-testid={`button-view-video-${video.id}`}
                            title="View video"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownload(video)}
                            className="h-7 w-7 p-0 text-slate-400 hover:text-white"
                            data-testid={`button-download-video-${video.id}`}
                            title="Download video"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleShare(video)}
                            className="h-7 w-7 p-0 text-slate-400 hover:text-white"
                            data-testid={`button-share-video-${video.id}`}
                            title="Share video"
                          >
                            <Share className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Selected Video Modal */}
      {selectedVideo && selectedVideo.status === "success" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Generated Video</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedVideo(null)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </Button>
            </div>
            <VideoResult video={selectedVideo} />
          </div>
        </div>
      )}
    </div>
  );
}