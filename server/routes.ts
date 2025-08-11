import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVideoSchema, updateVideoSchema, loginSchema, signupSchema } from "@shared/schema";
import axios from "axios";
import { enhancePrompt, translateToEnglish, detectLanguage, handleChatbotQuery, generateRecommendations } from "./gemini";
import express from "express";
import session from "express-session";

// Extend session interface
declare module "express-session" {
  interface Session {
    userId?: string;
  }
}
import connectPg from "connect-pg-simple";
import fs from "fs";
import path from "path";

// Function to save user data to JSON file
function saveUserToFile(user: any) {
  try {
    const databaseDir = path.join(process.cwd(), 'database');
    if (!fs.existsSync(databaseDir)) {
      fs.mkdirSync(databaseDir, { recursive: true });
    }
    
    const fileName = `${user.firstName || 'User'}_${user.lastName || user.email.split('@')[0]}.json`;
    const filePath = path.join(databaseDir, fileName);
    
    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      provider: user.provider,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      // Don't save password hash to file for security
      hasPassword: !!user.password
    };
    
    fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
    console.log(`User data saved to: ${fileName}`);
  } catch (error) {
    console.error('Error saving user to file:', error);
  }
}

const ANABOT_API_BASE = "https://anabot.my.id/api/ai";
const ANABOT_API_KEY = "freeApikey";

// Session configuration
function setupSession(app: Express) {
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: 7 * 24 * 60 * 60, // 1 week in seconds
    tableName: "sessions",
  });

  app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret-key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  }));
}

// Authentication middleware
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

// Download video function
async function downloadVideo(videoUrl: string, videoId: string): Promise<string> {
  const downloadsDir = path.join(process.cwd(), 'downloads');
  
  // Create downloads directory if it doesn't exist
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }
  
  const filePath = path.join(downloadsDir, `${videoId}.mp4`);
  
  // Download the video
  const response = await axios({
    url: videoUrl,
    method: 'GET',
    responseType: 'stream',
    timeout: 60000, // 1 minute timeout
  });
  
  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);
  
  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(filePath));
    writer.on('error', reject);
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session
  setupSession(app);
  
  // Serve static files from downloads with proper headers
  app.use('/downloads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }, express.static(path.join(process.cwd(), 'downloads'), {
    setHeaders: (res, path) => {
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Accept-Ranges', 'bytes');
    }
  }));

  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }
      
      const user = await storage.createUser(userData);
      req.session.userId = user.id;
      
      // Save user data to JSON file
      saveUserToFile(user);
      
      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(400).json({ message: "Data registrasi tidak valid" });
    }
  });
  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginData = loginSchema.parse(req.body);
      
      const user = await storage.validateUser(loginData.email, loginData.password);
      if (!user) {
        return res.status(401).json({ message: "Email atau password salah" });
      }
      
      req.session.userId = user.id;
      
      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ message: "Data login tidak valid" });
    }
  });
  
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logout berhasil" });
    });
  });
  
  app.get("/api/auth/me", async (req: any, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Chatbot route
  app.post("/api/chatbot", async (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ 
          message: "Query is required" 
        });
      }

      const response = await handleChatbotQuery(query);
      res.json({ response });
    } catch (error) {
      console.error("Chatbot error:", error);
      res.status(500).json({ 
        message: "Terjadi kesalahan pada chatbot" 
      });
    }
  });
  
  // Enhance prompt endpoint
  app.post("/api/enhance-prompt", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ 
          message: "Prompt is required" 
        });
      }

      const enhanced = await enhancePrompt(prompt);
      res.json({ enhanced });
    } catch (error) {
      console.error("Enhance prompt error:", error);
      res.status(500).json({ 
        message: "Terjadi masalah dengan AI enhancement. Silakan coba dengan prompt asli atau coba lagi nanti." 
      });
    }
  });

  // Translate to English endpoint
  app.post("/api/translate", async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ 
          message: "Text is required" 
        });
      }

      const language = await detectLanguage(text);
      
      if (language === 'id') {
        const translated = await translateToEnglish(text);
        res.json({ translated, wasTranslated: true });
      } else {
        res.json({ translated: text, wasTranslated: false });
      }
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ 
        message: "Gagal menerjemahkan teks" 
      });
    }
  });

  // Generate recommendations endpoint  
  app.post("/api/generate-recommendations", async (req, res) => {
    try {
      const { userPrompts } = req.body;
      
      if (!userPrompts || typeof userPrompts !== 'string') {
        return res.status(400).json({ 
          message: "User prompts required" 
        });
      }

      const recommendations = await generateRecommendations(userPrompts);
      res.json({ recommendations });
    } catch (error) {
      console.error("Generate recommendations error:", error);
      res.status(500).json({ 
        message: "Failed to generate recommendations",
        recommendations: [
          "A cat playing piano in a cozy room",
          "Spiderman dancing on a rooftop",  
          "Ocean waves crashing against cliffs",
          "A majestic eagle soaring through mountain peaks at sunset"
        ]
      });
    }
  });
  
  // Create a new video generation request
  app.post("/api/videos", async (req: any, res) => {
    try {
      const { prompt, autoTranslate = true } = req.body;
      const userId = req.session.userId; // Can be undefined for guest users
      
      if (!prompt || prompt.trim().length < 10) {
        return res.status(400).json({ 
          message: "Prompt must be at least 10 characters long" 
        });
      }

      let finalPrompt = prompt;
      let wasTranslated = false;

      // Auto-translate if enabled
      if (autoTranslate) {
        try {
          const language = await detectLanguage(prompt);
          if (language === 'id') {
            finalPrompt = await translateToEnglish(prompt);
            wasTranslated = true;
          }
        } catch (translateError) {
          console.error("Translation error:", translateError);
          // Continue with original prompt if translation fails
        }
      }

      // Request video generation from anabot.my.id
      try {
        const response = await axios.get(
          `${ANABOT_API_BASE}/veo3_v2?prompt=${encodeURIComponent(finalPrompt)}&apikey=${ANABOT_API_KEY}`,
          { timeout: 30000 }
        );

        const generationId = response.data?.data?.result?.id;
        
        if (!generationId) {
          return res.status(500).json({
            message: "Failed to start video generation"
          });
        }

        // Store the video request in our database
        const video = await storage.createVideo({
          prompt: finalPrompt,
          originalPrompt: wasTranslated ? prompt : undefined,
          userId,
          generationId,
          status: "processing"
        });

        res.json({ ...video, wasTranslated });

      } catch (apiError) {
        console.error("Anabot API error:", apiError);
        
        // Store failed request
        const video = await storage.createVideo({
          prompt: finalPrompt,
          originalPrompt: wasTranslated ? prompt : undefined,
          userId,
          status: "failed",
          errorMessage: "Gagal terhubung ke layanan video generation"
        });

        res.status(500).json({
          message: "Gagal memulai video generation",
          video
        });
      }

    } catch (error) {
      console.error("Video creation error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Data request tidak valid" 
      });
    }
  });

  // Check video generation status
  app.get("/api/videos/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const video = await storage.getVideo(id);

      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      // If already completed or failed, return current status
      if (video.status === "success" || video.status === "failed") {
        return res.json(video);
      }

      // Check status with anabot.my.id if we have a generation ID
      if (video.generationId) {
        try {
          const response = await axios.get(
            `${ANABOT_API_BASE}/checkStatusVeo3_v2?id=${video.generationId}&apikey=${ANABOT_API_KEY}`,
            { timeout: 10000 }
          );

          const result = response.data?.data?.result;
          
          if (result) {
            let updateData: any = {};

            if (result.state === "success" && result.completeData?.data?.video_url) {
              try {
                // Auto-download video to server
                const videoPath = await downloadVideo(result.completeData.data.video_url, id);
                updateData = {
                  status: "success",
                  videoUrl: result.completeData.data.video_url,
                  videoPath: `/downloads/${id}.mp4`
                };
              } catch (downloadError) {
                console.error("Video download error:", downloadError);
                // Still mark as success but without local path
                updateData = {
                  status: "success",
                  videoUrl: result.completeData.data.video_url
                };
              }
            } else if (result.state === "fail" || result.state === "failed") {
              updateData = {
                status: "failed",
                errorMessage: result.failMsg || "Video generation failed"
              };
            }

            // Update video status if changed
            if (Object.keys(updateData).length > 0) {
              const updatedVideo = await storage.updateVideo(id, updateData);
              return res.json(updatedVideo);
            }
          }

        } catch (apiError) {
          console.error("Status check error:", apiError);
          // Don't fail the request, just return current status
        }
      }

      res.json(video);

    } catch (error) {
      console.error("Status check error:", error);
      res.status(500).json({ 
        message: "Failed to check video status" 
      });
    }
  });

  // Get video by ID
  app.get("/api/videos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const video = await storage.getVideo(id);

      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      res.json(video);

    } catch (error) {
      console.error("Get video error:", error);
      res.status(500).json({ 
        message: "Failed to get video" 
      });
    }
  });

  // Get all videos (for authenticated users, show their videos)
  app.get("/api/videos", async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const videos = await storage.getAllVideos(userId);
      res.json(videos);
    } catch (error) {
      console.error("Get videos error:", error);
      res.status(500).json({ 
        message: "Failed to get videos" 
      });
    }
  });

  // Download video endpoint
  app.get("/api/videos/:id/download", async (req, res) => {
    try {
      const { id } = req.params;
      const video = await storage.getVideo(id);

      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      const filePath = path.join(process.cwd(), 'downloads', `${id}.mp4`);
      
      // Check if file exists locally
      if (fs.existsSync(filePath)) {
        res.download(filePath, `video-${id}.mp4`);
      } else if (video.videoUrl) {
        // If not downloaded yet, try to download and serve
        try {
          const downloadedPath = await downloadVideo(video.videoUrl, id);
          await storage.updateVideo(id, { videoPath: `/downloads/${id}.mp4` });
          res.download(downloadedPath, `video-${id}.mp4`);
        } catch (downloadError) {
          console.error("Download error:", downloadError);
          res.status(500).json({ message: "Failed to download video" });
        }
      } else {
        res.status(404).json({ message: "Video file not available" });
      }
    } catch (error) {
      console.error("Download video error:", error);
      res.status(500).json({ 
        message: "Failed to download video" 
      });
    }
  });

  // Proxy endpoint for video streaming
  app.get("/api/videos/:id/stream", async (req, res) => {
    try {
      const { id } = req.params;
      const video = await storage.getVideo(id);

      if (!video || !video.videoUrl) {
        return res.status(404).json({ message: "Video not found" });
      }

      // Proxy the video stream
      try {
        const response = await axios.get(video.videoUrl, {
          responseType: 'stream',
          timeout: 30000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        // Set appropriate headers
        res.set({
          'Content-Type': 'video/mp4',
          'Content-Disposition': `attachment; filename="video-${id}.mp4"`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'no-cache'
        });

        // Forward content-length if available
        if (response.headers['content-length']) {
          res.set('Content-Length', response.headers['content-length']);
        }

        // Handle errors during streaming
        response.data.on('error', (streamError: any) => {
          console.error('Stream error:', streamError);
          if (!res.headersSent) {
            res.status(500).json({ message: "Stream error" });
          }
        });

        // Pipe the video stream
        response.data.pipe(res);

      } catch (proxyError) {
        console.error("Video proxy error:", proxyError);
        if (!res.headersSent) {
          res.status(500).json({ message: "Failed to stream video" });
        }
      }

    } catch (error) {
      console.error("Stream video error:", error);
      res.status(500).json({ message: "Failed to stream video" });
    }
  });

  // Chat endpoint for customer service
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          message: "Message is required" 
        });
      }

      // Use the chatbot function instead of direct GoogleGenAI call
      const botResponse = await handleChatbotQuery(message);

      res.json({ response: botResponse });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ 
        response: "I apologize, but I'm having trouble responding right now. Please try again in a moment or contact our support team directly." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
