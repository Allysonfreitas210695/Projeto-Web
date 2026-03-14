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
          'w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105 duration-300',
          iconClassName
        )}
      >
        <GraduationCap size={24} strokeWidth={2.5} />
      </div>
      {showText && (
        <span className={cn('text-xl font-bold tracking-tight text-foreground', textClassName)}>
          Mente <span className="text-primary">Acadêmica</span>
        </span>
      )}
    </div>
  );
};
