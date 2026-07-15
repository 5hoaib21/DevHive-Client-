import { auth } from "@/lib/auth";
import {
  Bars,
  Comment,
  Gear,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { User, Users } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { BiAddToQueue } from "react-icons/bi";
import { CiSaveDown1 } from "react-icons/ci";
import { MdReport } from "react-icons/md";
import { TbAsset } from "react-icons/tb";
import { redirect } from "next/navigation";
import ActiveLink from "../ActiveLink";

export async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session?.user;
  if(!user){
    redirect('/signin')
  }
  const role = (user as any)?.role || 'explorer';
  
  const dashboardItems = {
    explorer: [
      { icon: User, label: "My Profile", link: "/dashboard/explorer/profile" },
      { icon: BiAddToQueue, label: "Add Resource", link: "/dashboard/explorer/add-resource" },
      { icon: TbAsset, label: "My Resources", link: "/dashboard/explorer/my-resources" },
      { icon: Gear, label: "Saved Resources", link: "/dashboard/explorer/saved-resources" },
      { icon: Gear, label: "My Reviews", link: "/dashboard/explorer/my-reviews" },
    ],
    publisher: [
      { icon: User, label: "My Profile", link: "/dashboard/publisher/profile" },
      { icon: BiAddToQueue, label: "Add Resource", link: "/dashboard/publisher/add-resource" },
      { icon: TbAsset, label: "My Resources", link: "/dashboard/publisher/my-resources" },
      { icon: CiSaveDown1, label: "Saved Resources", link: "/dashboard/publisher/saved-resources" },
      { icon: Comment, label: "My Reviews", link: "/dashboard/publisher/my-reviews" },
    ],
    admin: [
      { icon: Users, label: "Users Management", link: "/dashboard/admin/all-users" },
      { icon: User, label: "Resources Management", link: "/dashboard/admin/all-resources" },
      { icon: MdReport, label: "Reports", link: "/dashboard/admin/reports" },
    ],
  };

  const navItems = dashboardItems[role as keyof typeof dashboardItems];

  return (
    <>
      {/* Mobile trigger */}
      <Drawer>
        <Button className="lg:hidden md:hidden sm:block bg-[#F1F3F9] border border-[#E8ECF4] rounded-md text-sm h-9 px-3">
          <Bars />
          Menu
        </Button>
        
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item: any) => (
                    <ActiveLink 
                      href={item.link} 
                      key={item.label}
                      prefetch={false}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#9CA3AF] transition-colors hover:bg-white/5 hover:text-white w-full"
                      activeClassName="bg-white/10 text-white font-semibold border-l-2 border-[#0D9488] rounded-l-none"
                      inactiveClassName="text-[#9CA3AF] hover:bg-white/5 hover:text-white"
                    >
                      <item.icon className="size-5" />
                      {item.label}
                    </ActiveLink>
                  ))}
                </nav>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-56 min-h-screen bg-[#1A1D26] fixed left-0 top-14">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
          <span className="text-white font-bold text-base">DevHive</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item: any) => (
            <ActiveLink 
              href={item.link} 
              key={item.label}
              prefetch={false}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors"
              activeClassName="bg-white/10 text-white font-semibold border-l-2 border-[#0D9488] rounded-l-none"
              inactiveClassName="text-[#9CA3AF] hover:bg-white/5 hover:text-white"
            >
              <item.icon className="size-5" />
              {item.label}
            </ActiveLink>
          ))}
        </nav>

        {/* Bottom: user info */}
        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#0D9488] flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{user?.name}</p>
              <p className="text-xs text-[#6B7280] truncate">{role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
