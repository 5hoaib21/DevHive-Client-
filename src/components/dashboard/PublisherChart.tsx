"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "Jan", resources: 4 },
  { month: "Feb", resources: 7 },
  { month: "Mar", resources: 5 },
  { month: "Apr", resources: 12 },
  { month: "May", resources: 8 },
  { month: "Jun", resources: 15 },
];

export default function PublisherChart() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h4 className="text-sm font-bold text-gray-800">Monthly Submissions</h4>
      </div>
      <div className="w-full h-[280px] border-b border-dh-border pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8ECF4" />
            <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#E8ECF4", borderRadius: "10px" }} />
            <Bar dataKey="resources" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={32} name="Resources" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
