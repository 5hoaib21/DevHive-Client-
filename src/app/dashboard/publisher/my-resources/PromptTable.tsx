"use client";

import DeleteResource from "@/components/DeleteResource";
import EditResource from "@/components/EditResource";
import Link from "next/link";

interface Prompt {
  _id: string;
  title: string;
  language: string;
  visibility: string;
  status: string;
  usageCount: number;
  ratingCount: number;
}

interface PromptsData {
  data: Prompt[];
  page: number;
  totalPages: number;
}

interface MyPromptTableProps {
  promptsData: PromptsData;
}

export default function MyPromptTable({ promptsData }: MyPromptTableProps) {
  const prompts = promptsData?.data || [];
  const page = promptsData?.page;
  const totalPages = promptsData?.totalPages || 0;

  const statusBadge: Record<string, string> = {
    approved: "dh-badge dh-badge-status-approved",
    pending: "dh-badge dh-badge-status-pending",
    rejected: "dh-badge dh-badge-status-rejected",
  };

  return (
    <div className="bg-white border border-dh-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F1F3F9] border-b border-dh-border">
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">#</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Language</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Visibility</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Copies</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="text-right py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prompts.map((prompt: Prompt, index: number) => (
              <tr key={prompt._id || String(index)} className="border-b border-dh-border last:border-b-0 hover:bg-[#FAFBFF] transition-colors">
                <td className="py-3 px-4 text-gray-400 text-xs font-mono">{index + 1}</td>
                <td className="py-3 px-4 font-medium text-gray-900">{prompt?.title}</td>
                <td className="py-3 px-4"><span className="dh-badge dh-badge-language">{prompt?.language}</span></td>
                <td className="py-3 px-4 text-sm text-gray-600 capitalize">{prompt?.visibility}</td>
                <td className="py-3 px-4">
                  <span className={statusBadge[prompt?.status?.toLowerCase()] || statusBadge.pending}>
                    {prompt?.status || "pending"}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500">{prompt?.usageCount || 0}</td>
                <td className="py-3 px-4 text-gray-500">{prompt?.ratingCount || 0}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <EditResource promptId={prompt._id} promptData={prompt} />
                    <DeleteResource promptId={prompt._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-4 border-t border-dh-border">
          {page > 1 && (
            <Link href={'/dashboard/publisher/my-resources?page=' + (page - 1)} className="dh-btn dh-btn-ghost text-xs px-3">Previous</Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link key={p} href={'/dashboard/publisher/my-resources?page=' + p}
              className={'dh-btn text-xs min-w-[32px] px-0 ' + (p === page ? 'dh-btn-primary' : 'dh-btn-ghost')}>
              {p}
            </Link>
          ))}
          {page < totalPages && (
            <Link href={'/dashboard/publisher/my-resources?page=' + (page + 1)} className="dh-btn dh-btn-ghost text-xs px-3">Next</Link>
          )}
        </div>
      )}
    </div>
  );
}
