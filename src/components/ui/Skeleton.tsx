import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({ className, variant = 'default', width, height }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-surface-container-high',
        {
          'rounded-lg': variant === 'default',
          'rounded-full': variant === 'circular',
          rounded: variant === 'text',
        },
        className
      )}
      style={{
        width: width ?? (variant === 'circular' ? '40px' : '100%'),
        height: height ?? (variant === 'text' ? '20px' : '20px'),
      }}
    />
  );
};

export const CardSkeleton = () => (
  <div className="p-6 rounded-xl bg-surface-container-lowest space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1 space-y-2">
        <Skeleton width="60%" height={16} />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton width="100%" height={14} />
      <Skeleton width="80%" height={14} />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    <div className="flex gap-4">
      <Skeleton width={60} height={16} />
      <Skeleton width={80} height={16} />
      <Skeleton width={40} height={16} />
      <Skeleton width={60} height={16} />
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton width="25%" height={40} />
        <Skeleton width="30%" height={40} />
        <Skeleton width="15%" height={40} />
        <Skeleton width="10%" height={40} />
      </div>
    ))}
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="flex justify-between">
      <div className="space-y-2">
        <Skeleton width={200} height={32} />
        <Skeleton width={300} height={16} />
      </div>
      <div className="flex gap-3">
        <Skeleton width={140} height={40} />
        <Skeleton width={140} height={40} />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default Skeleton;
