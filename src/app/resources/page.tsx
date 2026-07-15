import AllResourcesPage from '@/components/AllResourcesPage';
import FilterAndSort from '@/components/FilterAndSort';
import SearchResource from '@/components/SearchResource';
import { getAllResources } from '@/lib/api/prompts';
import Link from 'next/link';

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

  const buildHref = (p: number) => {
    const sp = new URLSearchParams();
    if (search) sp.set('search', search);
    if (category) sp.set('category', category);
    if (language) sp.set('language', language);
    if (difficulty) sp.set('difficulty', difficulty);
    if (sort !== 'latest') sp.set('sort', sort);
    sp.set('page', String(p));
    return '/resources?' + sp.toString();
  };

  return (
    <div className="min-h-screen bg-dh-surface pt-20 pb-12">
      <div className="dh-container">
        <div className="mb-8">
          <h1 className="dh-section-heading">All Resources</h1>
          <p className="dh-section-subtitle mt-1">
            Browse through our collection of {resources?.length || 0} resources
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <SearchResource />
          <FilterAndSort />
        </div>

        {resources?.length === 0 ? (
          <div className="dh-empty border-2 border-dashed border-dh-border rounded-xl">
            <div className="text-3xl text-gray-300">:(</div>
            <p className="dh-empty-text font-semibold text-gray-700">No resources found</p>
            <p className="dh-empty-text">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {resources.map((resource: any) => (
              <AllResourcesPage key={resource._id} resource={resource} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {currentPage > 1 ? (
              <Link href={buildHref(currentPage - 1)} className="dh-btn dh-btn-secondary text-xs">
                Previous
              </Link>
            ) : (
              <span className="dh-btn dh-btn-ghost text-xs text-gray-400 cursor-not-allowed">Previous</span>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={buildHref(p)}
                className={
                  'dh-btn text-xs min-w-[36px] px-0 ' +
                  (p === currentPage ? 'dh-btn-primary' : 'dh-btn-secondary')
                }
              >
                {p}
              </Link>
            ))}

            {currentPage < totalPages ? (
              <Link href={buildHref(currentPage + 1)} className="dh-btn dh-btn-secondary text-xs">
                Next
              </Link>
            ) : (
              <span className="dh-btn dh-btn-ghost text-xs text-gray-400 cursor-not-allowed">Next</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicResourcesPage;
