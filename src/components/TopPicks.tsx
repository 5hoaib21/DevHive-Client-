import React from 'react';
import Link from 'next/link';
import { Star, Copy, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { getAllResources } from '@/lib/api/prompts';

const difficultyColors: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-rose-100 text-rose-700',
};

const difficultyLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const TopPicks = async () => {
  const raw = await getAllResources({ sort: 'most_used', limit: '4' });
  const resources = Array.isArray(raw) ? raw : raw?.data ?? [];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 text-violet-700 text-xs font-semibold mb-3">
              <Zap className="w-4 h-4" />
              Top Picks
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Top Picks{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                This Week
              </span>
            </h2>
            <p className="text-gray-500 mt-2">
              Most-used resources by the DevHive community
            </p>
          </div>
          <Link
            href="/resources"
            className="hidden sm:inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {resources.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-200 text-center">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Top Picks Yet</h3>
            <p className="text-gray-400">Check back soon for trending resources!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.slice(0, 4).map((resource: any) => {
              const {
                _id,
                title,
                description,
                language,
                difficulty,
                usageCount = 0,
                rating = 0,
              } = resource ?? {};

              const diffKey = difficulty?.toLowerCase() ?? 'beginner';
              const diffClass = difficultyColors[diffKey] ?? difficultyColors.beginner;
              const diffLabel = difficultyLabels[diffKey] ?? difficultyLabels.beginner;

              return (
                <div
                  key={_id}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-200 flex flex-col h-full"
                >
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-violet-600 transition-colors duration-300">
                      {title ?? 'Untitled Resource'}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                      {description ?? 'No description available.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {language && (
                        <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-100">
                          {language}
                        </span>
                      )}
                      {difficulty && (
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${diffClass}`}>
                          {diffLabel}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          {usageCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          {rating ? rating.toFixed(1) : '0.0'}
                        </span>
                      </div>

                      <Link
                        href={`/resources/${_id}`}
                        className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 font-medium text-sm group/btn transition-colors duration-300"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group"
          >
            View All Resources
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopPicks;
