import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/common/ScrollProgress';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Certificates from '@/pages/Certificates';
import Contact from '@/pages/Contact';

export default function App() {
  const location = useLocation();

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
