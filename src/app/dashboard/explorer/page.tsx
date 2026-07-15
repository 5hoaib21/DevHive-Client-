import React from 'react';
import { Bookmark, MessageSquare, Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getExplorerAnalytics } from '@/lib/api/prompts';

export default async function ExplorerDashboardHomePage() {
    const result = await getExplorerAnalytics();
    const analytics = result?.analytics || { totalBookmarks: 0, totalReviews: 0 };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900">Explorer Dashboard</h1>
                <p className="text-sm text-gray-500 mt-0.5">Track your saved resources and community activity</p>
            </div>

            <div className="flex gap-5 mb-8">
                <div>
                    <div className="text-3xl font-black text-gray-900">{analytics.totalBookmarks.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-0.5">Bookmarked Resources</p>
                </div>
                <div className="w-px bg-dh-border self-stretch" />
                <div>
                    <div className="text-3xl font-black text-gray-900">{analytics.totalReviews.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-0.5">Reviews Given</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Link href="/resources" className="dh-card dh-card-hover p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0"><Compass className="w-5 h-5 text-dh-teal" /></div>
                    <div><p className="text-sm font-semibold text-gray-900">Browse Resources</p><p className="text-xs text-gray-500">Explore the library</p></div>
                </Link>
                <Link href="/dashboard/explorer/saved-resources" className="dh-card dh-card-hover p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0"><Bookmark className="w-5 h-5 text-dh-indigo" /></div>
                    <div><p className="text-sm font-semibold text-gray-900">My Saved</p><p className="text-xs text-gray-500">View bookmarks</p></div>
                </Link>
                <Link href="/dashboard/explorer/my-reviews" className="dh-card dh-card-hover p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0"><MessageSquare className="w-5 h-5 text-dh-orange" /></div>
                    <div><p className="text-sm font-semibold text-gray-900">My Reviews</p><p className="text-xs text-gray-500">View feedback</p></div>
                </Link>
            </div>
        </div>
    );
}
