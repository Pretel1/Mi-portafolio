import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/common/ScrollProgress';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import CV from '@/pages/CV';
import Certificates from '@/pages/Certificates';
import Contact from '@/pages/Contact';
import StudioPage from '@/pages/Studio';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+P / Cmd+P (Print)
      // Allow printing ONLY on the CV route
      const isCvRoute = window.location.hash === '#/cv' || window.location.pathname.endsWith('/cv');
      
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        if (!isCvRoute) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
      // Block Ctrl+S / Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Block F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
      }
      // Block Ctrl+Shift+I / Ctrl+Shift+C / Ctrl+Shift+J (DevTools inspect)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Block Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

  const isStudio = location.pathname.startsWith('/studio');

  if (isStudio) {
    return (
      <Routes>
        <Route path="/studio/*" element={<StudioPage />} />
      </Routes>
    );
  }

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
