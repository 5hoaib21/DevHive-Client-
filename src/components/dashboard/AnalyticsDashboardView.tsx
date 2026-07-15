"use client";

import React from "react";
import { TrendingUp, PieChart as PieIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0D9488", "#4F46E5", "#059669", "#D97706", "#EA580C"];

export default function AnalyticsDashboardView({ stats, languageData }: { stats: any; languageData: any }) {
  const distributionData = (languageData || []).map((item: any) => ({
    name: item.name,
    value: item.Resources
  })).filter((item: any) => item.value > 0);

  const statItems = [
    { label: "Total Users", value: stats.totalUsers },
    { label: "Total Resources", value: stats.totalResources },
    { label: "Total Reviews", value: stats.totalReviews },
    { label: "Total Usage", value: stats.totalUsage },
  ];

  return (
    <>
      <div className="flex gap-5 mb-8 flex-wrap">
        {statItems.map((item) => (
          <div key={item.label}>
            <div className="text-3xl font-black text-gray-900">{item.value.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </div>
        ))}
        {statItems.length < 5 && <div className="w-px bg-dh-border self-stretch" />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-gray-400" />
            <h4 className="text-sm font-bold text-gray-800">Language Resource Distribution</h4>
          </div>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={languageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8ECF4" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#E8ECF4", borderRadius: "10px" }} />
                <Bar dataKey="Usage" fill="#0D9488" radius={[4, 4, 0, 0]} barSize={26} name="Total Usage" />
                <Bar dataKey="Resources" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={26} name="Total Resources" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <PieIcon size={16} className="text-gray-400" />
            <h4 className="text-sm font-bold text-gray-800">Resource Distribution</h4>
          </div>
          <div className="w-full h-[260px] flex items-center justify-center">
            {distributionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                    {distributionData.map((entry: any, index: number) => (
                      <Cell key={'cell-' + index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#E8ECF4", borderRadius: "10px" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-gray-400">No resource data available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
