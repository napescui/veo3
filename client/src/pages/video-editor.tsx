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
  SkipForward
} from "lucide-react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const tools = [
    { id: "select", icon: "cursor", name: "Select" },
    { id: "cut", icon: Scissors, name: "Cut" },
    { id: "text", icon: Type, name: "Text" },
    { id: "image", icon: Image, name: "Image" },
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * duration);
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
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Save className="w-4 h-4 mr-2" />
                Save Project
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
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
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="effects">Effects</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tools" className="mt-4 space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant={selectedTool === tool.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedTool(tool.id)}
                    >
                      <tool.icon className="w-4 h-4 mr-2" />
                      {tool.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm">Opacity</Label>
                    <Slider
                      value={[100]}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Scale</Label>
                    <Slider
                      value={[100]}
                      max={200}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Rotation</Label>
                    <Slider
                      value={[0]}
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
                  <CardTitle className="text-lg">Video Effects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Blur", "Sharpen", "Brightness", "Contrast", "Saturation", "Vintage", "Sepia", "Black & White"].map((effect) => (
                    <Button key={effect} variant="ghost" className="w-full justify-start text-sm">
                      {effect}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audio" className="mt-4 space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Audio Effects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm">Volume</Label>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Bass</Label>
                    <Slider
                      value={[0]}
                      max={100}
                      min={-100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Treble</Label>
                    <Slider
                      value={[0]}
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
                <Button size="sm" variant="ghost">
                  <Undo className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Redo className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-white/20 mx-2" />
                <Button size="sm" variant="ghost">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Media
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm">Zoom:</Label>
                  <Button size="sm" variant="ghost" onClick={() => setZoom([Math.max(25, zoom[0] - 25)])}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm w-12 text-center">{zoom[0]}%</span>
                  <Button size="sm" variant="ghost" onClick={() => setZoom([Math.min(400, zoom[0] + 25)])}>
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
              <Button size="sm" variant="ghost">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Rewind className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={handlePlayPause} className="bg-purple-600 hover:bg-purple-700">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="ghost">
                <FastForward className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Square className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center space-x-2 ml-8">
                <Button size="sm" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <div className="w-24">
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-mono w-16">{Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')}</span>
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
                <span className="text-sm font-mono w-16">{Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, '0')}</span>
              </div>

              {/* Track Layers */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm w-16">Video</span>
                  <div className="flex-1 h-12 bg-slate-700 rounded-lg border border-slate-600 relative">
                    <div className="h-full bg-gradient-to-r from-blue-600/50 to-blue-400/50 rounded-lg m-1 flex items-center px-3">
                      <span className="text-xs">Main Video Track</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm w-16">Audio</span>
                  <div className="flex-1 h-12 bg-slate-700 rounded-lg border border-slate-600 relative">
                    <div className="h-full bg-gradient-to-r from-green-600/50 to-green-400/50 rounded-lg m-1 flex items-center px-3">
                      <span className="text-xs">Audio Track 1</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm w-16">Text</span>
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
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="media" className="mt-4 space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Media Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-video bg-slate-700 rounded-lg border border-slate-600 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors">
                        <Image className="w-6 h-6 text-slate-400" />
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Media
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export" className="mt-4 space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Export Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm">Quality</Label>
                    <select className="w-full mt-2 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm">
                      <option>1080p (Full HD)</option>
                      <option>720p (HD)</option>
                      <option>480p (SD)</option>
                      <option>4K (Ultra HD)</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-sm">Format</Label>
                    <select className="w-full mt-2 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm">
                      <option>MP4</option>
                      <option>MOV</option>
                      <option>AVI</option>
                      <option>WebM</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-sm">Frame Rate</Label>
                    <select className="w-full mt-2 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm">
                      <option>30 fps</option>
                      <option>24 fps</option>
                      <option>60 fps</option>
                      <option>120 fps</option>
                    </select>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
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