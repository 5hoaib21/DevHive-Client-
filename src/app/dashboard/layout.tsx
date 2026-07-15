import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex">
        <DashboardSidebar />
        <main className="m-10"> {children}</main>
      </div>
    </div>
  );
}