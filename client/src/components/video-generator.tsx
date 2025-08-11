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

    // No limit on video generation - unlimited processing

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
  const canGenerate = true; // Always allow generation - unlimited

  return (
    <div className="space-y-8">
      {/* Video Generation Interface */}
      <div className="bg-surface/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
        {/* Prompt Input */}
        <div className="mb-6">
          <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-3">
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Describe your video
          </label>
          <div className="relative">
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
              placeholder="A majestic eagle soaring through mountain peaks at sunset... (Press Enter to generate)"
              className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-accent placeholder-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all duration-200"
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 text-sm text-slate-500">
              {prompt.length}/500
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="mb-6">
          <p className="text-sm text-slate-400 mb-3">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handlePromptExample(example)}
                className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700 border-slate-600 text-sm"
                disabled={isGenerating}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-translate"
                checked={autoTranslate}
                onCheckedChange={setAutoTranslate}
              />
              <Label htmlFor="auto-translate" className="text-sm text-slate-300 flex items-center gap-2">
                <Languages className="w-4 h-4" />
                Auto-translate Indonesian to English
              </Label>
            </div>
          </div>
        </div>

        {/* Generation Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Duration: 8 seconds</span>
            </div>
            <div className="flex items-center space-x-2">
              <Film className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Total: {videos.length}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleEnhancePrompt}
              disabled={enhancePromptMutation.isPending || !prompt.trim()}
              variant="outline"
              size="sm"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border-slate-600"
            >
              {enhancePromptMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Enhance
            </Button>
            
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !canGenerate}
              className="bg-gradient-to-r from-primary to-secondary hover:from-indigo-600 hover:to-purple-600 px-8 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
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
