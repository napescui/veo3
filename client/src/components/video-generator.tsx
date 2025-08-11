import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Play, Loader2, Clock, Film, Sparkles, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StatusDisplay from "./status-display";
import VideoResult from "./video-result";
import ErrorDisplay from "./error-display";
import VideoTotal from "./video-total";
import type { Video } from "@shared/schema";

// Dynamic example prompts using Gemini AI based on user patterns
const getDynamicExamplePrompts = async (videos: Video[], apiRequestFn: any) => {
  try {
    // Get recent user prompts for analysis
    const recentPrompts = videos.slice(0, 5).map(v => v.prompt).join('; ');
    
    if (recentPrompts.length > 0) {
      // Request recommendations from Gemini
      const response = await apiRequestFn("POST", "/api/generate-recommendations", { 
        userPrompts: recentPrompts 
      });
      const data = await response.json();
      
      if (data.recommendations && data.recommendations.length > 0) {
        return data.recommendations;
      }
    }
  } catch (error) {
    console.log("Using default prompts:", error);
  }
  
  // Default prompts if no user history or error
  return [
    "A cat playing piano in a cozy room",
    "Spiderman dancing on a rooftop",  
    "Ocean waves crashing against cliffs",
    "A majestic eagle soaring through mountain peaks at sunset"
  ];
};

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [examplePrompts, setExamplePrompts] = useState([
    "A cat playing piano in a cozy room",
    "Spiderman dancing on a rooftop",  
    "Ocean waves crashing against cliffs",
    "A majestic eagle soaring through mountain peaks at sunset"
  ]);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Update example prompts when videos change
  useEffect(() => {
    const updateExamplePrompts = async () => {
      try {
        const newPrompts = await getDynamicExamplePrompts(videos, apiRequest);
        if (Array.isArray(newPrompts) && newPrompts.length > 0) {
          setExamplePrompts(newPrompts);
        }
      } catch (error) {
        console.log("Error updating prompts:", error);
      }
    };
    
    if (videos.length > 2) { // Only update when user has some history
      updateExamplePrompts();
    }
  }, [videos]);

  // Enhance prompt mutation
  const enhancePromptMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await apiRequest("POST", "/api/enhance-prompt", { prompt });
      const data = await response.json();
      return data.enhanced;
    },
    onSuccess: (enhanced: string) => {
      setPrompt(enhanced);
      toast({
        title: "Prompt ditingkatkan",
        description: "Prompt Anda telah diperbaiki dan diperkaya.",
      });
    },
    onError: (error) => {
      console.error("Enhance error:", error);
      toast({
        title: "Gagal meningkatkan prompt",
        description: "Terjadi masalah dengan AI enhancement. Silakan coba dengan prompt asli Anda atau coba lagi nanti.",
        variant: "destructive",
      });
    },
  });

  // Generate video mutation
  const generateVideo = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await apiRequest("POST", "/api/videos", { 
        prompt, 
        autoTranslate 
      });
      return response.json() as Promise<Video & { wasTranslated?: boolean }>;
    },
    onSuccess: (video) => {
      setVideos(prev => [video, ...prev]); // Keep all videos - unlimited
      if (video.wasTranslated) {
        toast({
          title: "Video dimulai",
          description: "Prompt diterjemahkan ke bahasa Inggris dan video sedang diproses.",
        });
      } else {
        toast({
          title: "Video dimulai",
          description: "Video sedang diproses. Ini mungkin memakan waktu beberapa menit.",
        });
      }
    },
    onError: (error) => {
      console.error("Generation error:", error);
      toast({
        title: "Gagal generate video",
        description: error instanceof Error ? error.message : "Gagal memulai video generation",
        variant: "destructive",
      });
    },
  });

  // Poll video status for processing videos
  useEffect(() => {
    const processingVideos = videos.filter(v => v.status === "processing");
    
    if (processingVideos.length === 0) return;

    const interval = setInterval(async () => {
      for (const video of processingVideos) {
        try {
          const response = await fetch(`/api/videos/${video.id}/status`);
          if (response.ok) {
            const updatedVideo = await response.json() as Video;
            if (updatedVideo.status !== video.status) {
              setVideos(prev => 
                prev.map(v => v.id === video.id ? updatedVideo : v)
              );
            }
          }
        } catch (error) {
          console.error(`Error polling video ${video.id}:`, error);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [videos]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt diperlukan",
        description: "Silakan masukkan prompt untuk generate video.",
        variant: "destructive",
      });
      return;
    }

    if (prompt.length < 10) {
      toast({
        title: "Prompt terlalu pendek",
        description: "Silakan berikan prompt yang lebih detail (minimal 10 karakter).",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate prompts
    const duplicateVideo = videos.find(v => v.prompt.toLowerCase().trim() === prompt.toLowerCase().trim());
    if (duplicateVideo) {
      const confirmed = window.confirm(
        `Anda sudah pernah membuat video dengan prompt yang sama:\n\n"${prompt}"\n\nApakah Anda yakin ingin membuat video baru dengan prompt yang sama?`
      );
      if (!confirmed) {
        return;
      }
    }

    // Allow multiple video generation - users can generate multiple videos simultaneously
    // Only check if current request is still being sent to prevent duplicate requests
    if (generateVideo.isPending) {
      toast({
        title: "Tunggu sebentar",
        description: "Request sedang dikirim, harap tunggu sebentar.",
        variant: "destructive",
      });
      return;
    }

    generateVideo.mutate(prompt);
  };

  const handleEnhancePrompt = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt diperlukan",
        description: "Silakan masukkan prompt terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    enhancePromptMutation.mutate(prompt);
  };

  const handlePromptExample = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const handleRetry = () => {
    if (prompt) {
      generateVideo.mutate(prompt);
    }
  };

  const processingCount = videos.filter(v => v.status === "processing").length;
  const isGenerating = generateVideo.isPending;
  const canGenerate = !isGenerating; // Allow multiple videos to be generated simultaneously

  return (
    <div className="space-y-6">
      {/* Video Generation Interface */}
      <div className="space-y-4">
        {/* Prompt Input */}
        <div className="mb-4">
          <div className="relative">
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  // Allow Enter key to generate - multiple videos can be processed simultaneously
                  if (!isGenerating) {
                    handleGenerate();
                  } else {
                    toast({
                      title: "Tunggu sebentar",
                      description: "Request sedang dikirim, harap tunggu sebentar.",
                      variant: "destructive",
                    });
                  }
                }
              }}
              placeholder="A majestic eagle soaring through mountain peaks at sunset... (Press Enter to generate)"
              className="w-full h-24 px-4 py-3 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none transition-all duration-200 backdrop-blur-sm"
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 text-sm text-slate-500">
              {prompt.length}/500
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="mb-4">
          <p className="text-sm text-slate-400 mb-3">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(examplePrompts) && examplePrompts.length > 0 ? examplePrompts.slice(0, 4).map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handlePromptExample(example)}
                className="px-3 py-1.5 bg-slate-800/60 hover:bg-slate-700/80 border-slate-600/50 text-xs backdrop-blur-sm transition-all duration-200 hover:border-purple-500/50"
                disabled={!canGenerate}
              >
                {example.length > 30 ? `${example.substring(0, 30)}...` : example}
              </Button>
            )) : (
              // Show default prompts while loading
              ["A cat playing piano in a cozy room", "Spiderman dancing on a rooftop", "Ocean waves crashing against cliffs", "A majestic eagle soaring through mountain peaks at sunset"].slice(0, 4).map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePromptExample(example)}
                  className="px-3 py-1.5 bg-slate-800/60 hover:bg-slate-700/80 border-slate-600/50 text-xs backdrop-blur-sm transition-all duration-200 hover:border-purple-500/50"
                  disabled={!canGenerate}
                >
                  {example.length > 30 ? `${example.substring(0, 30)}...` : example}
                </Button>
              ))
            )}
          </div>
        </div>

        {/* Settings & Controls Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-translate"
                checked={autoTranslate}
                onCheckedChange={setAutoTranslate}
                className="scale-75"
              />
              <Label htmlFor="auto-translate" className="text-xs text-slate-400 flex items-center gap-1">
                <Languages className="w-3 h-3" />
                Auto-translate
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span className="text-xs">8s duration</span>
            </div>
            <div className="flex items-center space-x-1">
              <Film className="w-3 h-3" />
              <span className="text-xs">{videos.length} videos</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleEnhancePrompt}
              disabled={enhancePromptMutation.isPending || !prompt.trim()}
              variant="outline"
              size="sm"
              className="px-3 py-2 bg-slate-800/60 hover:bg-slate-700/80 border-slate-600/50 text-xs backdrop-blur-sm transition-all duration-200 hover:border-cyan-500/50"
            >
              {enhancePromptMutation.isPending ? (
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              ) : (
                <Sparkles className="w-3 h-3 mr-1" />
              )}
              Enhance
            </Button>
            
            <Button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-lg font-semibold transition-all duration-200 text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              {isGenerating ? (
                <Loader2 className="w-3 h-3 mr-2 animate-spin" />
              ) : (
                <Play className="w-3 h-3 mr-2" />
              )}
              {isGenerating ? "Generating..." : "Generate Video"}
            </Button>
          </div>
        </div>
      </div>

      {/* Video Queue */}
      {videos.length > 0 && (
        <VideoTotal videos={videos} />
      )}
    </div>
  );
}
