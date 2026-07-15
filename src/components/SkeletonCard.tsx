export default function SkeletonCard() {
  return (
    <div className="dh-card">
      <div className="h-40 dh-skeleton rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 dh-skeleton w-16" />
          <div className="h-4 dh-skeleton w-20" />
        </div>
        <div className="h-5 dh-skeleton w-3/4" />
        <div className="h-3 dh-skeleton w-full" />
        <div className="h-3 dh-skeleton w-2/3" />
        <div className="flex gap-1.5">
          <div className="h-5 dh-skeleton w-14" />
          <div className="h-5 dh-skeleton w-14" />
        </div>
        <div className="flex justify-between pt-3 border-t border-dh-border">
          <div className="h-4 dh-skeleton w-12" />
          <div className="h-4 dh-skeleton w-20" />
        </div>
      </div>
    </div>
  );
}
