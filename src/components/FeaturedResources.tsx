import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Copy,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { getFeaturedResources } from '@/lib/api/prompts';

const FeaturedResources = async () => {
    const data = await getFeaturedResources();
    const prompts = Array.isArray(data) ? data : data?.prompts || [];

    if (!prompts || prompts.length === 0) {
        return (
            <section className="py-16 bg-dh-surface">
                <div className="dh-container text-center">
                    <div className="dh-empty">
                        <Sparkles className="w-12 h-12 text-gray-300" />
                        <p className="dh-empty-text font-semibold text-gray-700">No Featured Resources</p>
                        <p className="dh-empty-text">Check back soon for featured resources!</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 sm:py-20 bg-dh-surface">
            <div className="dh-container">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="dh-section-heading">Featured Resources</h2>
                        <p className="dh-section-subtitle mt-1">
                            Curated selection of the best resources from our community
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {prompts.map((prompt: any, index: number) => (
                        <FeaturedCard key={prompt._id || index} prompt={prompt} />
                    ))}
                </div>

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

const FeaturedCard = ({ prompt }: { prompt: any }) => {
    const {
        _id,
        title,
        description,
        category,
        language,
        difficulty,
        image,
        usageCount,
        createdAt,
        authorName,
    } = prompt || {};

    const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }) : 'N/A';

    const difficultyColors: Record<string, string> = {
        beginner: 'bg-emerald-100 text-emerald-700',
        intermediate: 'bg-amber-100 text-amber-700',
        advanced: 'bg-rose-100 text-rose-700'
    };

    const getDifficulty = (diff: any) => {
        return difficultyColors[diff as keyof typeof difficultyColors] || difficultyColors.beginner;
    };

    return (
        <div className="dh-card flex flex-col h-full">
            {image && (
                <div className="relative w-full h-40 overflow-hidden bg-gray-50">
                    <Image
                        src={image}
                        alt={title || 'Featured Resource'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}

            <div className="p-4 flex flex-col flex-grow">
                {authorName && (
                    <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-6 h-6 rounded-full bg-dh-teal flex items-center justify-center text-white text-[10px] font-bold">
                            {authorName.charAt(0)}
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                            {authorName}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">{formattedDate}</span>
                    </div>
                )}

                <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-1">
                    {title || 'Untitled Resource'}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2 flex-grow">
                    {description || 'No description available'}
                </p>

                <div className="flex items-center gap-1.5 mb-3">
                    {category && (
                        <span className="dh-badge dh-badge-category">
                            {category}
                        </span>
                    )}
                    {language && (
                        <span className="dh-badge dh-badge-language">
                            {language}
                        </span>
                    )}
                    {difficulty && (
                        <span className={`dh-badge ${getDifficulty(difficulty)}`}>
                            {difficulty}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-dh-border">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Copy className="w-3 h-3" />
                        {usageCount || 0}
                    </span>

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
};

export default FeaturedResources;
