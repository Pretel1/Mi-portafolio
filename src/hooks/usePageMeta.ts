import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description?: string;
}

const BASE_TITLE = 'Dany Pretel — Ingeniero de Ciberseguridad';

/**
 * Hook to dynamically update the page title and meta description
 * when navigating between SPA routes.
 */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    // Update document title
    document.title = title === BASE_TITLE ? BASE_TITLE : `${title} | Dany Pretel`;

    // Update meta description if provided
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }

    // Cleanup: restore base title when component unmounts
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title, description]);
}
