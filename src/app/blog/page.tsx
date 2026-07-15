import type { Metadata } from "next";
import {
  BookOpen,
  CalendarDays,
  User,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore the DevHive blog for tutorials, best practices, and insights on software development, DevOps, and programming languages.",
};

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  slug: string;
}

const posts: BlogPost[] = [
  {
    title: "Getting Started with TypeScript in 2026",
    date: "June 28, 2026",
    excerpt:
      "TypeScript has become the de facto standard for JavaScript projects. Learn how to set up your first TypeScript project with modern tooling, strict mode configuration, and best practices for type safety.",
    author: "DevHive Team",
    slug: "#",
  },
  {
    title: "Building Reusable React Component Libraries",
    date: "June 20, 2026",
    excerpt:
      "A practical guide to designing, building, and publishing React component libraries using TypeScript, Rollup, and Storybook. Covering atomic design principles and tree-shaking.",
    author: "DevHive Team",
    slug: "#",
  },
  {
    title: "Docker Compose for Local Development",
    date: "June 12, 2026",
    excerpt:
      "Streamline your local dev environment with Docker Compose. This post covers multi-service setups, volume mounts for hot-reloading, and tips for debugging containers efficiently.",
    author: "DevHive Team",
    slug: "#",
  },
  {
    title: "Go vs Rust: A Practical Comparison",
    date: "June 5, 2026",
    excerpt:
      "Both Go and Rust have carved out strong niches in systems programming. We compare performance, concurrency models, ecosystem maturity, and learning curves for real-world projects.",
    author: "DevHive Team",
    slug: "#",
  },
  {
    title: "Python Scripting for DevOps Automation",
    date: "May 28, 2026",
    excerpt:
      "Automate repetitive infrastructure tasks with Python. From cloud API wrappers to CI/CD pipeline scripts, explore patterns that save hours of manual work.",
    author: "DevHive Team",
    slug: "#",
  },
  {
    title: "Clean Code Principles for JavaScript Developers",
    date: "May 20, 2026",
    excerpt:
      "Writing readable, maintainable JavaScript is a skill every developer should cultivate. This post covers naming conventions, function purity, error handling, and code organization.",
    author: "DevHive Team",
    slug: "#",
  },
];

const BlogPage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            DevHive Blog
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Insights for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Modern Developers
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Tutorials, best practices, and deep dives into the tools and
            technologies shaping software development today.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <article
                key={post.title}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  <Link href={post.slug}>{post.title}</Link>
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  href={post.slug}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group/link"
                >
                  Read More
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
