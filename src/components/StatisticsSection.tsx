"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Users, Globe, TrendingUp } from "lucide-react";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

const stats = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    value: 5000,
    suffix: "+",
    label: "Total Resources",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: 2500,
    suffix: "+",
    label: "Active Developers",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    value: 15,
    suffix: "+",
    label: "Languages Supported",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: 50000,
    suffix: "+",
    label: "Total Usage",
  },
];

function CountUp({ target, suffix, isAnimated }: { target: number; suffix: string; isAnimated: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isAnimated) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, isAnimated]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

const StatisticsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="dh-container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            DevHive by the{" "}
            <span className="text-dh-teal">Numbers</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Our growing community of developers
          </p>
        </motion.div>

        <div ref={ref}>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <div className="py-8">
                  <div className="w-12 h-12 rounded-lg bg-dh-surface mx-auto flex items-center justify-center text-dh-teal mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">
                    {isInView ? (
                      <CountUp target={stat.value} suffix={stat.suffix} isAnimated={isInView} />
                    ) : (
                      <span>0{stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
