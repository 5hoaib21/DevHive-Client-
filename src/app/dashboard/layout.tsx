import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F9FC] pt-14">
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 md:ml-56 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
