export type MongoId = string | { $oid: string };

export function getIdString(id: MongoId): string {
  return typeof id === 'string' ? id : id.$oid;
}

export type UserRole = "user" | "creator" | "admin";
export type PromptStatus = "pending" | "approved" | "rejected" | "draft";
export type PromptDifficulty = "beginner" | "intermediate" | "advanced";
export type PromptVisibility = "public" | "private";
export type ReportStatus = "pending" | "warned" | "dismissed";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Prompt {
  _id: MongoId;
  title: string;
  content: string;
  aiTool: string;
  difficulty: PromptDifficulty;
  category: string;
  visibility: PromptVisibility;
  tags: string[];
  userId: string;
  authorName: string;
  authorEmail: string;
  authorImage: string;
  status: PromptStatus;
  rating: number;
  ratingCount: number;
  totalReviews: number;
  copyCount: number;
  bookmarks: string[];
  reviews: Review[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Report {
  _id: MongoId;
  promptId: MongoId;
  promptTitle: string;
  userId: string;
  reason: string;
  description: string;
  status: ReportStatus;
  createdAt: Date;
  reporter: {
    name: string;
    email: string;
    image: string;
  };
}

export interface TopCreator {
  _id: MongoId;
  authorName: string;
  authorEmail: string;
  authorImage: string;
  totalPrompts: number;
}

export interface CreatorAnalytics {
  totalPrompts: number;
  totalCopies: number;
  totalBookmarks: number;
}

export interface UserAnalytics {
  totalBookmarks: number;
  totalReviews: number;
  totalCopies: number;
}

export interface AdminStats {
  totalUsers: number;
  totalPrompts: number;
  totalReviews: number;
  totalCopies: number;
}

export interface EngineData {
  name: string;
  Prompts: number;
  Copies: number;
}