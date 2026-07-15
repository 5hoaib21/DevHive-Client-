import AddPromptForm from '@/components/dashboard/AddPromptForm';
import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = "force-dynamic";
export const revalidate = 0;

const AddPromptPage = async () => {
    return (
        <div className="min-h-screen bg-white text-zinc-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* 🧭 Top Breadcrumb */}
                <div className="flex items-center gap-2">
                    <Link 
                        href="/dashboard" 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors bg-zinc-50 hover:bg-zinc-100 px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                        <ArrowLeft size={14} />
                        Back to Dashboard
                    </Link>
                </div>

                {/* 🎯 Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-100 pb-6">
                    <div className="space-y-1.5">
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 flex items-center gap-2.5">
                            <span className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                                <Sparkles size={18} className="fill-blue-50/50" />
                            </span>
                            Forge New Resource
                        </h1>
                        <p className="text-sm text-zinc-500 max-w-xl">
                            Create and optimize high-quality developer resources.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-xs hover:border-zinc-300/80 transition-all duration-300">
                    <AddPromptForm />
                </div>

            </div>
        </div>
    );
};

export default AddPromptPage;