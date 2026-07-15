"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer className="w-full bg-[#1A1D26] text-[#9CA3AF]">
      <motion.div
        ref={ref}
        className="mx-auto max-w-7xl px-6 py-12 md:py-16"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      >
        {/* Top: brand row */}
        <div className="max-w-lg">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="text-lg font-bold text-white transition-colors group-hover:text-dh-teal">DevHive</span>
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
              <li><Link href="/resources" className="text-sm text-[#6B7280] hover:text-white transition-all duration-150 hover:translate-x-0.5 inline-block">All Resources</Link></li>
              <li><Link href="/about" className="text-sm text-[#6B7280] hover:text-white transition-all duration-150 hover:translate-x-0.5 inline-block">About</Link></li>
              <li><Link href="/blog" className="text-sm text-[#6B7280] hover:text-white transition-all duration-150 hover:translate-x-0.5 inline-block">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/contact" className="text-sm text-[#6B7280] hover:text-white transition-all duration-150 hover:translate-x-0.5 inline-block">Contact</Link></li>
              <li><Link href="/guidelines" className="text-sm text-[#6B7280] hover:text-white transition-all duration-150 hover:translate-x-0.5 inline-block">Guidelines</Link></li>
              <li><Link href="/publishers" className="text-sm text-[#6B7280] hover:text-white transition-all duration-150 hover:translate-x-0.5 inline-block">Publishers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-sm text-[#6B7280] hover:text-white transition-all duration-150 hover:translate-x-0.5 inline-block">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-[#6B7280] hover:text-white transition-all duration-150 hover:translate-x-0.5 inline-block">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-sm text-[#6B7280] hover:text-white transition-all duration-150 hover:translate-x-0.5 inline-block">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-[#6B7280]">
          &copy; {currentYear} DevHive. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}
