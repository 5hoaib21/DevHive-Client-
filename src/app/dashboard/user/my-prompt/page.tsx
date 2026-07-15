import { getPrompts } from "@/lib/api/prompts";
import React from "react";
import MyPromptTable from "../../creator/my-prompt/PromptTable";
import { EmptyState } from "@/components/ui/EmptyState";

interface SearchParams {
  page?: string;
}

interface PromptsResponse {
  data: Prompt[];
  page: number;
  totalPages: number;
}

interface Prompt {
  _id: string;
  title: string;
  content: string;
  aiTool: string;
  difficulty: string;
  category: string;
  visibility: string;
  tags: string[];
  userId: string;
  authorName: string;
  authorEmail: string;
  authorImage: string;
  status: string;
  rating: number;
  ratingCount: number;
  totalReviews: number;
  copyCount: number;
  bookmarks: string[];
  reviews: Review[];
  createdAt: string;
  updatedAt?: string;
}

interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const MyPromptPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const params = await searchParams;

  const prompts = await getPrompts(Number(params.page) || undefined);

  return (
    <div>
      <div>Prompts Management page</div>
      <div className="w-10/12 mx-auto">
        {prompts.data.length === 0 && <EmptyState />}
      </div>
      <div className="flex flex-col gap-4">
        {prompts.data.length !== 0 && <MyPromptTable promptsData={prompts} />}
      </div>
    </div>
  );
};

export default MyPromptPage;