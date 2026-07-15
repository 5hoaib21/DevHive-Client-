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
    <div className="bg-zinc-50/50 rounded-3xl p-6 border border-zinc-100">
      <h4 className="text-sm font-bold text-zinc-800 mb-4">Monthly Submissions</h4>
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F5" />
            <XAxis dataKey="month" stroke="#A1A1AA" fontSize={12} tickLine={false} />
            <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#E4E4E7", borderRadius: "12px" }} />
            <Bar dataKey="resources" fill="#006FEE" radius={[6, 6, 0, 0]} barSize={32} name="Resources" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
