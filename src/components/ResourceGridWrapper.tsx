'use client';

import { StaggerGrid, StaggerItem } from '@/components/motion/StaggerGrid';
import AllResourcesPage from '@/components/AllResourcesPage';

export default function ResourceGridWrapper({ resources }: { resources: any[] }) {
  return (
    <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {resources.map((resource: any) => (
        <StaggerItem key={resource._id}>
          <AllResourcesPage resource={resource} />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
