import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Pause, 
  Square, 
  Scissors, 
  Volume2, 
  VolumeX,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Download,
  Upload,
  Type,
  Image,
  Layers,
  Settings,
  Save,
  Undo,
  Redo,
  FastForward,
  Rewind,
  SkipBack,
  SkipForward,
  MousePointer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VideoEditor() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState([80]);
  const [isMuted, setIsMuted] = useState(false);
  const [zoom, setZoom] = useState([100]);
  const [selectedTool, setSelectedTool] = useState("select");
  const [opacity, setOpacity] = useState([100]);
  const [scale, setScale] = useState([100]);
  const [rotation, setRotation] = useState([0]);
  const [bass, setBass] = useState([0]);
  const [treble, setTreble] = useState([0]);
  const [hasChanges, setHasChanges] = useState(false);
  const [projectName, setProjectName] = useState("Untitled Project");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const tools = [
    { id: "select", icon: MousePointer, name: "Select" },
    { id: "cut", icon: Scissors, name: "Cut" },
    { id: "text", icon: Type, name: "Text" },
    { id: "image", icon: Image, name: "Image" },
  ];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(error => {
          console.log('Video play error:', error);
          // Video might not be loaded yet, just update state
          setIsPlaying(true);
        });
        setIsPlaying(true);
      }
    } else {
      // No video loaded, just toggle state for demo
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleRewind = () => {
    const newTime = Math.max(0, currentTime - 10);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleFastForward = () => {
    const newTime = Math.min(duration, currentTime + 10);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleSkipBack = () => {
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleSkipForward = () => {
    setCurrentTime(duration);
    if (videoRef.current) {
      videoRef.current.currentTime = duration;
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100;
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleZoomChange = (value: number[]) => {
    setZoom(value);
  };

  const handleUndo = () => {
    toast({
      title: "Undo",
      description: "Last action has been undone",
    });
  };

  const handleRedo = () => {
    toast({
      title: "Redo",
      description: "Action has been redone",
    });
  };

  const handleSaveProject = () => {
    setHasChanges(false);
    toast({
      title: "Project Saved",
      description: `${projectName} has been saved successfully`,
    });
  };

  const handleExportVideo = () => {
    toast({
      title: "Export Started",
      description: "Your video is being exported. This may take a few minutes.",
    });
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your video has been exported successfully",
      });
    }, 3000);
  };

  const handleImportMedia = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Media Imported",
        description: `${file.name} has been added to your project`,
      });
      setHasChanges(true);
    }
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    toast({
      title: "Tool Selected",
      description: `${tools.find(t => t.id === toolId)?.name} tool is now active`,
    });
  };

  const handlePropertyChange = (property: string, value: number[]) => {
    setHasChanges(true);
    switch (property) {
      case 'opacity':
        setOpacity(value);
        break;
      case 'scale':
        setScale(value);
        break;
      case 'rotation':
        setRotation(value);
        break;
      case 'bass':
        setBass(value);
        break;
      case 'treble':
        setTreble(value);
        break;
    }
  };

  const formatTime = (seconds: number) => {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  JrennGenerator Editor
                </h1>
              </motion.a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10" onClick={handleSaveProject}>
                <Save className="w-4 h-4 mr-2" />
                Save Project
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={handleExportVideo}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Tools & Properties */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 bg-black/30 backdrop-blur-sm border-r border-white/10 p-4"
        >
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10">
              <TabsTrigger value="tools" className="text-white data-[state=active]:text-black">Tools</TabsTrigger>
              <TabsTrigger value="effects" className="text-white data-[state=active]:text-black">Effects</TabsTrigger>
              <TabsTrigger value="audio" className="text-white data-[state=active]:text-black">Audio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tools" className="mt-4 space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant={selectedTool === tool.id ? "default" : "ghost"}
                      className={`w-full justify-start ${selectedTool === tool.id ? 'text-black' : 'text-white hover:text-white hover:bg-white/20'}`}
                      onClick={() => handleToolSelect(tool.id)}
                    >
                      <tool.icon className="w-4 h-4 mr-2" />
                      {tool.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-white">Opacity ({opacity[0]}%)</Label>
                    <Slider
                      value={opacity}
                      onValueChange={(value) => handlePropertyChange('opacity', value)}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-white">Scale ({scale[0]}%)</Label>
                    <Slider
                      value={scale}
                      onValueChange={(value) => handlePropertyChange('scale', value)}
                      max={200}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-white">Rotation ({rotation[0]}°)</Label>
                    <Slider
                      value={rotation}
                      onValueChange={(value) => handlePropertyChange('rotation', value)}
                      max={360}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="effects" className="mt-4 space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Video Effects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Blur", "Sharpen", "Brightness", "Contrast", "Saturation", "Vintage", "Sepia", "Black & White"].map((effect) => (
                    <Button 
                      key={effect} 
                      variant="ghost" 
                      className="w-full justify-start text-sm text-white hover:text-white hover:bg-white/20"
                      onClick={() => toast({ title: "Effect Applied", description: `${effect} effect has been applied` })}
                    >
                      {effect}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audio" className="mt-4 space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Audio Effects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-white">Volume ({volume[0]}%)</Label>
                    <Slider
                      value={volume}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-white">Bass ({bass[0]})</Label>
                    <Slider
                      value={bass}
                      onValueChange={(value) => handlePropertyChange('bass', value)}
                      max={100}
                      min={-100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-white">Treble ({treble[0]})</Label>
                    <Slider
                      value={treble}
                      onValueChange={(value) => handlePropertyChange('treble', value)}
                      max={100}
                      min={-100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" onClick={handleUndo}>
                  <Undo className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleRedo}>
                  <Redo className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-white/20 mx-2" />
                <Button size="sm" variant="ghost" onClick={handleImportMedia}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Media
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*,audio/*,image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm text-white">Zoom:</Label>
                  <Button size="sm" variant="ghost" onClick={() => handleZoomChange([Math.max(25, zoom[0] - 25)])}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm w-12 text-center text-white">{zoom[0]}%</span>
                  <Button size="sm" variant="ghost" onClick={() => handleZoomChange([Math.min(400, zoom[0] + 25)])}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Preview Area */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 bg-black/40 backdrop-blur-sm flex items-center justify-center p-8"
          >
            <div className="relative bg-black rounded-xl shadow-2xl" style={{ transform: `scale(${zoom[0] / 100})` }}>
              <video
                ref={videoRef}
                className="w-[640px] h-[360px] rounded-xl"
                poster="/api/placeholder/640/360"
              >
                <source src="" type="video/mp4" />
              </video>
              <div className="absolute inset-0 border-2 border-purple-500/50 rounded-xl pointer-events-none" />
              
              {/* Center Play Button when paused */}
              {!isPlaying && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={handlePlayPause}
                >
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Timeline & Controls */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-4"
          >
            {/* Playback Controls */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button size="sm" variant="ghost" onClick={handleSkipBack}>
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleRewind}>
                <Rewind className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={handlePlayPause} className="bg-purple-600 hover:bg-purple-700">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={handleFastForward}>
                <FastForward className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleSkipForward}>
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleStop}>
                <Square className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center space-x-2 ml-8">
                <Button size="sm" variant="ghost" onClick={handleMute}>
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <div className="w-24">
                  <Slider
                    value={volume}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-mono w-16">{formatTime(currentTime)}</span>
                <div 
                  className="flex-1 h-8 bg-slate-800 rounded-lg relative cursor-pointer overflow-hidden"
                  onClick={handleTimelineClick}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-100"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                  <div 
                    className="absolute top-0 w-1 h-full bg-white shadow-lg transition-all duration-100"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-mono w-16">{formatTime(duration)}</span>
              </div>

              {/* Track Layers */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm w-16 text-white">Video</span>
                  <div className="flex-1 h-12 bg-slate-700 rounded-lg border border-slate-600 relative">
                    <div className="h-full bg-gradient-to-r from-blue-600/50 to-blue-400/50 rounded-lg m-1 flex items-center px-3">
                      <span className="text-xs">Main Video Track</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm w-16 text-white">Audio</span>
                  <div className="flex-1 h-12 bg-slate-700 rounded-lg border border-slate-600 relative">
                    <div className="h-full bg-gradient-to-r from-green-600/50 to-green-400/50 rounded-lg m-1 flex items-center px-3">
                      <span className="text-xs">Audio Track 1</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm w-16 text-white">Text</span>
                  <div className="flex-1 h-12 bg-slate-700 rounded-lg border border-slate-600 relative">
                    <div className="h-full bg-gradient-to-r from-yellow-600/50 to-yellow-400/50 rounded-lg m-1 flex items-center px-3 w-32">
                      <span className="text-xs">Title Text</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar - Media Library */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 bg-black/30 backdrop-blur-sm border-l border-white/10 p-4"
        >
          <Tabs defaultValue="media" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10">
              <TabsTrigger value="media" className="text-white data-[state=active]:text-black">Media</TabsTrigger>
              <TabsTrigger value="export" className="text-white data-[state=active]:text-black">Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="media" className="mt-4 space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Media Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-video bg-slate-700 rounded-lg border border-slate-600 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors">
                        <Image className="w-6 h-6 text-slate-400" />
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700" onClick={handleImportMedia}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Media
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export" className="mt-4 space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Export Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-white">Quality</Label>
                    <select className="w-full mt-2 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white">
                      <option className="text-black">1080p (Full HD)</option>
                      <option className="text-black">720p (HD)</option>
                      <option className="text-black">480p (SD)</option>
                      <option className="text-black">4K (Ultra HD)</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-sm text-white">Format</Label>
                    <select className="w-full mt-2 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white">
                      <option className="text-black">MP4</option>
                      <option className="text-black">MOV</option>
                      <option className="text-black">AVI</option>
                      <option className="text-black">WebM</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-sm text-white">Frame Rate</Label>
                    <select className="w-full mt-2 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white">
                      <option className="text-black">30 fps</option>
                      <option className="text-black">24 fps</option>
                      <option className="text-black">60 fps</option>
                      <option className="text-black">120 fps</option>
                    </select>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={handleExportVideo}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Video
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}