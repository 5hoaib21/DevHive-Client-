"use client";

import {
  Zap,
  Shield,
  Globe,
  Database,
  Layers,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Get your resources in milliseconds with our optimized delivery system.",
    bgClass: "bg-amber-50",
    iconClass: "text-amber-600"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption and security protocols to protect your data.",
    bgClass: "bg-emerald-50",
    iconClass: "text-emerald-600"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Community",
    description: "Connect with creators from 100+ countries sharing insights daily.",
    bgClass: "bg-blue-50",
    iconClass: "text-blue-600"
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Rich Library",
    description: "Access 5,000+ curated resources across 50+ categories and niches.",
    bgClass: "bg-teal-50",
    iconClass: "text-dh-teal"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Smart Filtering",
    description: "Find exactly what you need with advanced search and filtering options.",
    bgClass: "bg-rose-50",
    iconClass: "text-rose-600"
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Weekly Updates",
    description: "Stay ahead with fresh resources added every week based on trends.",
    bgClass: "bg-indigo-50",
    iconClass: "text-indigo-600"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="dh-container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Everything You Need to{" "}
            <span className="text-dh-teal">Succeed</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Packed with powerful tools and features to help you build better projects faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
  );
};

export default FeatureSection;
