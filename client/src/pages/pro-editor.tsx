import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Upload,
  Video,
  Download,
  Layers,
  Plus,
  X,
  Play,
  Merge
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface VideoFile {
  id: string;
  name: string;
  file: File;
  url: string;
  duration?: number;
}

export default function ProEditor() {
  const { toast } = useToast();
  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);
  
  const [video1, setVideo1] = useState<VideoFile | null>(null);
  const [video2, setVideo2] = useState<VideoFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [mergedVideoUrl, setMergedVideoUrl] = useState<string | null>(null);

  const handleFileSelect = (fileNumber: 1 | 2, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast({
        title: "File Tidak Valid",
        description: "Silakan pilih file video",
        variant: "destructive"
      });
      return;
    }

    const videoFile: VideoFile = {
      id: `video-${fileNumber}-${Date.now()}`,
      name: file.name,
      file: file,
      url: URL.createObjectURL(file)
    };

    // Get video duration
    const video = document.createElement('video');
    video.onloadedmetadata = () => {
      videoFile.duration = video.duration;
      if (fileNumber === 1) {
        setVideo1(videoFile);
      } else {
        setVideo2(videoFile);
      }
    };
    video.src = videoFile.url;

    toast({
      title: "Video Ditambahkan",
      description: `${file.name} berhasil dimuat`,
    });
  };

  const removeVideo = (videoNumber: 1 | 2) => {
    if (videoNumber === 1 && video1) {
      URL.revokeObjectURL(video1.url);
      setVideo1(null);
    } else if (videoNumber === 2 && video2) {
      URL.revokeObjectURL(video2.url);
      setVideo2(null);
    }
  };

  const handleMergeVideos = async () => {
    if (!video1 || !video2) {
      toast({
        title: "Video Belum Lengkap",
        description: "Silakan pilih kedua video terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    setIsMerging(true);
    setMergeProgress(0);

    try {
      const formData = new FormData();
      formData.append('video1', video1.file);
      formData.append('video2', video2.file);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setMergeProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      const response = await fetch('/api/merge-videos', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error('Failed to merge videos');
      }

      const blob = await response.blob();
      const mergedUrl = URL.createObjectURL(blob);
      
      setMergedVideoUrl(mergedUrl);
      setMergeProgress(100);

      toast({
        title: "Merge Berhasil!",
        description: "Video Anda telah berhasil digabungkan",
      });

    } catch (error) {
      console.error('Merge failed:', error);
      toast({
        title: "Merge Gagal",
        description: "Terjadi kesalahan saat menggabungkan video. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsMerging(false);
    }
  };

  const downloadMergedVideo = () => {
    if (!mergedVideoUrl) return;

    const link = document.createElement('a');
    link.href = mergedVideoUrl;
    link.download = `merged-video-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Dimulai",
      description: "Video hasil merge sedang diunduh",
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/10 bg-black/20 backdrop-blur-xl"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.a 
              href="/"
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Layers className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  JrennGenerator Pro
                </h1>
                <p className="text-xs text-slate-400">Video Merger Tool</p>
              </div>
            </motion.a>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Kembali ke Home
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Video Merger Tool
            </h2>
            <p className="text-slate-400">
              Gabungkan dua video menjadi satu dengan mudah
            </p>
          </div>

          {/* Video Upload Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Video 1 */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Pertama
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!video1 ? (
                  <div 
                    onClick={() => fileInput1Ref.current?.click()}
                    className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
                  >
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-white mb-2">Klik untuk upload video pertama</p>
                    <p className="text-sm text-slate-400">Format: MP4, MOV, AVI, WebM</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <video 
                        src={video1.url}
                        className="w-full rounded-lg"
                        controls
                        style={{ maxHeight: '200px' }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeVideo(1)}
                        className="absolute top-2 right-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-slate-300">
                      <p>Nama: {video1.name}</p>
                      {video1.duration && (
                        <p>Durasi: {formatDuration(video1.duration)}</p>
                      )}
                    </div>
                  </div>
                )}
                <input
                  ref={fileInput1Ref}
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileSelect(1, e)}
                  className="hidden"
                />
              </CardContent>
            </Card>

            {/* Video 2 */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Kedua
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!video2 ? (
                  <div 
                    onClick={() => fileInput2Ref.current?.click()}
                    className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
                  >
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-white mb-2">Klik untuk upload video kedua</p>
                    <p className="text-sm text-slate-400">Format: MP4, MOV, AVI, WebM</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <video 
                        src={video2.url}
                        className="w-full rounded-lg"
                        controls
                        style={{ maxHeight: '200px' }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeVideo(2)}
                        className="absolute top-2 right-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-slate-300">
                      <p>Nama: {video2.name}</p>
                      {video2.duration && (
                        <p>Durasi: {formatDuration(video2.duration)}</p>
                      )}
                    </div>
                  </div>
                )}
                <input
                  ref={fileInput2Ref}
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileSelect(2, e)}
                  className="hidden"
                />
              </CardContent>
            </Card>
          </div>

          {/* Merge Button */}
          <div className="text-center mb-8">
            <Button
              onClick={handleMergeVideos}
              disabled={!video1 || !video2 || isMerging}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4"
            >
              {isMerging ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Menggabungkan Video...
                </>
              ) : (
                <>
                  <Merge className="w-5 h-5 mr-2" />
                  Gabungkan Video
                </>
              )}
            </Button>
          </div>

          {/* Progress */}
          {isMerging && (
            <Card className="bg-white/5 border-white/10 mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-white">
                    <span>Progress Penggabungan</span>
                    <span>{Math.round(mergeProgress)}%</span>
                  </div>
                  <Progress value={mergeProgress} className="w-full" />
                  <p className="text-sm text-slate-400 text-center">
                    Sedang memproses video, mohon tunggu...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result */}
          {mergedVideoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Video Hasil Penggabungan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <video 
                    src={mergedVideoUrl}
                    className="w-full rounded-lg"
                    controls
                    style={{ maxHeight: '400px' }}
                  />
                  <div className="flex justify-center">
                    <Button
                      onClick={downloadMergedVideo}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}