import AnalyticsDashboardView from "@/components/dashboard/AnalyticsDashboardView";
import { getAdminAnalyticsAction } from "@/lib/api/analytics";
import React from "react";

const AdminAnalyticsPage = async () => {
  const analyticsData = await getAdminAnalyticsAction();
  const defaultStats = { totalUsers: 0, totalResources: 0, totalReviews: 0, totalUsage: 0 };
  const stats = analyticsData?.stats || defaultStats;
  const languageData = analyticsData?.languageData || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Platform analytics and management overview</p>
      </div>
      <AnalyticsDashboardView stats={stats} languageData={languageData} />
    </div>
  );
};

export default AdminAnalyticsPage;
