import React from 'react';
import { Code2, ArrowRight, Star, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getTopPublishers } from '@/lib/api/topCreators';

interface Creator {
  _id: string;
  authorName: string;
  authorEmail: string;
  authorImage: string;
  totalResources: number;
}

const testimonials = [
  "DevHive transformed how I share and discover code resources. The community is incredible.",
  "The quality of resources on DevHive is unmatched. Every snippet is production-ready.",
];

export default async function TopPublishers() {
  const creators = await getTopPublishers();

  if (!creators || creators.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-dh-surface">
      <div className="dh-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="dh-section-heading">Top Publishers</h2>
            <p className="dh-section-subtitle mt-1">The masterminds behind trending resources</p>
          </div>
          <Link
            href="/creators"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-dh-teal hover:text-dh-teal-dark transition-colors"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Ranked List */}
          <div className="space-y-3">
            {creators.slice(0, 5).map((creator: Creator, index: number) => (
              <Link
                key={creator._id}
                href={`/creators/${creator._id}`}
                className="dh-card dh-card-hover flex items-center gap-4 p-4"
              >
                <span className="text-lg font-black text-gray-300 w-6 text-center shrink-0">
                  {index + 1}
                </span>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-dh-border">
                  {creator.authorImage && (
                    <Image
                      src={creator.authorImage}
                      alt={creator.authorName || "Creator"}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-gray-900 truncate">
                    {creator.authorName || "Anonymous"}
                  </h4>
                  <p className="text-xs text-gray-400">
                    @{creator.authorEmail ? creator.authorEmail.split('@')[0] : 'creator'}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Code2 size={13} className="text-dh-teal" />
                  <span className="font-semibold text-gray-700">{creator.totalResources}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Right: Testimonials */}
          <div className="space-y-4">
            {testimonials.map((text, i) => (
              <div key={i} className="dh-card p-6">
                <Quote size={20} className="text-dh-teal/30 mb-2" />
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className="text-dh-star fill-dh-star" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
