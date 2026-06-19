import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre Mí', href: '/about' },
  { name: 'Certificados', href: '/certificates' },
  { name: 'Contacto', href: '/contact' },
];

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    
    const interval = setInterval(() => {
      setDisplayText((current) => {
        if (!isDeleting) {
          if (current.length < text.length) {
            return text.slice(0, current.length + 1);
          } else {
            isDeleting = true;
            return current;
          }
        } else {
          if (current.length > 0) {
            return text.slice(0, current.length - 1);
          } else {
            isDeleting = false;
            return current;
          }
        }
      });
    }, 150); // Typing speed
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        className={`
          w-full transition-all duration-500
          ${scrolled || isOpen ? 'glass-nav py-3' : 'bg-transparent py-5'}
        `}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Logo (Terminal Style) */}
          <Link
            to="/"
            className="flex items-center gap-2 group z-50"
            aria-label="Inicio"
          >
            <span className="text-yellow-500 font-mono text-xl font-bold group-hover:animate-pulse">&gt;_</span>
            <span className="text-yellow-500 font-mono text-sm tracking-widest font-semibold flex items-center">
              <TypewriterText text="pretel.sys" />
              <span className="w-1.5 h-4 bg-yellow-500 ml-1 animate-pulse" />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`
                    relative py-1 text-sm font-mono tracking-wide transition-colors duration-300
                    ${isActive ? 'text-neon-cyan' : 'text-text-secondary hover:text-white'}
                  `}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-cyan shadow-[0_0_10px_#00f2fe]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="px-5 py-2 text-sm font-mono font-medium text-neon-cyan border border-neon-cyan/50 rounded hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-300"
            >
              &gt; Iniciar Conexión
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neon-cyan hover:text-white transition-colors focus:outline-none z-50 relative"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 bg-dark-950/98 backdrop-blur-xl border-b border-neon-cyan/20 z-40 md:hidden flex flex-col justify-between pt-24 pb-12 px-6 overflow-hidden"
          >
            {/* Nav Links */}
            <div className="flex flex-col gap-5 mt-6">
              {NAV_LINKS.map((link, index) => {
                const isActive = location.pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.08, ease: "easeOut" }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        block text-2xl font-mono tracking-wider py-2 transition-all duration-300
                        ${isActive ? 'text-neon-cyan font-bold pl-2 shadow-l border-l-2 border-neon-cyan' : 'text-text-secondary hover:text-white hover:pl-2'}
                      `}
                    >
                      <span className="text-neon-cyan font-semibold mr-3">&gt;_</span>
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="w-full mt-auto"
            >
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-center py-4 font-mono font-bold text-sm tracking-widest text-neon-cyan border border-neon-cyan/50 rounded bg-neon-cyan/5 hover:bg-neon-cyan/15 hover:shadow-[0_0_15px_rgba(0,242,254,0.2)] transition-all duration-300"
              >
                &gt; INICIAR CONEXIÓN
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
