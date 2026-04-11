import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export const Logo = ({ className, iconClassName, textClassName, showText = true }: LogoProps) => {
  return (
    <div className={cn('flex items-center gap-2.5 group', className)}>
      <div
        className={cn(
          'w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105',
          iconClassName
        )}
      >
        <GraduationCap size={24} strokeWidth={2.5} />
      </div>
      {showText && (
        <span className={cn('title-lg font-bold tracking-tight text-on-surface', textClassName)}>
          SIFU <span className="text-primary"></span>
        </span>
      )}
    </div>
  );
};
