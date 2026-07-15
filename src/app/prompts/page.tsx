import AllResourcesPage from "@/components/AllPromptsPage";
import FilterAndSort from "@/components/FilterAndSort";
import SearchResource from "@/components/SearchPrompt";
import { getAllResources } from "@/lib/api/prompts";

const PublicResourcesPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
    const params = await searchParams;

  const search = typeof params?.search === 'string' ? params.search : '';
  const category = typeof params?.category === 'string' ? params.category : '';
  const language = typeof params?.language === 'string' ? params.language : '';
  const difficulty = typeof params?.difficulty === 'string' ? params.difficulty : '';
  const sort = typeof params?.sort === 'string' ? params.sort : 'latest';
  const page = typeof params?.page === 'string' ? params.page : '1';
  
  const result = await getAllResources({ 
    search, 
    status: 'approved',
    category,
    language,
    difficulty,
    sort,
    page,
    limit: '12'
  });
  
  const resources = result?.data || result || [];
  const totalPages = result?.totalPages || 1;
  const currentPage = result?.page || 1;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Resources</h1>
          <p className="mt-2 text-gray-600">
            Browse through our collection of {resources?.length || 0} resources
          </p>
        </div>
        
        <div className="mb-10 space-y-4">
          <SearchResource />
          <FilterAndSort />
        </div>
        
        {resources?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No resources found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource: any) => (
              <AllResourcesPage key={resource._id} resource={resource} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {currentPage > 1 && (
              <a href={`/resources?page=${currentPage - 1}&search=${search}&category=${category}&language=${language}&difficulty=${difficulty}&sort=${sort}`} className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                Previous
              </a>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a key={p} href={`/resources?page=${p}&search=${search}&category=${category}&language=${language}&difficulty=${difficulty}&sort=${sort}`} className={`px-3 py-2 rounded-lg text-sm ${p === currentPage ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'}`}>
                {p}
              </a>
            ))}
            {currentPage < totalPages && (
              <a href={`/resources?page=${currentPage + 1}&search=${search}&category=${category}&language=${language}&difficulty=${difficulty}&sort=${sort}`} className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                Next
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicResourcesPage;
