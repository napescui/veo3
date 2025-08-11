import { type Video, type InsertVideo, type UpdateVideo, type User, type InsertUser, type UpdateUser } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { users, videos } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface IStorage {
  // Video operations
  getVideo(id: string): Promise<Video | undefined>;
  createVideo(video: InsertVideo & { generationId?: string; status?: string; errorMessage?: string }): Promise<Video>;
  updateVideo(id: string, updates: UpdateVideo): Promise<Video | undefined>;
  getAllVideos(userId?: string): Promise<Video[]>;
  
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: UpdateUser): Promise<User | undefined>;
  validateUser(email: string, password: string): Promise<User | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Video operations
  async getVideo(id: string): Promise<Video | undefined> {
    const [video] = await db.select().from(videos).where(eq(videos.id, id));
    return video || undefined;
  }

  async createVideo(data: InsertVideo & { generationId?: string; status?: string; errorMessage?: string }): Promise<Video> {
    const [video] = await db
      .insert(videos)
      .values({
        prompt: data.prompt,
        originalPrompt: data.originalPrompt,
        userId: data.userId,
        generationId: data.generationId || null,
        status: data.status || "pending",
        errorMessage: data.errorMessage || null,
      })
      .returning();
    return video;
  }

  async updateVideo(id: string, updates: UpdateVideo): Promise<Video | undefined> {
    const [video] = await db
      .update(videos)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(videos.id, id))
      .returning();
    return video || undefined;
  }

  async getAllVideos(userId?: string): Promise<Video[]> {
    if (userId) {
      return await db.select().from(videos).where(eq(videos.userId, userId));
    }
    return await db.select().from(videos);
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(userData: InsertUser): Promise<User> {
    // Hash password if provided
    const hashedPassword = userData.password ? await bcrypt.hash(userData.password, 10) : null;
    
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        password: hashedPassword,
      })
      .returning();
    return user;
  }

  async updateUser(id: string, updates: UpdateUser): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async validateUser(email: string, password: string): Promise<User | undefined> {
    const user = await this.getUserByEmail(email);
    if (!user || !user.password) return undefined;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : undefined;
  }
}

export const storage = new DatabaseStorage();
