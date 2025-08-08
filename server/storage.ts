import { type Video, type InsertVideo, type UpdateVideo } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getVideo(id: string): Promise<Video | undefined>;
  createVideo(video: InsertVideo & { generationId?: string; status?: string; errorMessage?: string }): Promise<Video>;
  updateVideo(id: string, updates: UpdateVideo): Promise<Video | undefined>;
}

export class MemStorage implements IStorage {
  private videos: Map<string, Video>;

  constructor() {
    this.videos = new Map();
  }

  async getVideo(id: string): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(data: InsertVideo & { generationId?: string; status?: string; errorMessage?: string }): Promise<Video> {
    const id = randomUUID();
    const now = new Date();
    const video: Video = {
      id,
      prompt: data.prompt,
      generationId: data.generationId || null,
      status: data.status || "pending",
      videoUrl: null,
      errorMessage: data.errorMessage || null,
      createdAt: now,
      updatedAt: now,
    };
    
    this.videos.set(id, video);
    return video;
  }

  async updateVideo(id: string, updates: UpdateVideo): Promise<Video | undefined> {
    const video = this.videos.get(id);
    if (!video) return undefined;

    const updatedVideo: Video = {
      ...video,
      ...updates,
      updatedAt: new Date(),
    };

    this.videos.set(id, updatedVideo);
    return updatedVideo;
  }
}

export const storage = new MemStorage();
