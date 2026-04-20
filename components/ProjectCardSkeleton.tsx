import { memo } from 'react';
import Skeleton from './Skeleton';

const ProjectCardSkeleton = memo(() => {
  return (
    <div className="group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
      {/* Image placeholder */}
      <div className="relative overflow-hidden">
        <Skeleton variant="rectangular" className="w-full h-56" />
        
        {/* Overlay skeleton */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-3">
        {/* Title */}
        <Skeleton variant="text" className="w-full h-6" />
        <Skeleton variant="text" className="w-3/4 h-6" />
        
        {/* Description */}
        <Skeleton variant="text" className="w-full h-4" />
        <Skeleton variant="text" className="w-full h-4" />
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="rounded" width={70} height={24} />
        </div>
      </div>
    </div>
  );
});

ProjectCardSkeleton.displayName = 'ProjectCardSkeleton';

export default ProjectCardSkeleton;
