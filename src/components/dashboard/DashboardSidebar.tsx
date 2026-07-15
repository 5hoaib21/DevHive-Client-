import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import ActiveLink from "../ActiveLink";
import { User, Users, Terminal, LayoutDashboard } from "lucide-react";
import { BiAddToQueue } from "react-icons/bi";
import { CiSaveDown1 } from "react-icons/ci";
import { MdReport } from "react-icons/md";
import { TbAsset } from "react-icons/tb";
import { Comment, Gear } from "@gravity-ui/icons";
import MobileNav from "./MobileNav";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  profile: User,
  addResource: BiAddToQueue,
  myResources: TbAsset,
  savedResources: Gear,
  savedResourcesPublisher: CiSaveDown1,
  myReviews: Comment,
  dashboard: LayoutDashboard,
  usersManagement: Users,
  resourcesManagement: TbAsset,
  reports: MdReport,
};

export async function DashboardSidebar() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) redirect('/signin');
  const role = (user as any)?.role || 'explorer';

  const dashboardItems: Record<string, { icon: string; label: string; link: string }[]> = {
    explorer: [
      { icon: "profile", label: "My Profile", link: "/dashboard/explorer/profile" },
      { icon: "addResource", label: "Add Resource", link: "/dashboard/explorer/add-resource" },
      { icon: "myResources", label: "My Resources", link: "/dashboard/explorer/my-resources" },
      { icon: "savedResources", label: "Saved Resources", link: "/dashboard/explorer/saved-resources" },
      { icon: "myReviews", label: "My Reviews", link: "/dashboard/explorer/my-reviews" },
    ],
    publisher: [
      { icon: "profile", label: "My Profile", link: "/dashboard/publisher/profile" },
      { icon: "addResource", label: "Add Resource", link: "/dashboard/publisher/add-resource" },
      { icon: "myResources", label: "My Resources", link: "/dashboard/publisher/my-resources" },
      { icon: "savedResourcesPublisher", label: "Saved Resources", link: "/dashboard/publisher/saved-resources" },
      { icon: "myReviews", label: "My Reviews", link: "/dashboard/publisher/my-reviews" },
    ],
    admin: [
      { icon: "usersManagement", label: "Users Management", link: "/dashboard/admin/all-users" },
      { icon: "resourcesManagement", label: "Resources Management", link: "/dashboard/admin/all-resources" },
      { icon: "reports", label: "Reports", link: "/dashboard/admin/reports" },
    ],
  };

  const navItems = dashboardItems[role as keyof typeof dashboardItems];

  const themeColors: Record<string, string> = {
    explorer: 'text-dh-teal',
    publisher: 'text-dh-indigo',
    admin: 'text-dh-orange',
  };

  return (
    <>
      <MobileNav navItems={navItems} role={role} userName={user?.name || ''} userAvatar={user?.name?.charAt(0) || 'U'} />

      <aside className="hidden md:flex md:flex-col w-56 min-h-screen bg-[#1A1D26] fixed left-0 top-14 z-30">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
          <Terminal className="w-5 h-5 text-dh-teal" />
          <span className="text-white font-bold text-base">DevHive</span>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <ActiveLink
                href={item.link}
                key={item.label}
                prefetch={false}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-150"
                activeClassName="bg-white/10 text-white font-semibold border-l-2 border-dh-teal rounded-l-none"
                inactiveClassName="text-[#9CA3AF] hover:bg-white/5 hover:text-white"
              >
                {Icon && <Icon className="size-5 shrink-0" />}
                <span className="truncate">{item.label}</span>
              </ActiveLink>
            );
          })}
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-dh-teal flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate font-medium">{user?.name}</p>
              <p className={'text-xs capitalize ' + themeColors[role as keyof typeof themeColors]}>{role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
