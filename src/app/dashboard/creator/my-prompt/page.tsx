import { getMyResources as getPrompts } from "@/lib/api/prompts";
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
    language: string;
    visibility: string;
    status: string;
    usageCount: number;
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
      <div>Resources Management page</div>
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