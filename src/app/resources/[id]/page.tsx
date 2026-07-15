import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Copy, Sparkles, ArrowRight, Star, User } from "lucide-react";
import { getResourceById, getRelatedResources } from "@/lib/api/prompts";
import { getResourceReviews } from "@/lib/api/review";
import ResourceInteractions from "@/components/ResourceInteractions";
import AllResourcesPage from "@/components/AllResourcesPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

  const formattedDate = new Date(resource.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const difficultyColors: Record<string, string> = {
    beginner: "bg-emerald-100 text-emerald-700",
    intermediate: "bg-amber-100 text-amber-700",
    advanced: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{resource.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resource Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Image */}
              <div className="relative w-full h-64 sm:h-80">
                {resource.image ? (
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-500 to-pink-500">
                    <Sparkles className="text-white w-16 h-16" />
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-bold border px-3 py-1 rounded-full capitalize bg-blue-50 text-blue-700 border-blue-100">
                    {resource.status || "Approved"}
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

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {resource.title}
                </h1>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {resource.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {resource.category && (
                    <span className="text-xs font-medium text-black bg-orange-500/20 px-3 py-1 rounded-full">
                      {resource.category}
                    </span>
                  )}
                  {resource.language && (
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {resource.language}
                    </span>
                  )}
                  {resource.difficulty && (
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${difficultyColors[resource.difficulty as keyof typeof difficultyColors] || difficultyColors.beginner}`}>
                      {resource.difficulty}
                    </span>
                  )}
                </div>

                {/* Content / Code */}
                {resource.content && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Resource Content</h2>
                    <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm leading-relaxed whitespace-pre-wrap">
                      {resource.content}
                    </pre>
                  </div>
                )}

                {/* Author */}
                {resource.authorName && (
                  <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
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

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <ResourceInteractions
                promptId={resource._id}
                promptContent={resource.content || ""}
                rating={rating}
                totalReviews={totalReviews}
                reviews={reviews}
                bookmarks={resource.bookmarks || []}
                currentUserId={currentUserId}
                isLocked={!currentUserId}
                user={user}
              />
            </div>

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Related Resources</h2>
                  <Link
                    href="/resources"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    View All <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedResources.slice(0, 4).map((related: any) => (
                    <AllResourcesPage key={related._id} resource={related} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <span className="text-gray-800 font-medium">{resource.category || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Language</span>
                  <span className="text-gray-800 font-medium">{resource.language || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Difficulty</span>
                  <span className="text-gray-800 font-medium capitalize">{resource.difficulty || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Visibility</span>
                  <span className={`font-medium capitalize ${resource.visibility === "public" ? "text-green-600" : "text-red-400"}`}>
                    {resource.visibility || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Usage Count</span>
                  <span className="text-gray-800 font-medium">{resource.usageCount || 0}</span>
                </div>
              </div>
            </div>

            {/* Rating Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Rating</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900">{rating ? Number(rating).toFixed(1) : "0.0"}</span>
              </div>
              <p className="text-sm text-gray-500">{totalReviews} {totalReviews === 1 ? "review" : "reviews"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailPage;
