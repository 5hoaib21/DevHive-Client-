'use client';

import { useState } from 'react';
import { Menu, X, Terminal, User, Users, LayoutDashboard } from 'lucide-react';
import { BiAddToQueue } from 'react-icons/bi';
import { CiSaveDown1 } from 'react-icons/ci';
import { MdReport } from 'react-icons/md';
import { TbAsset } from 'react-icons/tb';
import { Comment, Gear } from '@gravity-ui/icons';
import ActiveLink from '../ActiveLink';

interface NavItem {
  icon: string;
  label: string;
  link: string;
}

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

export default function MobileNav({ navItems, role, userName, userAvatar }: { navItems: NavItem[]; role: string; userName: string; userAvatar: string }) {
  const [open, setOpen] = useState(false);

  const themeColors: Record<string, string> = {
    explorer: 'text-dh-teal',
    publisher: 'text-dh-indigo',
    admin: 'text-dh-orange',
  };

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(true)} className="fixed top-4 left-4 z-50 w-9 h-9 rounded-md bg-[#F1F3F9] border border-dh-border flex items-center justify-center text-gray-600">
        <Menu size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-[#1A1D26]/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="relative w-64 h-full bg-[#1A1D26] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-dh-teal" />
                <span className="text-white font-bold text-base">DevHive</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 py-4 px-3 space-y-1">
              {navItems.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <ActiveLink
                    href={item.link}
                    key={item.label}
                    prefetch={false}
                    onClick={() => setOpen(false)}
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
                <div className="w-8 h-8 rounded-full bg-dh-teal flex items-center justify-center text-white text-xs font-bold shrink-0">{userAvatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate font-medium">{userName}</p>
                  <p className={'text-xs capitalize ' + themeColors[role as keyof typeof themeColors]}>{role}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
