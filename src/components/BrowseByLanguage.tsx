import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Terminal,
  Braces,
  FileJson,
  Globe,
  Server,
  Cpu,
  FileCode,
  Layers,
} from 'lucide-react';
import { getAllResources } from '@/lib/api/prompts';

interface LanguageItem {
  slug: string;
  label: string;
  count: number;
}

interface LanguageConfig {
  icon: React.ReactNode;
  emoji: string;
  gradient: string;
  bgLight: string;
  iconBg: string;
}

const languageConfigs: Record<string, LanguageConfig> = {
  javascript: {
    icon: <Braces className="w-5 h-5" />,
    emoji: '⚡',
    gradient: 'from-yellow-400 to-amber-500',
    bgLight: 'bg-yellow-50',
    iconBg: 'bg-yellow-100 text-yellow-600',
  },
  typescript: {
    icon: <FileCode className="w-5 h-5" />,
    emoji: '🔷',
    gradient: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  python: {
    icon: <Terminal className="w-5 h-5" />,
    emoji: '🐍',
    gradient: 'from-blue-400 to-cyan-500',
    bgLight: 'bg-cyan-50',
    iconBg: 'bg-cyan-100 text-cyan-600',
  },
  go: {
    icon: <Code2 className="w-5 h-5" />,
    emoji: '🔵',
    gradient: 'from-cyan-400 to-teal-500',
    bgLight: 'bg-teal-50',
    iconBg: 'bg-teal-100 text-teal-600',
  },
  rust: {
    icon: <Cpu className="w-5 h-5" />,
    emoji: '🦀',
    gradient: 'from-orange-500 to-red-500',
    bgLight: 'bg-orange-50',
    iconBg: 'bg-orange-100 text-orange-600',
  },
  java: {
    icon: <Globe className="w-5 h-5" />,
    emoji: '☕',
    gradient: 'from-orange-400 to-red-400',
    bgLight: 'bg-red-50',
    iconBg: 'bg-red-100 text-red-600',
  },
  'c++': {
    icon: <FileCode className="w-5 h-5" />,
    emoji: '⚙️',
    gradient: 'from-blue-600 to-indigo-700',
    bgLight: 'bg-indigo-50',
    iconBg: 'bg-indigo-100 text-indigo-600',
  },
  ruby: {
    icon: <Terminal className="w-5 h-5" />,
    emoji: '💎',
    gradient: 'from-red-500 to-rose-600',
    bgLight: 'bg-rose-50',
    iconBg: 'bg-rose-100 text-rose-600',
  },
  default: {
    icon: <FileJson className="w-5 h-5" />,
    emoji: '📄',
    gradient: 'from-gray-400 to-gray-600',
    bgLight: 'bg-gray-50',
    iconBg: 'bg-gray-100 text-gray-600',
  },
};

const fallbackLanguages: LanguageItem[] = [
  { slug: 'javascript', label: 'JavaScript', count: 0 },
  { slug: 'typescript', label: 'TypeScript', count: 0 },
  { slug: 'python', label: 'Python', count: 0 },
  { slug: 'go', label: 'Go', count: 0 },
  { slug: 'rust', label: 'Rust', count: 0 },
  { slug: 'java', label: 'Java', count: 0 },
  { slug: 'c++', label: 'C++', count: 0 },
  { slug: 'ruby', label: 'Ruby', count: 0 },
];

const aliasMap: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  golang: 'go',
  rs: 'rust',
  cpp: 'c++',
  cplusplus: 'c++',
  rb: 'ruby',
};

function resolveSlug(language: string): string {
  const key = language.toLowerCase().trim();
  return aliasMap[key] || key;
}

const BrowseByLanguage = async () => {
  let items: LanguageItem[] = [];

  try {
    const result = await getAllResources({ limit: '50', status: 'approved' });
    const resources = result?.data ?? [];

    const counts: Record<string, { label: string; count: number }> = {};

    for (const r of resources) {
      const lang = r?.language;
      if (!lang || typeof lang !== 'string') continue;
      const slug = resolveSlug(lang);
      if (!counts[slug]) {
        counts[slug] = { label: lang, count: 0 };
      }
      counts[slug].count += 1;
    }

    items = Object.entries(counts)
      .map(([slug, { label, count }]) => ({ slug, label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  } catch {
    items = fallbackLanguages;
  }

  const isLiveData = items.length > 0 && items[0].count > 0;
  const displayItems = isLiveData ? items : fallbackLanguages;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Layers className="w-4 h-4" />
            Browse by Language
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            Browse by{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Language
            </span>
          </h2>
          <p className="text-gray-500">
            Find resources in your preferred programming language
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayItems.map((item) => {
            const config = languageConfigs[item.slug] ?? languageConfigs.default;
            return (
              <Link
                key={item.slug}
                href={`/resources?language=${item.slug}`}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${config.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span>{config.icon}</span>
                  </div>
                  <span className="text-2xl opacity-80">{config.emoji}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {item.label}
                </h3>

                {isLiveData ? (
                  <p className="text-sm text-gray-500 mt-1">
                    {item.count} {item.count === 1 ? 'resource' : 'resources'}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 mt-1">Browse resources</p>
                )}

                <div
                  className={`mt-4 w-12 h-1 bg-gradient-to-r ${config.gradient} rounded-full group-hover:w-full transition-all duration-300`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrowseByLanguage;
