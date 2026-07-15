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
      <section className="bg-white border-b border-gray-100 py-20 sm:py-24">
        <div className="dh-container text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Insights for{" "}
            <span className="text-dh-teal">Modern Developers</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Tutorials, best practices, and deep dives into the tools and
            technologies shaping software development today.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 sm:py-24 bg-dh-surface">
        <div className="dh-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {posts.map((post) => (
              <article
                key={post.title}
                className="dh-card p-5"
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
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  <Link href={post.slug} className="hover:text-dh-teal transition-colors">{post.title}</Link>
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  href={post.slug}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-dh-teal hover:text-dh-teal-dark transition-colors"
                >
                  Read More
                  <ArrowRight className="w-3.5 h-3.5" />
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
