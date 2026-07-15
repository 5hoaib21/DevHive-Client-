import type { Metadata } from "next";
import {
  BookOpen,
  Users,
  RefreshCw,
  Code,
  Globe,
  ArrowRight,
  Terminal,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "DevHive is a community-driven platform for developers to share, discover, and reuse code snippets, configs, and development resources.",
};

const stats = [
  { number: "12K+", label: "Resources" },
  { number: "8K+", label: "Developers" },
  { number: "50+", label: "Languages & Frameworks" },
  { number: "45K+", label: "Copies & Reuses" },
];

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Curated Resources",
    description:
      "Every resource is hand-picked and reviewed by experienced developers to ensure quality and relevance.",
    bgClass: "bg-blue-50",
    iconClass: "text-blue-600",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Vetted",
    description:
      "Resources are upvoted, reviewed, and tested by a global community of developers who value quality.",
    bgClass: "bg-teal-50",
    iconClass: "text-dh-teal",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Easy to Reuse",
    description:
      "One-click copy, clear documentation, and standardized formats make integrating resources effortless.",
    bgClass: "bg-emerald-50",
    iconClass: "text-emerald-600",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Always Free",
    description:
      "DevHive remains completely free for all developers. No paywalls, no premium tiers � just pure community sharing.",
    bgClass: "bg-amber-50",
    iconClass: "text-amber-600",
  },
];

const AboutPage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-20 sm:py-24">
        <div className="dh-container text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Empowering Developers to{" "}
            <span className="text-dh-teal">Share & Grow</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            DevHive is a free, community-driven platform where developers share
            production-ready code snippets, configuration files, and templates.
            We believe the best resources come from real developers solving real
            problems.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-24 bg-dh-surface">
        <div className="dh-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                Born from a{" "}
                <span className="text-dh-teal">Developer Need</span>
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  DevHive started in early 2025 when a group of developers grew
                  frustrated with scattered, low-quality code resources across
                  the web. Too many gated communities, outdated snippets, and
                  copy-paste traps.
                </p>
                <p>
                  We realized the developer community needed a single,
                  well-organized hub where anyone could share and discover
                  reusable resources � without paywalls, ads, or noise.
                </p>
                <p>
                  What began as a small collection of config files and CLI
                   snippets has grown into a thriving library spanning 50+
                    programming languages, frameworks, and tools -- all curated,
                  tested, and free.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Resources Shared", value: "12,000+" },
                { label: "Active Developers", value: "8,000+" },
                { label: "Monthly Copies", value: "3,500+" },
                { label: "Community Rating", value: "4.8/5" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="dh-card p-5 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-black text-dh-teal">
                    {item.value}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="dh-container">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Built for{" "}
              <span className="text-dh-teal">Developers</span>
              , by Developers
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              We focus on what matters most: quality, accessibility, and community.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, index) => (
              <div key={index} className="dh-card p-5">
                <div className={'w-12 h-12 rounded-lg ' + feature.bgClass + ' flex items-center justify-center mb-3'}>
                  <div className={feature.iconClass}>{feature.icon}</div>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 sm:py-24 bg-[#1A1D26]">
        <div className="dh-container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-3xl sm:text-4xl font-black">{stat.number}</div>
                <p className="text-gray-400 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-dh-surface">
        <div className="dh-container text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-lg bg-dh-teal/10 flex items-center justify-center mx-auto mb-4">
            <Terminal className="w-6 h-6 text-dh-teal" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Ready to Contribute?
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Whether you are sharing your first snippet or exploring resources
            for your next project, DevHive is here for you.
          </p>
          <Link
            href="/resources"
            className="dh-btn dh-btn-primary gap-2"
          >
            Explore Resources
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
