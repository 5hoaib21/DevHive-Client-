// components/ActiveLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  exact?: boolean;
  [key: string]: unknown;
}

const ActiveLink = ({
  href,
  children,
  className = "",
  activeClassName = "",
  inactiveClassName = "",
  exact = false,
  ...props
}: ActiveLinkProps) => {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname?.startsWith(href);

  const combinedClassName = `${className} ${isActive ? activeClassName : inactiveClassName}`;

  return (
    <Link href={href} className={combinedClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;