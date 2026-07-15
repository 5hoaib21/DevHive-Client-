import { auth } from "@/lib/auth";
import {
  Bars,
  Bell,
  Comment,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { ChartArea, User, Users } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { BiAddToQueue } from "react-icons/bi";
import { CiSaveDown1 } from "react-icons/ci";
import { MdReport } from "react-icons/md";
import { TbAsset } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { redirect } from "next/navigation";// ✅ ActiveLink কম্পোনেন্ট ইম্পোর্ট
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
      {
        icon: User,
        label: "My Profile",
        link: "/dashboard/explorer/profile",
      },
      { icon: BiAddToQueue, label: "Add Resource", link: "/dashboard/explorer/add-resource" },
      {
        icon: TbAsset,
        label: "My Resources",
        link: "/dashboard/explorer/my-resources",
      },
      { icon: Gear, label: "Saved Resources", link: "/dashboard/explorer/saved-resources" },
      { icon: Gear, label: "My Reviews", link: "/dashboard/explorer/my-reviews" },
    ],
    publisher: [
      {
        icon: User,
        label: "My Profile",
        link: "/dashboard/publisher/profile",
      },
      { icon: BiAddToQueue, label: "Add Resource", link: "/dashboard/publisher/add-resource" },
      {
        icon: TbAsset,
        label: "My Resources",
        link: "/dashboard/publisher/my-resources",
      },
      { icon: CiSaveDown1, label: "Saved Resources", link: "/dashboard/publisher/saved-resources" },
      { icon: Comment, label: "My Reviews", link: "/dashboard/publisher/my-reviews" },
    ],
    admin: [
      {
        icon: Users,
        label: "Users Management",
        link: "/dashboard/admin/all-users",
      },
      { 
        icon: User, 
        label: "Resources Management", 
        link: "/dashboard/admin/all-resources" 
      },

      { icon: MdReport, label: "Reports", link: "/dashboard/admin/reports" },
    ],
  };

  const navItems = dashboardItems[role as keyof typeof dashboardItems];

  return (
    <Drawer>
      <Button className={"lg:hidden md:hidden sm:block"} variant="secondary">
        <Bars />
        Menu
      </Button>
      
      <nav className="flex flex-col gap-1 hidden lg:block md:block">
        {navItems.map((item: any) => (
          <ActiveLink 
            href={item.link} 
            key={item.label}
            prefetch={false}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            activeClassName="bg-blue-50 text-blue-600 shadow-sm"
            inactiveClassName="text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </ActiveLink>
        ))}
      </nav>
      
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
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default w-full"
                    activeClassName="bg-blue-50 text-blue-600 shadow-sm"
                    inactiveClassName="text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </ActiveLink>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}