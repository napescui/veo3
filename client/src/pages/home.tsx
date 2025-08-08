import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Video, Play, Sparkles, ArrowRight, Users, Clock, Download } from "lucide-react";
import VideoGenerator from "@/components/video-generator";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Video className="text-white text-xl" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-space-grotesk">
                Veo3 Lite
              </h1>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <motion.a 
                href="#features" 
                className="text-slate-300 hover:text-white transition-colors font-medium"
                whileHover={{ y: -2 }}
              >
                Features
              </motion.a>
              <motion.a 
                href="#gallery" 
                className="text-slate-300 hover:text-white transition-colors font-medium"
                whileHover={{ y: -2 }}
              >
                Gallery
              </motion.a>
              <motion.a 
                href="#pricing" 
                className="text-slate-300 hover:text-white transition-colors font-medium"
                whileHover={{ y: -2 }}
              >
                Pricing
              </motion.a>
              <motion.button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold shadow-lg shadow-purple-500/25"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
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
              <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">Powered by Advanced AI Technology</span>
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight font-space-grotesk"
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
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Create professional <span className="text-cyan-400 font-semibold">8-second videos</span> from simple text prompts using cutting-edge AI. 
            No editing skills required - just your imagination.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button
              onClick={() => setShowGenerator(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Creating Free
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
              size="lg"
            >
              <Video className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
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
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Generator Section */}
      {showGenerator && (
        <motion.section 
          className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          id="generator"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Create Your First Video
              </h2>
              <p className="text-xl text-slate-300">
                Enter your prompt below and watch the magic happen
              </p>
            </motion.div>
            <VideoGenerator />
          </div>
        </motion.section>
      )}

      {!showGenerator && (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Button
            onClick={() => setShowGenerator(true)}
            variant="ghost"
            className="text-cyan-400 hover:text-cyan-300 animate-bounce"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Try it now
          </Button>
        </motion.div>
      )}
    </div>
  );
}