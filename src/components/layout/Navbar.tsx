import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        className={`
          w-full transition-all duration-500
          ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}
        `}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Logo (Terminal Style) */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
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

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="px-5 py-2 text-sm font-mono font-medium text-neon-cyan border border-neon-cyan/50 rounded hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-300"
            >
              &gt; Iniciar Conexión
            </Link>
          </div>

          {/* Mobile Menu Button (simplified for now) */}
          <button className="md:hidden p-2 text-neon-cyan hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </motion.nav>
    </header>
  );
}
