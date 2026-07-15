import AddResourceForm from '@/components/dashboard/AddResourceForm';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = "force-dynamic";
export const revalidate = 0;

const AddResourcePage = async () => {
    return (
        <div>
            <div className="mb-6">
                <Link href="/dashboard/explorer" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 mb-3">
                    <ArrowLeft size={14} /> Back to Dashboard
                </Link>
                <h1 className="text-xl font-bold text-gray-900">Submit New Resource</h1>
                <p className="text-sm text-gray-500 mt-0.5">Share a code snippet, template, or tool with the DevHive community</p>
            </div>
            <div className="dh-card p-6">
                <AddResourceForm />
            </div>
        </div>
    );
};

export default AddResourcePage;
