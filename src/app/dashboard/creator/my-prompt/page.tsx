import { getPrompts } from "@/lib/api/prompts";
import React from "react";
import MyPromptTable from "./PromptTable";
import { EmptyState } from "@/components/ui/EmptyState";

interface SearchParams {
  page?: string;
}

interface PromptsData {
  data: Array<{
    _id: string;
    title: string;
    aiTool: string;
    visibility: string;
    status: string;
    copyCount: number;
    ratingCount: number;
  }>;
  page: number;
  totalPages: number;
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