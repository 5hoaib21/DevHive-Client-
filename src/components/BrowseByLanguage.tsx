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
} from 'lucide-react';
import { getAllResources } from '@/lib/api/prompts';
import { StaggerGrid, StaggerItem } from '@/components/motion/StaggerGrid';

interface LanguageItem {
  slug: string;
  label: string;
  count: number;
}

interface LanguageConfig {
  icon: React.ReactNode;
  bgClass: string;
  iconClass: string;
}

const languageConfigs: Record<string, LanguageConfig> = {
  javascript: {
    icon: <Braces className="w-5 h-5" />,
    bgClass: 'bg-yellow-50',
    iconClass: 'text-yellow-600',
  },
  typescript: {
    icon: <FileCode className="w-5 h-5" />,
    bgClass: 'bg-blue-50',
    iconClass: 'text-blue-600',
  },
  python: {
    icon: <Terminal className="w-5 h-5" />,
    bgClass: 'bg-cyan-50',
    iconClass: 'text-cyan-600',
  },
  go: {
    icon: <Code2 className="w-5 h-5" />,
    bgClass: 'bg-teal-50',
    iconClass: 'text-teal-600',
  },
  rust: {
    icon: <Cpu className="w-5 h-5" />,
    bgClass: 'bg-orange-50',
    iconClass: 'text-orange-600',
  },
  java: {
    icon: <Globe className="w-5 h-5" />,
    bgClass: 'bg-red-50',
    iconClass: 'text-red-600',
  },
  'c++': {
    icon: <FileCode className="w-5 h-5" />,
    bgClass: 'bg-indigo-50',
    iconClass: 'text-indigo-600',
  },
  ruby: {
    icon: <Terminal className="w-5 h-5" />,
    bgClass: 'bg-rose-50',
    iconClass: 'text-rose-600',
  },
  default: {
    icon: <FileJson className="w-5 h-5" />,
    bgClass: 'bg-gray-50',
    iconClass: 'text-gray-600',
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
    <section className="py-16 sm:py-20 bg-white">
      <div className="dh-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="dh-section-heading">Browse by Language</h2>
          <p className="dh-section-subtitle mt-1">
            Find resources in your preferred programming language
          </p>
        </div>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayItems.map((item) => {
            const config = languageConfigs[item.slug] ?? languageConfigs.default;
            return (
              <StaggerItem key={item.slug}>
              <Link
                href={`/resources?language=${item.slug}`}
                className="dh-card dh-card-hover p-4 flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-lg ${config.bgClass} flex items-center justify-center shrink-0`}>
                  <span className={config.iconClass}>{config.icon}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-900">
                    {item.label}
                  </h3>
                  {isLiveData ? (
                    <p className="text-xs text-gray-500">
                      {item.count} {item.count === 1 ? 'resource' : 'resources'}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400">Browse resources</p>
                  )}
                </div>
              </Link>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
};

export default BrowseByLanguage;
