import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";
import type { Video } from "@shared/schema";

interface ErrorDisplayProps {
  video: Video;
  onRetry: () => void;
}

export default function ErrorDisplay({ video, onRetry }: ErrorDisplayProps) {
  return (
    <div className="bg-red-900/20 border border-red-800 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-red-400">Generation Failed</h3>
          <p className="text-sm text-red-300">An error occurred while generating your video</p>
        </div>
      </div>
      
      <div className="bg-red-950/50 rounded-lg p-4 mb-4">
        <p className="text-sm text-red-200">
          {video.errorMessage || "The video generation service is temporarily unavailable. Please try again in a few minutes."}
        </p>
      </div>

      <Button 
        onClick={onRetry}
        className="bg-red-600 hover:bg-red-700 transition-colors"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
}
