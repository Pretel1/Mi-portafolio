import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre Mí', href: '/about' },
  { name: 'Certificados', href: '/certificates' },
  { name: 'Contacto', href: '/contact' },
];

const getIcon = (href: string) => {
  switch (href) {
    case '/':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case '/about':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case '/certificates':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    case '/contact':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h.01M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z" />
        </svg>
      );
    default:
      return null;
  }
};

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

          {/* Mobile Menu Button (Cyberpunk Keycap style) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              md:hidden p-2.5 text-neon-cyan transition-all duration-300 focus:outline-none z-50 relative
              border border-neon-cyan/30 bg-dark-950/60 rounded-md
              hover:border-neon-cyan/60 hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)]
              ${isOpen ? 'border-neon-cyan bg-neon-cyan/15 shadow-[0_0_15px_rgba(0,242,254,0.3)] text-white' : ''}
            `}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer (Native App style) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop filter overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-[340px] bg-dark-900 border-l border-neon-cyan/10 z-40 md:hidden flex flex-col justify-between p-6 shadow-2xl select-none"
            >
              {/* Profile / App Header Info */}
              <div className="mt-12 flex flex-col items-center p-4 rounded-xl bg-dark-950/50 border border-white/5 relative overflow-hidden text-center">
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-green" />
                <div className="w-16 h-16 rounded-full border-2 border-neon-cyan/20 overflow-hidden mb-3 relative bg-dark-900">
                  <img
                    src={`${import.meta.env.BASE_URL}images/profile.png`}
                    alt="Dany Pretel"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-dark-900 animate-pulse" />
                </div>
                <h4 className="font-display text-white text-base font-bold tracking-tight">DANY PRETEL</h4>
                <p className="font-mono text-[9px] text-neon-cyan tracking-wider uppercase mb-2">Cybersecurity Eng. Student</p>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neon-green/5 border border-neon-green/10 text-[8px] font-mono text-neon-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping" />
                  SISTEMA: ONLINE
                </div>
              </div>

              {/* Navigation Options with SVG Icons */}
              <div className="flex flex-col gap-2.5 my-6">
                {NAV_LINKS.map((link, index) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, ease: "easeOut" }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center gap-4 px-4 py-3 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 border
                          ${isActive 
                            ? 'text-white bg-neon-cyan/10 border-neon-cyan/30 shadow-[0_0_15px_rgba(0,242,254,0.1)]' 
                            : 'text-text-secondary border-transparent hover:text-white hover:bg-white/5'}
                        `}
                      >
                        <span className={`w-5 h-5 flex items-center justify-center ${isActive ? 'text-neon-cyan' : 'text-text-secondary'}`}>
                          {getIcon(link.href)}
                        </span>
                        <span>{link.name}</span>
                        {isActive && <span className="ml-auto text-neon-cyan text-[9px] font-bold tracking-widest uppercase">&lt;ON&gt;</span>}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA and System Info */}
              <div className="mt-auto space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block text-center py-3.5 font-mono font-bold text-xs tracking-widest text-black bg-neon-cyan border border-neon-cyan rounded shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition-all duration-300"
                  >
                    CONEXIÓN DIRECTA
                  </Link>
                </motion.div>
                
                <div className="p-3.5 rounded-lg border border-white/5 bg-dark-950/40 text-[8px] font-mono text-text-muted space-y-0.5 select-none">
                  <div>&gt;_ USER: guest@pretel.sys</div>
                  <div>&gt;_ MODE: ALWAYS_LEARNING</div>
                  <div>&gt;_ GOAL: CONQUER_THE_WORLD</div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
