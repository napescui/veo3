import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  prompt: text("prompt").notNull(),
  originalPrompt: text("original_prompt"), // Store original prompt before translation
  generationId: text("generation_id"),
  status: text("status").notNull().default("pending"), // pending, processing, success, failed
  videoUrl: text("video_url"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertVideoSchema = createInsertSchema(videos).pick({
  prompt: true,
  originalPrompt: true,
}).partial({ originalPrompt: true });

export const updateVideoSchema = createInsertSchema(videos).pick({
  status: true,
  videoUrl: true,
  errorMessage: true,
  generationId: true,
  originalPrompt: true,
}).partial();

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type UpdateVideo = z.infer<typeof updateVideoSchema>;
export type Video = typeof videos.$inferSelect;

// API response types for anabot.my.id
export const anabotRequestResponseSchema = z.object({
  data: z.object({
    result: z.object({
      id: z.string(),
    }),
  }),
});

export const anabotStatusResponseSchema = z.object({
  data: z.object({
    result: z.object({
      state: z.enum(["pending", "processing", "success", "fail", "failed"]),
      completeData: z.object({
        data: z.object({
          video_url: z.string(),
        }).optional(),
      }).optional(),
      failMsg: z.string().optional(),
    }),
  }),
});

export type AnabotRequestResponse = z.infer<typeof anabotRequestResponseSchema>;
export type AnabotStatusResponse = z.infer<typeof anabotStatusResponseSchema>;
