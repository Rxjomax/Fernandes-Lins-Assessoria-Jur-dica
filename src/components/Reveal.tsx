import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export type RevealVariant = 'up' | 'fade' | 'image';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = delay > 0 ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined;

  return (
    <div
      ref={ref}
      data-visible={visible ? 'true' : 'false'}
      data-variant={variant}
      style={style}
      className={`reveal-block ${className}`}
    >
      {children}
    </div>
  );
}
