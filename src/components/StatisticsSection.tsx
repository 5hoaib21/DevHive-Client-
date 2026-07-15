"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Users, Globe, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    value: 5000,
    suffix: "+",
    label: "Total Resources",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: 2500,
    suffix: "+",
    label: "Active Developers",
    gradient: "from-teal-500 to-indigo-500",
    bgGradient: "from-teal-50 to-indigo-50",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    value: 15,
    suffix: "+",
    label: "Languages Supported",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: 50000,
    suffix: "+",
    label: "Total Usage",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
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

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const StatisticsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4"
          >
            <TrendingUp className="w-4 h-4" />
            Statistics
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            DevHive by the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">
              Numbers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-lg leading-relaxed"
          >
            Our growing community of developers
          </motion.p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${stat.bgGradient} border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-bl-full -z-0" />

              <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className={stat.iconColor}>{stat.icon}</div>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">
                {isInView ? (
                  <CountUp target={stat.value} suffix={stat.suffix} isAnimated={isInView} />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>

              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>

              <div className={`mt-4 w-12 h-1 bg-gradient-to-r ${stat.gradient} rounded-full group-hover:w-16 transition-all duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
