import { Cog } from "lucide-react";
import type { Video } from "@shared/schema";

interface StatusDisplayProps {
  video: Video;
}

export default function StatusDisplay({ video }: StatusDisplayProps) {
  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <Cog className="w-4 h-4 text-white animate-spin" />
          </div>
          <div>
            <h3 className="font-semibold text-accent">Generating Video</h3>
            <p className="text-sm text-slate-400">Processing your prompt...</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400">In Progress</div>
          <div className="text-xs text-slate-500">~2-3 minutes</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 animate-pulse"
          style={{ width: "60%" }}
        />
      </div>

      <div className="text-sm text-slate-400">
        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Your video is being created using advanced AI. This may take a few minutes.
      </div>
    </div>
  );
}
