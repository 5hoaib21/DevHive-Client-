export type MongoId = string | { $oid: string };

export function getIdString(id: MongoId): string {
  return typeof id === 'string' ? id : id.$oid;
}

export type UserRole = "explorer" | "publisher" | "admin";
export type ResourceStatus = "pending" | "approved" | "rejected";
export type ResourceDifficulty = "beginner" | "intermediate" | "advanced";
export type ResourceVisibility = "public" | "private";
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

export interface Resource {
  _id: MongoId;
  title: string;
  shortDescription?: string;
  content: string;
  language: string;
  difficulty: ResourceDifficulty;
  category: string;
  visibility: ResourceVisibility;
  tags: string[];
  userId: string;
  authorName: string;
  authorEmail: string;
  authorImage: string;
  status: ResourceStatus;
  rating: number;
  ratingCount: number;
  totalReviews: number;
  usageCount: number;
  bookmarks: string[];
  reviews: Review[];
  estimatedTime?: string;
  documentationUrl?: string;
  image?: string;
  framework?: string;
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
  resourceId: MongoId;
  resourceTitle: string;
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

export interface TopPublisher {
  _id: MongoId;
  authorName: string;
  authorEmail: string;
  authorImage: string;
  totalResources: number;
}

export interface PublisherAnalytics {
  totalResources: number;
  totalUsage: number;
  totalBookmarks: number;
}

export interface ExplorerAnalytics {
  totalBookmarks: number;
  totalReviews: number;
}

export interface AdminStats {
  totalUsers: number;
  totalResources: number;
  totalReviews: number;
  totalUsage: number;
  languageData: LanguageData[];
}

export interface LanguageData {
  name: string;
  Usage: number;
  Resources: number;
}