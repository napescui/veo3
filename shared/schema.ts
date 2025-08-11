import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User authentication table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  username: varchar("username").unique(),
  password: varchar("password"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  provider: varchar("provider").default("local"), // 'local' or 'google'
  googleId: varchar("google_id").unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  prompt: text("prompt").notNull(),
  originalPrompt: text("original_prompt"), // Store original prompt before translation
  generationId: text("generation_id"),
  status: text("status").notNull().default("pending"), // pending, processing, success, failed
  videoUrl: text("video_url"),
  videoPath: text("video_path"), // Path to downloaded video file
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateUserSchema = createInsertSchema(users).pick({
  email: true,
  username: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
}).partial();

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signupSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).optional(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

// Video schemas
export const insertVideoSchema = createInsertSchema(videos).pick({
  prompt: true,
  originalPrompt: true,
  userId: true,
}).partial({ originalPrompt: true, userId: true });

export const updateVideoSchema = createInsertSchema(videos).pick({
  status: true,
  videoUrl: true,
  videoPath: true,
  errorMessage: true,
  generationId: true,
  originalPrompt: true,
}).partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;

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
