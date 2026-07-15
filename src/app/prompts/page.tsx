import AllPromptsPage from "@/components/AllPromptsPage";
import FilterAndSort from "@/components/FilterAndSort";
import SearchPrompt from "@/components/SearchPrompt";
import { getAllPrompts } from "@/lib/api/prompts";

const PublicPromptsPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
    const params = await searchParams;

  const search = typeof params?.search === 'string' ? params.search : '';
  const category = typeof params?.category === 'string' ? params.category : '';
  const aiTool = typeof params?.aiTool === 'string' ? params.aiTool : '';
  const difficulty = typeof params?.difficulty === 'string' ? params.difficulty : '';
  const sort = typeof params?.sort === 'string' ? params.sort : 'latest';
  
  const prompts = await getAllPrompts({ 
    search, 
    status: 'approved',
    category,
    aiTool,
    difficulty,
    sort
  });
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Prompts</h1>
          <p className="mt-2 text-gray-600">
            Browse through our collection of {prompts?.length || 0} prompts
          </p>
        </div>
        
        <div className="mb-10 space-y-4">
          <SearchPrompt />
          <FilterAndSort />
        </div>
        
        {prompts?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No prompts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt: any) => (
              <AllPromptsPage key={prompt._id} prompt={prompt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicPromptsPage;