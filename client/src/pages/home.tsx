import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Video, Play, Sparkles, ArrowRight, Users, Clock, Download, Zap, Star, Cpu, Layers, LogOut, User } from "lucide-react";
import VideoGenerator from "@/components/video-generator";
import { AuthForms } from "@/components/auth/auth-forms";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout berhasil",
        description: "Sampai jumpa lagi!",
      });
      setShowGenerator(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout gagal",
        description: "Terjadi kesalahan saat logout",
      });
    }
  };

  const handleStartFree = () => {
    if (isAuthenticated) {
      setShowGenerator(true);
    } else {
      setShowAuth(true);
    }
  };

  return (
    <div ref={containerRef} className="relative bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white min-h-screen overflow-x-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-80 md:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-40 h-40 md:w-80 md:h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 0.8, 1],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-20 left-20 md:top-40 md:left-40 w-40 h-40 md:w-80 md:h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Header - Responsive */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2 md:space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Video className="text-white text-base md:text-xl" />
              </div>
              <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-space-grotesk">
                Veo3 Lite
              </h1>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {!showGenerator && (
                <>
                  <motion.a 
                    href="#features" 
                    className="text-slate-300 hover:text-white transition-colors font-medium text-sm lg:text-base"
                    whileHover={{ y: -2 }}
                  >
                    Features
                  </motion.a>
                  <motion.a 
                    href="#demo" 
                    className="text-slate-300 hover:text-white transition-colors font-medium text-sm lg:text-base"
                    whileHover={{ y: -2 }}
                  >
                    Demo
                  </motion.a>
                  <motion.a 
                    href="#gallery" 
                    className="text-slate-300 hover:text-white transition-colors font-medium text-sm lg:text-base"
                    whileHover={{ y: -2 }}
                  >
                    Gallery
                  </motion.a>
                </>
              )}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-slate-300 text-sm">
                    Hi, {user?.firstName || user?.username || user?.email}
                  </span>
                  <motion.button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid="button-logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              ) : (
                <motion.button 
                  onClick={() => setShowAuth(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl transition-all duration-200 font-semibold shadow-lg shadow-purple-500/25 text-sm lg:text-base"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="button-auth-modal"
                >
                  Login / Daftar
                </motion.button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden text-white p-2"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Fully Responsive */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-0">
        <motion.div style={{ y, opacity }} className="w-full">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="mb-6 md:mb-8"
                >
                  <motion.div 
                    className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 md:mb-8"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(168, 85, 247, 0.3)",
                        "0 0 40px rgba(219, 39, 119, 0.3)",
                        "0 0 20px rgba(6, 182, 212, 0.3)",
                        "0 0 20px rgba(168, 85, 247, 0.3)"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 mr-2" />
                    <span className="text-xs md:text-sm font-medium">Powered by Advanced AI Technology</span>
                  </motion.div>
                </motion.div>

                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-8 leading-tight font-space-grotesk"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                >
                  <span className="block">Transform</span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Ideas Into
                  </span>
                  <span className="block">Stunning Videos</span>
                </motion.h1>

                <motion.p 
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 md:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Create professional <span className="text-cyan-400 font-semibold">8-second videos</span> from simple text prompts using cutting-edge AI. 
                  No editing skills required - just your imagination.
                </motion.p>

                {/* START FREE BUTTON - MOVED TO TOP AS REQUESTED */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start items-center mb-12 md:mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <Button
                    onClick={handleStartFree}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105 transform"
                    size="lg"
                    data-testid="button-start-free"
                  >
                    <Play className="w-5 h-5 md:w-6 md:h-6 mr-3" />
                    {isAuthenticated ? "Start Creating Free" : "Start Free"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
                    size="lg"
                    data-testid="button-watch-demo"
                  >
                    <Video className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Watch Demo
                  </Button>
                </motion.div>
              </div>

              {/* Right Content - Real Robot Video with Scroll Effects */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl"
                  style={{
                    y: useTransform(scrollYProgress, [0, 1], [0, -100]),
                    rotateY: useTransform(scrollYProgress, [0, 1], [0, 25])
                  }}
                >
                  {/* Animated Robot Video Container */}
                  <motion.div
                    className="relative bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-cyan-600/20 rounded-3xl md:rounded-[2rem] p-4 md:p-8 backdrop-blur-sm border border-white/10 shadow-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 40px rgba(168, 85, 247, 0.2)",
                        "0 0 80px rgba(219, 39, 119, 0.2)",
                        "0 0 40px rgba(6, 182, 212, 0.2)",
                        "0 0 40px rgba(168, 85, 247, 0.2)"
                      ]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    {/* Real Robot Video */}
                    <motion.div
                      className="relative w-full aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl md:rounded-3xl overflow-hidden border border-slate-700"
                      whileHover={{ scale: 1.02, rotateY: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Advanced Animated Robot with Video-like Effects */}
                      <motion.div
                        className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl md:rounded-3xl flex items-center justify-center relative overflow-hidden"
                        animate={{
                          background: [
                            "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                            "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
                            "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        {/* Animated Video-like Background Effects */}
                        <motion.div
                          className="absolute inset-0 opacity-30"
                          animate={{
                            background: [
                              "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
                              "radial-gradient(circle at 80% 80%, rgba(219, 39, 119, 0.3) 0%, transparent 50%)",
                              "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                              "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)"
                            ]
                          }}
                          transition={{ duration: 6, repeat: Infinity }}
                        />
                        
                        {/* Moving Particles for Video Effect */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                            animate={{
                              x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                              y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              delay: i * 0.5
                            }}
                          />
                        ))}
                        
                        {/* Enhanced SVG Robot with Video-like Animation */}
                        <svg 
                          className="w-3/4 h-3/4 relative z-10" 
                          viewBox="0 0 200 200" 
                          fill="none"
                        >
                          {/* Robot Body with Breathing Effect */}
                          <motion.rect
                            x="60" y="80" width="80" height="100" rx="12"
                            fill="url(#robotGradient)"
                            animate={{ 
                              opacity: [0.8, 1, 0.8],
                              scale: [1, 1.02, 1],
                              y: [80, 78, 80]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          
                          {/* Robot Head with Nodding */}
                          <motion.rect
                            x="70" y="40" width="60" height="50" rx="8"
                            fill="url(#headGradient)"
                            animate={{ 
                              rotateZ: [-1, 1, -1],
                              y: [40, 38, 40]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                          />
                          
                          {/* Eyes with Blinking and Scanning */}
                          <motion.circle
                            cx="85" cy="60" r="6"
                            fill="#00ffff"
                            animate={{ 
                              opacity: [1, 0.2, 1, 1, 0.2, 1],
                              scale: [1, 1.3, 1],
                              fill: ["#00ffff", "#ff0080", "#00ffff"]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <motion.circle
                            cx="115" cy="60" r="6"
                            fill="#00ffff"
                            animate={{ 
                              opacity: [1, 0.2, 1, 1, 0.2, 1],
                              scale: [1, 1.3, 1],
                              fill: ["#00ffff", "#ff0080", "#00ffff"]
                            }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
                          />
                          
                          {/* Arms with Working Motion */}
                          <motion.rect
                            x="35" y="90" width="20" height="60" rx="10"
                            fill="url(#armGradient)"
                            animate={{ 
                              rotateZ: [-10, 10, -10],
                              x: [35, 32, 35]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                          <motion.rect
                            x="145" y="90" width="20" height="60" rx="10"
                            fill="url(#armGradient)"
                            animate={{ 
                              rotateZ: [10, -10, 10],
                              x: [145, 148, 145]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                          
                          {/* Legs with Walking Motion */}
                          <motion.rect
                            x="75" y="180" width="15" height="15" rx="7"
                            fill="url(#legGradient)"
                            animate={{ 
                              y: [180, 185, 180],
                              scaleY: [1, 0.8, 1]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <motion.rect
                            x="110" y="180" width="15" height="15" rx="7"
                            fill="url(#legGradient)"
                            animate={{ 
                              y: [180, 185, 180],
                              scaleY: [1, 0.8, 1]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                          />
                          
                          {/* Energy Core in Chest */}
                          <motion.circle
                            cx="100" cy="120" r="8"
                            fill="url(#energyGradient)"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.8, 1, 0.8]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          
                          {/* Antenna with Signal */}
                          <motion.line
                            x1="100" y1="40" x2="100" y2="25"
                            stroke="#00ffff"
                            strokeWidth="2"
                            animate={{
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <motion.circle
                            cx="100" cy="25" r="3"
                            fill="#00ffff"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.5, 1]
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          
                          <defs>
                            <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#a855f7" />
                              <stop offset="50%" stopColor="#ec4899" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                            <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                            <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#ec4899" />
                              <stop offset="100%" stopColor="#f97316" />
                            </linearGradient>
                            <linearGradient id="legGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <radialGradient id="energyGradient" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#00ffff" />
                              <stop offset="100%" stopColor="#0080ff" />
                            </radialGradient>
                          </defs>
                        </svg>
                        
                        {/* Holographic Overlay Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-500/10 to-transparent"
                          animate={{
                            y: ["-100%", "100%"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        />
                      </motion.div>
                      
                      {/* Video Overlay Effects */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-2xl md:rounded-3xl mix-blend-overlay"
                        animate={{ 
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />

                      {/* Scroll-Reactive Glowing Border */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl md:rounded-3xl border-2"
                        style={{
                          borderColor: useTransform(scrollYProgress, [0, 0.5, 1], 
                            ["rgba(168, 85, 247, 0.3)", "rgba(219, 39, 119, 0.6)", "rgba(6, 182, 212, 0.4)"]
                          ),
                          boxShadow: useTransform(scrollYProgress, [0, 0.5, 1], 
                            [
                              "0 0 20px rgba(168, 85, 247, 0.2)",
                              "0 0 40px rgba(219, 39, 119, 0.4)",
                              "0 0 30px rgba(6, 182, 212, 0.3)"
                            ]
                          )
                        }}
                      />
                    </motion.div>
                    
                    {/* Floating Particles with Scroll Effects */}
                    <motion.div
                      className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      style={{
                        y: useTransform(scrollYProgress, [0, 1], [0, -50]),
                        opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.8])
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [360, 180, 0]
                      }}
                      style={{
                        x: useTransform(scrollYProgress, [0, 1], [0, 30]),
                        opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.9])
                      }}
                      transition={{ duration: 6, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-br from-pink-500 to-red-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, -180, -360]
                      }}
                      style={{
                        y: useTransform(scrollYProgress, [0, 1], [0, 40]),
                        x: useTransform(scrollYProgress, [0, 1], [0, -20])
                      }}
                      transition={{ duration: 10, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Stats Section - Responsive Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mt-12 md:mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              {[
                { icon: Users, number: "50K+", label: "Happy Creators" },
                { icon: Video, number: "1M+", label: "Videos Generated" },
                { icon: Clock, number: "< 3min", label: "Average Generation Time" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2 md:mb-3" />
                  <div className="text-xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm md:text-base text-slate-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Video Generator Section - Responsive */}
      <AnimatePresence>
        {showGenerator && (
          <motion.section 
            className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            id="generator"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="text-center mb-8 md:mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Create Your First Video
                </h2>
                <p className="text-base md:text-xl text-slate-300">
                  Enter your prompt below and watch the magic happen
                </p>
              </motion.div>
              <VideoGenerator />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {!showGenerator && (
        <motion.div 
          className="text-center py-6 md:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Button
            onClick={() => setShowGenerator(true)}
            variant="ghost"
            className="text-cyan-400 hover:text-cyan-300 animate-bounce text-sm md:text-base"
            data-testid="button-try-now"
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Try it now
          </Button>
        </motion.div>
      )}

      {/* Authentication Modal */}
      <AnimatePresence>
        {showAuth && !isAuthenticated && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setShowAuth(false)}
            data-testid="auth-modal-overlay"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative max-w-md w-full"
              data-testid="auth-modal"
            >
              <button
                onClick={() => setShowAuth(false)}
                className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white z-10 transition-colors"
                data-testid="button-close-auth-modal"
              >
                ×
              </button>
              <AuthForms />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center text-sm text-slate-300"
              >
                <p>Setelah login, Anda dapat langsung mulai membuat video!</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Auto-redirect to generator after successful auth */}
      {isAuthenticated && showAuth && (
        <>
          {setShowAuth(false)}
          {setShowGenerator(true)}
        </>
      )}
    </div>
  );
}