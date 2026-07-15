"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Zap, Shield, Users, Rocket, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

const WhyDevHive = () => {
  const benefits = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Curated resources by experienced developers, tested and optimized for peak performance.",
      bgClass: "bg-teal-50",
      iconClass: "text-dh-teal"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Access",
      description: "Get immediate access to our entire library of production-ready code and templates.",
      bgClass: "bg-indigo-50",
      iconClass: "text-dh-indigo"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Quality",
      description: "Every resource is community-vetted and verified by our quality assurance team.",
      bgClass: "bg-emerald-50",
      iconClass: "text-emerald-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Driven",
      description: "Join 10,000+ developers sharing insights and improving resources together.",
      bgClass: "bg-amber-50",
      iconClass: "text-amber-600"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Regular Updates",
      description: "Stay ahead with weekly updates featuring the latest developer tools and techniques.",
      bgClass: "bg-rose-50",
      iconClass: "text-rose-600"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expert Support",
      description: "Get dedicated support from our team of experienced developers and engineers.",
      bgClass: "bg-cyan-50",
      iconClass: "text-cyan-600"
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-dh-surface">
      <div className="dh-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Built for{" "}
            <span className="text-dh-teal">Creators</span>
            , by Creators
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Everything you need to create, optimize, and scale your development workflow.
          </p>
        </div>

        {/* Benefits grid - 3 columns layout */}
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <StaggerItem key={index}>
              <div className="dh-card p-6 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-lg ${benefit.bgClass} flex items-center justify-center mb-4 flex-shrink-0`}>
                  <span className={benefit.iconClass}>{benefit.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                  {benefit.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/resources"
            className="dh-btn dh-btn-primary gap-2 inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyDevHive;