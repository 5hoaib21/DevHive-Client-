"use client";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Terminal, Eye, EyeOff, Loader2, Compass, Package } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("explorer");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const allowedRoles = ['explorer', 'publisher'];
    const role = allowedRoles.includes(selectedRole) ? selectedRole : 'explorer';

    await authClient.signUp.email({
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      password: formData.get('password') as string,
      role,
    } as any);
    toast.success('Account created successfully!');
    router.push('/');
    setLoading(false);
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({ provider: 'google' });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#1A1D26] flex-col items-center justify-center p-12 relative overflow-hidden">
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
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 bg-dh-surface flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="text-sm text-gray-500 mt-1">Join the DevHive community</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I want to join as</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setSelectedRole("explorer")}
                  className={'dh-card p-4 text-center cursor-pointer transition-all ' + (selectedRole === "explorer" ? 'border-dh-teal bg-[#E8F5F3]' : '')}>
                  <Compass className="w-6 h-6 mx-auto mb-1.5 text-dh-teal" />
                  <span className="text-sm font-semibold text-gray-900">Explorer</span>
                  <span className="text-xs text-gray-500 block mt-0.5">Discover resources</span>
                </button>
                <button type="button" onClick={() => setSelectedRole("publisher")}
                  className={'dh-card p-4 text-center cursor-pointer transition-all ' + (selectedRole === "publisher" ? 'border-dh-teal bg-[#E8F5F3]' : '')}>
                  <Package className="w-6 h-6 mx-auto mb-1.5 text-dh-indigo" />
                  <span className="text-sm font-semibold text-gray-900">Publisher</span>
                  <span className="text-xs text-gray-500 block mt-0.5">Share resources</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
              <input name="name" type="text" required placeholder="John Doe" className="dh-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input name="email" type="email" required placeholder="john@example.com" className="dh-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input name="password" type={showPassword ? 'text' : 'password'} required placeholder="Create a password" className="dh-input pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="dh-btn dh-btn-primary w-full justify-center">
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              Create Account
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{' '}
            <Link href="/signin" className="text-dh-teal hover:text-dh-teal-dark font-semibold">
              Sign in
            </Link>
          </p>

          <div className="mt-6 pt-6 border-t border-dh-border">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="dh-btn dh-btn-secondary w-full justify-center gap-2"
            >
              <Icon icon="devicon:google" className="text-lg" />
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
