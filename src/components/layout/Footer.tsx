import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/danny-pretel-2a35651a4',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    url: 'https://wa.me/51935738276?text=Hola%2C%20Dany.%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20ponerme%20en%20contacto%20contigo.',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Format dynamic date (e.g., 19 Jun 2026)
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const dateStr = new Date().toLocaleDateString('es-ES', options);
    setCurrentDate(dateStr);
  }, []);

  return (
    <footer className="relative border-t border-white/10 bg-dark-950 mt-auto">
      {/* Hacker style top border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Dynamic Date */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <span className="font-mono font-bold text-lg text-neon-cyan">~pretel.sys</span>
            <div className="hidden md:block w-px h-4 bg-white/20" />
            <span className="text-text-muted font-mono text-xs uppercase tracking-widest">
              ÚLTIMO ACCESO: <span className="text-white">{currentDate}</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, url, icon }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded border border-white/10 text-text-muted hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* System Info */}
          <div className="text-xs font-mono text-text-muted/50 text-center md:text-right">
            SISTEMA OPERATIVO SEGURO<br />
            STATUS: ONLINE
          </div>
          
        </div>
      </div>
    </footer>
  );
}
