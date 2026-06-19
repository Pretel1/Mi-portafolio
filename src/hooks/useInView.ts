import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce && ref.current) {
          observer.current?.unobserve(ref.current);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    },
    [triggerOnce]
  );

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    const el = ref.current;
    if (el) observer.current.observe(el);

    return () => {
      if (el) observer.current?.unobserve(el);
      observer.current?.disconnect();
    };
  }, [threshold, rootMargin, handleIntersect]);

  return { ref, isInView };
}
