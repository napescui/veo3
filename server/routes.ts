import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVideoSchema, updateVideoSchema } from "@shared/schema";
import axios from "axios";
import { enhancePrompt, translateToEnglish, detectLanguage } from "./gemini";
import { GoogleGenAI } from "@google/genai";

const ANABOT_API_BASE = "https://anabot.my.id/api/ai";
const ANABOT_API_KEY = "freeApikey";

export async function registerRoutes(app: Express): Promise<Server> {
  
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
  
  // Create a new video generation request
  app.post("/api/videos", async (req, res) => {
    try {
      const { prompt, autoTranslate = true } = req.body;
      
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
              updateData = {
                status: "success",
                videoUrl: result.completeData.data.video_url
              };
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

      // Initialize Gemini for chat
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

      // Create context for Veo3 Lite customer service
      const systemPrompt = `You are a helpful customer service assistant for Veo3 Lite, an AI-powered video generation platform. 

Key features of Veo3 Lite:
- Generates 8-second professional videos from text prompts
- Uses advanced AI technology for high-quality video creation
- Supports automatic prompt enhancement and translation
- Processes up to 10 concurrent video generations
- No editing skills required - just imagination
- Free to use with fast generation times (under 3 minutes)

Answer user questions about the platform, help with troubleshooting, explain features, and provide general support. Be friendly, helpful, and professional. If you don't know something specific about the platform, acknowledge it and offer to help in other ways.

Respond in the same language as the user's question.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt,
        },
        contents: message,
      });

      const botResponse = response.text || "I apologize, but I'm having trouble responding right now. Please try again in a moment.";
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
