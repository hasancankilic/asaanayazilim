import { memo } from 'react';
import Skeleton from './Skeleton';

const BlogCardSkeleton = memo(() => {
  return (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50">
      {/* Image placeholder */}
      <Skeleton variant="rectangular" className="w-full h-48" />
      
      {/* Content */}
      <div className="p-6 space-y-3">
        {/* Category badge */}
        <Skeleton variant="rounded" width={80} height={20} />
        
        {/* Title */}
        <Skeleton variant="text" className="w-full h-6" />
        <Skeleton variant="text" className="w-3/4 h-6" />
        
        {/* Excerpt */}
        <Skeleton variant="text" className="w-full h-4" />
        <Skeleton variant="text" className="w-full h-4" />
        <Skeleton variant="text" className="w-2/3 h-4" />
        
        {/* Meta info */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="text" width={100} height={16} />
          </div>
          <Skeleton variant="text" width={80} height={16} />
        </div>
      </div>
    </div>
  );
});

BlogCardSkeleton.displayName = 'BlogCardSkeleton';

export default BlogCardSkeleton;
