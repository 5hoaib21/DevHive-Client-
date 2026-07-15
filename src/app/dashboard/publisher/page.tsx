import React from 'react';
import { Copy, Bookmark, ArrowRight, Package, Plus } from 'lucide-react';
import Link from 'next/link';
import { getPublisherAnalytics } from '@/lib/api/prompts';
import PublisherChart from '@/components/dashboard/PublisherChart';

export default async function PublisherDashboardHomePage() {
  const result = await getPublisherAnalytics();
  const analytics = result?.analytics || { totalResources: 0, totalUsage: 0, totalBookmarks: 0 };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Publisher Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Monitor your resource performance and submissions</p>
      </div>

      <div className="flex gap-5 mb-8">
        <div>
          <div className="text-3xl font-black text-gray-900">{analytics.totalResources.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-0.5">Total Resources</p>
        </div>
        <div className="w-px bg-dh-border self-stretch" />
        <div>
          <div className="text-3xl font-black text-gray-900">{analytics.totalUsage.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-0.5">Total Usage</p>
        </div>
        <div className="w-px bg-dh-border self-stretch" />
        <div>
          <div className="text-3xl font-black text-gray-900">{analytics.totalBookmarks.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-0.5">Bookmarks</p>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <Link href="/dashboard/publisher/add-resource" className="dh-btn dh-btn-primary gap-2">
          <Plus size={16} /> Add New Resource
        </Link>
        <Link href="/dashboard/publisher/my-resources" className="dh-btn dh-btn-secondary gap-2">
          <Package size={16} /> My Resources
        </Link>
      </div>

      <PublisherChart />
    </div>
  );
}
