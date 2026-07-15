import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Copy, ArrowRight, Star } from 'lucide-react';
import { getResourceById, getRelatedResources } from '@/lib/api/prompts';
import { getResourceReviews } from '@/lib/api/review';
import ResourceInteractions from '@/components/ResourceInteractions';
import AllResourcesPage from '@/components/AllResourcesPage';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const ResourceDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const [resourceData, reviewsData, relatedData] = await Promise.all([
    getResourceById(id).catch(() => null),
    getResourceReviews(id),
    getRelatedResources(id),
  ]);

  if (!resourceData) {
    notFound();
  }

  const resource = resourceData?.data || resourceData?.resource || resourceData;
  const reviews = reviewsData?.reviews || reviewsData?.data || [];
  const totalReviews = reviewsData?.totalReviews || reviews.length;
  const rating = reviewsData?.rating || resource?.rating || 0;
  const relatedResources = relatedData?.data || relatedData?.resources || [];

  const session = await auth.api.getSession({ headers: await headers() });
  const currentUserId = session?.user?.id || null;
  const user = session?.user || null;

  const formattedDate = new Date(resource.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-dh-surface pt-20 pb-12">
      <div className="dh-container">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href='/' className='hover:text-dh-teal transition-colors'>Home</Link>
          <span>/</span>
          <Link href='/resources' className='hover:text-dh-teal transition-colors'>Resources</Link>
          <span>/</span>
          <span className='text-gray-900 font-medium truncate max-w-[200px]'>{resource.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="dh-card">
              {resource.image && (
                <div className="relative w-full h-56 sm:h-72 bg-gray-50">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover"
                    sizes='(max-width: 1024px) 100vw, 66vw'
                  />
                </div>
              )}

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="dh-badge dh-badge-status-approved">
                    {resource.status || 'Approved'}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={14} />
                    {formattedDate}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Copy size={14} />
                    {resource.usageCount || 0} uses
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {resource.title}
                </h1>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {resource.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {resource.category && (
                    <span className="dh-badge dh-badge-category">{resource.category}</span>
                  )}
                  {resource.language && (
                    <span className="dh-badge dh-badge-language">{resource.language}</span>
                  )}
                  {resource.difficulty && (
                    <span className="dh-badge dh-badge-difficulty capitalize">{resource.difficulty}</span>
                  )}
                </div>

                {/* VSCode-style code block */}
                {resource.content && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Resource Content</h2>
                    <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-gray-700/30">
                      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#252526] border-b border-gray-700/30">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="text-xs text-gray-500 ml-2 font-mono">resource.{resource.language || 'txt'}</span>
                      </div>
                      <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono text-gray-200 whitespace-pre-wrap">
                        {resource.content}
                      </pre>
                    </div>
                  </div>
                )}

                {resource.authorName && (
                  <div className="flex items-center gap-3 pt-6 border-t border-dh-border">
                    <div className="w-10 h-10 rounded-full bg-dh-teal flex items-center justify-center text-white font-bold text-sm">
                      {resource.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{resource.authorName}</p>
                      <p className="text-xs text-gray-400">Creator</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="dh-card p-6 sm:p-8">
              <ResourceInteractions
                promptId={resource._id}
                promptContent={resource.content || ''}
                rating={rating}
                totalReviews={totalReviews}
                reviews={reviews}
                bookmarks={resource.bookmarks || []}
                currentUserId={currentUserId}
                isLocked={!currentUserId}
                user={user}
              />
            </div>

            {relatedResources.length > 0 && (
              <div className="dh-card p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Related Resources</h2>
                  <Link
                    href='/resources'
                    className="text-sm font-semibold text-dh-teal hover:text-dh-teal-dark flex items-center gap-1"
                  >
                    View All <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {relatedResources.slice(0, 4).map((related: any) => (
                    <AllResourcesPage key={related._id} resource={related} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Sticky */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="dh-card p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="text-gray-800 font-medium">{resource.category || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Language</span>
                    <span className="text-gray-800 font-medium">{resource.language || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Difficulty</span>
                    <span className="text-gray-800 font-medium capitalize">{resource.difficulty || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Visibility</span>
                    <span className={'font-medium capitalize ' + (resource.visibility === 'public' ? 'text-dh-success' : 'text-dh-danger')}>
                      {resource.visibility || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Usage Count</span>
                    <span className="text-gray-800 font-medium">{resource.usageCount || 0}</span>
                  </div>
                </div>
              </div>

              <div className="dh-card p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4">Rating</h3>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={star <= Math.round(rating) ? 'text-dh-star fill-dh-star' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-gray-900">{rating ? Number(rating).toFixed(1) : '0.0'}</span>
                </div>
                <p className="text-sm text-gray-500">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailPage;
