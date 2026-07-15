"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { TbPrompt } from "react-icons/tb";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FiMenu, FiX } from "react-icons/fi";
import { Home } from "lucide-react";

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.15, ease: "easeIn" as const } },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname?.startsWith(path);
  };

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/resources", label: "All Resources", icon: TbPrompt },
    { href: "/about", label: "About", icon: Home },
    { href: "/blog", label: "Blog", icon: Home },
    { href: "/contact", label: "Contact", icon: Home },
    ...(user
      ? [{ href: `/dashboard/${(user as any)?.role}`, label: "Dashboard", icon: RiDashboardHorizontalLine }]
      : []),
  ];

  return (
    <nav className={"fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b transition-shadow duration-300 " + (scrolled ? "border-[#E8ECF4] shadow-sm" : "border-[#E8ECF4]")}>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-4">
          <button
            className="rounded-lg p-2 transition-colors hover:bg-[#F1F3F9] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#1A1D26]">DevHive</span>
          </Link>
        </div>

        {/* Center: desktop nav links */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "text-[#0D9488]"
                      : "text-[#6B7280] hover:text-[#1A1D26] hover:bg-[#F1F3F9]"
                  }`}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-[5px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#0D9488]"
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: auth */}
        <div className="flex items-center gap-3">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#1A1D26] hover:bg-[#F1F3F9]"
              >
                Log in
              </Link>
              <Link href="/signup">
                <Button className="bg-[#0D9488] text-white text-sm font-semibold rounded-md px-4 py-1.5 h-auto shadow-dh-teal hover:bg-[#0F766E] transition-all duration-150 active:scale-[0.98]">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <Dropdown>
              <Dropdown.Trigger>
                <div className="cursor-pointer">
                  <Avatar size="sm" className="border-2 border-white">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name || "User"}
                      src={user?.image ?? undefined}
                    />
                    <Avatar.Fallback>
                      {user?.name?.charAt(0) || "U"}
                    </Avatar.Fallback>
                  </Avatar>
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <div className="min-w-[220px] p-2">
                  <div className="flex items-center gap-3 border-b border-[#E8ECF4] p-3">
                    <Avatar size="sm">
                      <Avatar.Image alt={user?.name} src={user?.image ?? undefined} />
                      <Avatar.Fallback delayMs={600}>
                        {user?.name?.charAt(0) || "U"}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm font-medium text-[#1A1D26]">
                        {user?.name}
                      </p>
                      <p className="truncate text-xs text-[#6B7280]">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 space-y-1">
                    <Link
                      href={`/dashboard/${(user as any)?.role}`}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[#1A1D26] transition-colors hover:bg-[#F1F3F9]"
                    >
                      <MdDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      href={`/profile`}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[#1A1D26] transition-colors hover:bg-[#F1F3F9]"
                    >
                      <CgProfile className="h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[#DC2626] transition-colors hover:bg-[#FEF2F2]"
                    >
                      <BiLogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-t border-[#E8ECF4] bg-white md:hidden shadow-lg"
          >
            <div className="space-y-1 p-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#EEF2FF] text-[#4F46E5]"
                        : "text-[#6B7280] hover:bg-[#F1F3F9]"
                    }`}
                  >
                    {link.icon && <link.icon className="h-4 w-4" />}
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-4 border-t border-[#E8ECF4] pt-4">
                {!user ? (
                  <div className="space-y-2">
                    <Link
                      href="/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-md px-3 py-2 text-center text-sm font-medium text-[#6B7280] hover:bg-[#F1F3F9]"
                    >
                      Log in
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-[#0D9488] text-white text-sm font-semibold rounded-md">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-[#FEF2F2] px-3 py-2 text-sm font-medium text-[#DC2626] hover:bg-[#FEE2E2]"
                  >
                    <BiLogOut className="h-4 w-4" />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
