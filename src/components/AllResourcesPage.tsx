import { Copy, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AllResourcesPage = async ({ resource }: { resource: any }) => {

  const {
    title,
    description,
    category,
    language,
    image,
    usageCount,
    createdAt,
    status,
  } = resource;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const statusStyles: Record<string, string> = {
    approved: "dh-badge-status-approved",
    pending: "dh-badge-status-pending",
    rejected: "dh-badge-status-rejected",
    draft: "dh-badge-status-pending",
  };

  const statusClass = statusStyles[status?.toLowerCase()] || statusStyles.draft;

  return (
    <div className="dh-card flex flex-col h-full">
      {image && (
        <div className="relative w-full h-40 overflow-hidden bg-gray-50">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2.5">
          <span className={`dh-badge ${statusClass}`}>
            {status || "Draft"}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={12} />
            {formattedDate}
          </span>
        </div>

        <h3 className="text-base font-bold text-gray-800 mb-1.5 line-clamp-1">
          {title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2 flex-grow">
          {description}
        </p>

        <div className="flex items-center gap-1.5 mb-3">
          {category && (
            <span className="dh-badge dh-badge-category">
              {category}
            </span>
          )}
          {language && (
            <span className="dh-badge dh-badge-language">
              {language}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-dh-border">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Copy size={12} />
            {usageCount || 0}
          </span>

          <Link
            href={`/resources/${resource._id}`}
            className="text-xs font-semibold text-dh-teal hover:text-dh-teal-dark transition-colors flex items-center gap-1"
          >
            View Details
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllResourcesPage;
