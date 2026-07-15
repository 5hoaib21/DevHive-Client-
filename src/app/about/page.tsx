import type { Metadata } from "next";
import {
  BookOpen,
  Users,
  RefreshCw,
  DollarSign,
  Code,
  Globe,
  ArrowRight,
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
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Vetted",
    description:
      "Resources are upvoted, reviewed, and tested by a global community of developers who value quality.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Easy to Reuse",
    description:
      "One-click copy, clear documentation, and standardized formats make integrating resources effortless.",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Always Free",
    description:
      "DevHive remains completely free for all developers. No paywalls, no premium tiers — just pure community sharing.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

const AboutPage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
            About DevHive
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Empowering Developers to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Share & Grow
            </span>
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
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
                Our Story
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                Born from a{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Developer Need
                </span>
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
                  reusable resources — without paywalls, ads, or noise.
                </p>
                <p>
                  What began as a small collection of config files and CLI
                  snippets has grown into a thriving library spanning 50+
                    programming languages, frameworks, and tools — all curated,
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
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
                >
                  <div className="text-2xl sm:text-3xl font-black text-blue-600">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
              Why DevHive
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Built for{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Developers
              </span>
              , by Developers
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              We focus on what matters most: quality, accessibility, and
              community.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className={feature.iconColor}>{feature.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div
                  className={`mt-4 w-12 h-1 bg-gradient-to-r ${feature.color} rounded-full group-hover:w-16 transition-all duration-300`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-3xl sm:text-4xl font-black">{stat.number}</div>
                <p className="text-blue-100 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
            <Code className="w-4 h-4" />
            Join the Hive
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            Explore Resources
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
