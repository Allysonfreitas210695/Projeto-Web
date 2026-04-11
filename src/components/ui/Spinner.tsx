import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

export const Spinner = ({ size = 'md', className, variant = 'default' }: SpinnerProps) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colors = {
    default: 'border-on-surface-variant',
    primary: 'border-primary',
    secondary: 'border-secondary',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-t-transparent',
        sizes[size],
        colors[variant],
        className
      )}
    />
  );
};

export const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface">
    <div className="flex flex-col items-center gap-4">
      <Spinner size="lg" variant="primary" />
      <p className="body-md text-on-surface-variant">Carregando...</p>
    </div>
  </div>
);

export const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm flex items-center justify-center z-50">
    <Spinner size="lg" variant="primary" />
  </div>
);

export default Spinner;
