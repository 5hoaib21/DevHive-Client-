"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1A1D26] text-[#9CA3AF]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Top: brand row */}
        <div className="max-w-lg">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-lg font-bold text-white">DevHive</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            A community-driven platform for developers to share, discover, and reuse
            code snippets, configs, and dev resources.
          </p>
        </div>

        {/* Bottom: link columns */}
        <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Resources</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/resources" className="text-sm text-[#6B7280] hover:text-white transition-colors">All Resources</Link></li>
              <li><Link href="/about" className="text-sm text-[#6B7280] hover:text-white transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-sm text-[#6B7280] hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/contact" className="text-sm text-[#6B7280] hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/guidelines" className="text-sm text-[#6B7280] hover:text-white transition-colors">Guidelines</Link></li>
              <li><Link href="/publishers" className="text-sm text-[#6B7280] hover:text-white transition-colors">Publishers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-sm text-[#6B7280] hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-[#6B7280] hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-sm text-[#6B7280] hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-[#6B7280]">
          &copy; {currentYear} DevHive. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
