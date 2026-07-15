"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const easeOut = [0.16, 1, 0.3, 1] as const;

const ALL_TAGS = [
  "JavaScript", "TypeScript", "Python", "React",
  "Docker"
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

export default function Banner() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingTags, setTrendingTags] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...ALL_TAGS].sort(() => 0.5 - Math.random());
    setTrendingTags(shuffled.slice(0, 4));
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const encodedQuery = encodeURIComponent(searchQuery.trim());
    router.push(`/resources?search=${encodedQuery}`);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    const encodedQuery = encodeURIComponent(tag);
    router.push(`/resources?search=${encodedQuery}`);
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-100">
      <div className="dh-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 sm:py-20 lg:py-24">
          {/* Left: Content */}
          <motion.div
            className="max-w-xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={fadeSlideUp} className="text-4xl sm:text-5xl lg:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
              Discover & Share{" "}
              <span className="text-dh-teal">Developer Resources</span>
            </motion.h1>

            <motion.p variants={fadeSlideUp} className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
              Skip the guesswork. Access community-vetted code snippets, configs, and templates for your next project.
            </motion.p>

            <motion.form variants={fadeSlideUp} onSubmit={handleSearchSubmit} className="mt-8">
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-dh-border focus-within:border-dh-teal focus-within:ring-2 focus-within:ring-teal-100 transition-all">
                <div className="pl-3 text-gray-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search code snippets, configs, templates..."
                  className="flex-1 py-2.5 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="dh-btn dh-btn-primary"
                >
                  Search
                </button>
              </div>
            </motion.form>

            <motion.div variants={fadeSlideUp} className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-400">Trending:</span>
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-2.5 py-1 rounded-sm border border-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </motion.div>

            <motion.div variants={fadeSlideUp} className="mt-10">
              <Link
                href="/resources"
                className="dh-btn dh-btn-primary gap-2"
              >
                Explore Resources
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Terminal Mockup */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
          >
            <div className="bg-[#1A1D26] rounded-xl border border-gray-700/30 overflow-hidden shadow-2xl">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-[#252830] border-b border-gray-700/30">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-gray-500 ml-2 font-mono">bash — devhive@cli:~/resources</span>
              </div>
              <div className="p-5 font-mono text-sm leading-relaxed space-y-1">
                <p><span className="text-green-400">$</span> <span className="text-gray-200">git clone devhive/resources</span></p>
                <p className="text-gray-400">Cloning into &apos;resources&apos;...</p>
                <p className="text-gray-400">remote: Counting objects: 5000, done.</p>
                <p className="text-gray-400">Receiving objects: 100% (5000/5000), 12.5 MiB | 2.3 MiB/s, done.</p>
                <p className="mt-3"><span className="text-green-400">$</span> <span className="text-gray-200">npm start</span></p>
                <p className="text-cyan-300">&gt; devhive@1.0.0 start</p>
                <p className="text-gray-200">✓ Ready on <span className="text-dh-teal">http://localhost:3000</span></p>
                <p className="text-gray-400">&gt; 5000+ resources loaded</p>
                <p className="text-gray-500 animate-pulse mt-2">█</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
