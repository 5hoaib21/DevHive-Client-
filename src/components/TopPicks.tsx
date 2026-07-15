import React from 'react';
import Link from 'next/link';
import { Copy, Sparkles, ArrowRight, Star } from 'lucide-react';
import { getAllResources } from '@/lib/api/prompts';

const difficultyColors: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-rose-100 text-rose-700',
};

const TopPicks = async () => {
  const raw = await getAllResources({ sort: 'most_used', limit: '4' });
  const resources = Array.isArray(raw) ? raw : raw?.data ?? [];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="dh-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="dh-section-heading">Top Picks This Week</h2>
            <p className="dh-section-subtitle mt-1">
              Most-used resources by the DevHive community
            </p>
          </div>
          <Link
            href="/resources"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-dh-teal hover:text-dh-teal-dark transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {resources.length === 0 ? (
          <div className="dh-empty border-2 border-dashed border-dh-border rounded-xl">
            <Sparkles className="w-12 h-12 text-gray-300" />
            <p className="dh-empty-text font-semibold text-gray-700">No Top Picks Yet</p>
            <p className="dh-empty-text">Check back soon for trending resources!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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

              return (
                <div
                  key={_id}
                  className="dh-card flex flex-col h-full"
                >
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-1">
                      {title ?? 'Untitled Resource'}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2 flex-grow">
                      {description ?? 'No description available.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      {language && (
                        <span className="dh-badge dh-badge-language">
                          {language}
                        </span>
                      )}
                      {difficulty && (
                        <span className={`dh-badge ${diffClass}`}>
                          {difficulty}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-dh-border">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          {usageCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-dh-star fill-dh-star" />
                          {rating ? Number(rating).toFixed(1) : '0.0'}
                        </span>
                      </div>

                      <Link
                        href={`/resources/${_id}`}
                        className="text-xs font-semibold text-dh-teal hover:text-dh-teal-dark transition-colors flex items-center gap-1"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
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
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-dh-teal hover:text-dh-teal-dark transition-colors"
          >
            View All Resources
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopPicks;
