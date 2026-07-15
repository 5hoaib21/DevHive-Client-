"use client";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Terminal, Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("/redirect") || "/";
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await authClient.signIn.email({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
    router.push(redirectTo);
    toast.success("Welcome back!");
    setLoading(false);
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({ provider: 'google' });
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await authClient.signIn.email({
      email: "demo@devhive.io",
      password: "DemoPass123!",
    });
    router.push(redirectTo);
    toast.success("Welcome to the demo account");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <motion.div
        className="hidden lg:flex lg:w-2/5 bg-[#1A1D26] flex-col items-center justify-center p-12 relative overflow-hidden"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 4px)', backgroundSize: '40px 40px' }}
        />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-xl bg-dh-teal/20 flex items-center justify-center mx-auto mb-6">
            <Terminal className="w-8 h-8 text-dh-teal" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">DevHive</h1>
          <p className="text-gray-400 text-sm max-w-xs">The developer resource platform</p>
        </div>
      </motion.div>

      {/* Right Panel - Form */}
      <motion.div
        className="flex-1 bg-dh-surface flex items-center justify-center p-6"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to your DevHive account</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="dh-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  className="dh-input pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="dh-btn dh-btn-primary w-full justify-center">
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              Sign In
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-dh-teal hover:text-dh-teal-dark font-semibold">
              Sign up
            </Link>
          </p>

          <div className="mt-6 pt-6 border-t border-dh-border">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="text-xs text-gray-400 hover:text-dh-teal transition-colors cursor-pointer"
            >
              Try demo account
            </button>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="dh-btn dh-btn-secondary w-full justify-center gap-2"
            >
              <Icon icon="devicon:google" className="text-lg" />
              Sign in with Google
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
