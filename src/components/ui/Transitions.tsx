import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {children}
    </div>
  );
};

export const FadeIn = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <div className="animate-in fade-in duration-300" style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

export const SlideIn = ({
  children,
  direction = 'bottom',
  delay = 0,
}: {
  children: ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}) => {
  const animations = {
    top: 'slide-in-from-top-4',
    bottom: 'slide-in-from-bottom-4',
    left: 'slide-in-from-left-4',
    right: 'slide-in-from-right-4',
  };

  return (
    <div
      className={`animate-in fade-in ${animations[direction]} duration-300`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
