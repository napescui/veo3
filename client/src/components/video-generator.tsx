import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Loader2, Clock, Film } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StatusDisplay from "./status-display";
import VideoResult from "./video-result";
import ErrorDisplay from "./error-display";
import type { Video } from "@shared/schema";

const EXAMPLE_PROMPTS = [
  "A cat playing piano in a cozy room",
  "Spiderman dancing on a rooftop",
  "Ocean waves crashing against cliffs",
  "A majestic eagle soaring through mountain peaks at sunset"
];

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Generate video mutation
  const generateVideo = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await apiRequest("POST", "/api/videos", { prompt });
      return response.json() as Promise<Video>;
    },
    onSuccess: (video) => {
      setCurrentVideoId(video.id);
      toast({
        title: "Video generation started",
        description: "Your video is being processed. This may take a few minutes.",
      });
    },
    onError: (error) => {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to start video generation",
        variant: "destructive",
      });
    },
  });

  // Poll video status
  const { data: currentVideo } = useQuery<Video | null>({
    queryKey: ["/api/videos", currentVideoId, "status"],
    enabled: !!currentVideoId,
    queryFn: async () => {
      if (!currentVideoId) return null;
      const response = await fetch(`/api/videos/${currentVideoId}/status`);
      if (!response.ok) throw new Error('Failed to fetch video status');
      return await response.json() as Video;
    },
    refetchInterval: (data) => {
      // Stop polling if video is complete or failed
      if (data && (data.status === "success" || data.status === "failed")) {
        return false;
      }
      return 5000; // Poll every 5 seconds
    },
    refetchIntervalInBackground: false,
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate your video.",
        variant: "destructive",
      });
      return;
    }

    if (prompt.length < 10) {
      toast({
        title: "Prompt too short",
        description: "Please provide a more detailed prompt (at least 10 characters).",
        variant: "destructive",
      });
      return;
    }

    generateVideo.mutate(prompt);
  };

  const handlePromptExample = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const handleRetry = () => {
    if (prompt) {
      generateVideo.mutate(prompt);
    }
  };

  const isGenerating = generateVideo.isPending || (currentVideo?.status === "processing");

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
              placeholder="A majestic eagle soaring through mountain peaks at sunset..."
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
            {EXAMPLE_PROMPTS.map((example, index) => (
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

        {/* Generation Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Duration: 8 seconds</span>
            </div>
            <div className="flex items-center space-x-2">
              <Film className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">HD Quality</span>
            </div>
          </div>
          
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
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

      {/* Status Display */}
      {currentVideo && currentVideo.status === "processing" && (
        <StatusDisplay video={currentVideo} />
      )}

      {/* Video Result */}
      {currentVideo && currentVideo.status === "success" && currentVideo.videoUrl && (
        <VideoResult video={currentVideo} />
      )}

      {/* Error Display */}
      {currentVideo && currentVideo.status === "failed" && (
        <ErrorDisplay 
          video={currentVideo} 
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
