import { Plus, Terminal } from "lucide-react";
import Link from "next/link";

export const EmptyState = () => {
    return (
        <div className="dh-empty border-2 border-dashed border-dh-border rounded-xl mx-auto my-8 max-w-lg">
            <div className="w-12 h-12 rounded-lg bg-gray-50 border border-dh-border flex items-center justify-center text-gray-400">
                <Terminal size={22} />
            </div>
            <p className="dh-empty-text font-semibold text-gray-700">
                No resources published yet
            </p>
            <p className="dh-empty-text">
                Your sandbox engine is clean. Build, optimize, and expose your resource parameters inside the community matrix.
            </p>
            <Link
                href="/dashboard/explorer/add-resource"
                className="dh-btn dh-btn-primary mt-2"
            >
                <Plus size={14} /> Create First Resource
            </Link>
        </div>
    );
};
