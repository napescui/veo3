import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useEditorStore } from "@/stores/editorStore";
import { usePlaybackStore } from "../state/playback";
import Timeline from "@/components/editor/Timeline";
import MediaBin from "@/components/editor/MediaBin";
import Viewer from "@/components/editor/Viewer";
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Settings,
  Save,
  Download,
  Undo,
  Redo,
  Layers,
  Scissors,
  Type,
  Image,
  Palette,
  Music
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function ProEditor() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [volume, setVolume] = useState([80]);
  const [isMuted, setIsMuted] = useState(false);
  
  const {
    project,
    selectedClips
  } = useEditorStore();

  const {
    isPlaying,
    currentTime,
    play,
    pause,
    stop,
    seek
  } = usePlaybackStore();

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
    toast({
      title: isPlaying ? "Paused" : "Playing",
      description: `Video ${isPlaying ? "paused" : "started playing"}`
    });
  };

  const handleStop = () => {
    stop();
    toast({
      title: "Stopped",
      description: "Video playback stopped"
    });
  };

  const handleSaveProject = () => {
    if (project) {
      localStorage.setItem('jrenn-project', JSON.stringify(project));
      toast({
        title: "Project Saved",
        description: `${project.name} has been saved`
      });
    }
  };

  const handleExportProject = () => {
    toast({
      title: "Export Started",
      description: "Your video is being exported. This may take a few minutes.",
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your video has been exported successfully"
      });
    }, 3000);
  };

  const handleUndo = () => {
    toast({
      title: "Undo",
      description: "Last action has been undone"
    });
  };

  const handleRedo = () => {
    toast({
      title: "Redo", 
      description: "Action has been redone"
    });
  };

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (project) {
        localStorage.setItem('jrenn-autosave', JSON.stringify(project));
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Layers className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Editor...</h2>
          <p className="text-slate-400">Initializing professional video editor</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/10 bg-black/20 backdrop-blur-xl"
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
                  <p className="text-xs text-slate-400">{project?.name || 'Untitled Project'}</p>
                </div>
              </motion.a>
            </div>
            
            {/* Playback Controls */}
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" onClick={() => seek(0)}>
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={handlePlayPause} className="bg-purple-600 hover:bg-purple-700">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={handleStop}>
                <Square className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => {
                const projectDuration = project?.tracks
                  .flatMap(track => track.clips)
                  .reduce((max, clip) => Math.max(max, clip.endTime), 0) || 0;
                seek(projectDuration);
              }}>
                <SkipForward className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button size="sm" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <div className="w-20">
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" onClick={handleUndo}>
                <Undo className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleRedo}>
                <Redo className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleSaveProject} className="border-white/20">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button size="sm" onClick={handleExportProject} className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tools & Media */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 bg-black/30 backdrop-blur-sm border-r border-white/10 flex flex-col"
        >
          <Tabs defaultValue="media" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 m-2">
              <TabsTrigger value="media" className="text-white data-[state=active]:text-black">Media</TabsTrigger>
              <TabsTrigger value="tools" className="text-white data-[state=active]:text-black">Tools</TabsTrigger>
              <TabsTrigger value="effects" className="text-white data-[state=active]:text-black">Effects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="media" className="flex-1 p-2">
              <MediaBin />
            </TabsContent>
            
            <TabsContent value="tools" className="flex-1 p-2 space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { id: "select", icon: Layers, name: "Select" },
                    { id: "cut", icon: Scissors, name: "Razor" },
                    { id: "text", icon: Type, name: "Text" },
                    { id: "image", icon: Image, name: "Image" },
                  ].map((tool) => (
                    <Button
                      key={tool.id}
                      variant="ghost"
                      className="w-full justify-start text-white hover:text-white hover:bg-white/20"
                      onClick={() => toast({ title: "Tool Selected", description: `${tool.name} tool activated` })}
                    >
                      <tool.icon className="w-4 h-4 mr-2" />
                      {tool.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="effects" className="flex-1 p-2 space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Video Effects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Color Correction", "Blur", "Sharpen", "Brightness", "Contrast", "Saturation"].map((effect) => (
                    <Button 
                      key={effect} 
                      variant="ghost" 
                      className="w-full justify-start text-white hover:text-white hover:bg-white/20"
                      onClick={() => toast({ title: "Effect Applied", description: `${effect} effect applied` })}
                    >
                      {effect}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    Audio Effects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Equalizer", "Reverb", "Echo", "Noise Reduction", "Normalize"].map((effect) => (
                    <Button 
                      key={effect} 
                      variant="ghost" 
                      className="w-full justify-start text-white hover:text-white hover:bg-white/20"
                      onClick={() => toast({ title: "Audio Effect Applied", description: `${effect} applied` })}
                    >
                      {effect}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Preview */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1"
          >
            <Viewer />
            
            {/* Playback Indicator */}
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Timeline */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-80"
          >
            <Timeline />
          </motion.div>
        </div>

        {/* Right Sidebar - Inspector */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 bg-black/30 backdrop-blur-sm border-l border-white/10 p-4"
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Inspector
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedClips.length > 0 ? (
                <>
                  <div>
                    <label className="text-sm text-white block mb-2">Opacity</label>
                    <Slider defaultValue={[100]} max={100} step={1} />
                  </div>
                  <div>
                    <label className="text-sm text-white block mb-2">Scale</label>
                    <Slider defaultValue={[100]} max={200} step={1} />
                  </div>
                  <div>
                    <label className="text-sm text-white block mb-2">Rotation</label>
                    <Slider defaultValue={[0]} max={360} step={1} />
                  </div>
                  <div>
                    <label className="text-sm text-white block mb-2">Volume</label>
                    <Slider defaultValue={[100]} max={100} step={1} />
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Settings className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Select a clip to edit properties</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}