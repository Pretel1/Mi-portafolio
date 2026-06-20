import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '@/data/certificates';
import { modalBackdrop, modalContent } from '@/utils/animations';

interface CertificateModalProps {
  cert: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  getCertUrl: (filename: string) => string;
}

export default function CertificateModal({
  cert,
  isOpen,
  onClose,
  onNavigate,
  getCertUrl,
}: CertificateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isBlurred, setIsBlurred] = useState(false);

  // Minimum swipe distance for mobile navigation
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      onNavigate('next');
    }
    if (isRightSwipe) {
      onNavigate('prev');
    }
  };

  // Anti-Screenshot: Detect when window loses focus and blur content
  useEffect(() => {
    const handleBlur = () => {
      setIsBlurred(true);
    };
    const handleFocus = () => {
      setIsBlurred(false);
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Handle keyboard navigation, escape, and shortcut blocking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      // Close modal
      if (e.key === 'Escape') onClose();

      // Navigation
      if (e.key === 'ArrowRight') onNavigate('next');
      if (e.key === 'ArrowLeft') onNavigate('prev');

      // Block Ctrl+P / Cmd+P (Print)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        e.stopPropagation();
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

    // Block PrintScreen key to blur screen instantly
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'PrintScreen') {
        setIsBlurred(true);
        // Clear clipboard or alert
        navigator.clipboard?.writeText?.("Contenido protegido. Captura deshabilitada.");
        setTimeout(() => setIsBlurred(false), 2000);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
    };
  }, [isOpen, onClose, onNavigate]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && cert && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 select-none"
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
          onContextMenu={(e) => e.preventDefault()} // Block right-click on modal
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            className="terminal-window relative w-full max-w-6xl h-[85vh] flex flex-col"
            variants={modalContent}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEndEvent}
          >
            {/* Header */}
            <div className="terminal-header justify-between py-3 select-none">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="terminal-dot dot-red" />
                  <div className="terminal-dot dot-yellow" />
                  <div className="terminal-dot dot-green" />
                </div>
                <div className="ml-4">
                  <h3 id="modal-title" className="text-sm font-mono text-neon-cyan leading-tight select-none">
                    {cert.title}
                  </h3>
                  <p className="text-[10px] font-mono text-text-muted select-none">
                    {cert.institution} · {cert.year}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 select-none">
                <span className="px-3 py-1.5 text-xs font-mono text-red-500/70 border border-red-500/20 rounded cursor-not-allowed uppercase tracking-widest hidden sm:inline-block">
                  [Protegido]
                </span>
                <button
                  onClick={onClose}
                  className="p-1.5 text-text-muted hover:text-red-500 transition-colors"
                  aria-label="Cerrar modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content Body (PDF or Image) */}
            <div 
              className={`flex-1 bg-dark-950 relative overflow-hidden select-none transition-all duration-300 ${
                isBlurred ? 'blur-3xl scale-95 opacity-25' : 'blur-none scale-100 opacity-100'
              }`}
              onContextMenu={(e) => e.preventDefault()}
            >
              {cert.type === 'pdf' ? (
                <div className="w-full h-full relative overflow-hidden pointer-events-none select-none">
                  <iframe
                    src={`${getCertUrl(cert.filename)}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full border-none pointer-events-none select-none"
                    title={`Certificado: ${cert.title}`}
                    loading="lazy"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  {/* Invisible pointer event absorber overlay */}
                  <div className="absolute inset-0 bg-transparent cursor-default pointer-events-auto" onContextMenu={(e) => e.preventDefault()} />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.05)_0%,#050505_100%)] overflow-hidden relative select-none">
                  <img
                    src={getCertUrl(cert.filename)}
                    alt={`Certificado: ${cert.title}`}
                    className="max-w-full max-h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] pointer-events-none select-none"
                    loading="lazy"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  {/* Invisible pointer event absorber overlay */}
                  <div className="absolute inset-0 bg-transparent cursor-default pointer-events-auto" onContextMenu={(e) => e.preventDefault()} />
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between p-3 border-t border-white/10 bg-dark-900 text-sm select-none">
              <button
                onClick={() => onNavigate('prev')}
                className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-neon-cyan transition-colors px-4 py-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </button>
              
              {cert.verificationUrl ? (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-neon-green/10 text-neon-green border border-neon-green/40 hover:bg-neon-green hover:text-black font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded shadow-[0_0_15px_rgba(0,255,135,0.15)] hover:shadow-[0_0_25px_rgba(0,255,135,0.45)] hover:border-neon-green flex items-center gap-2.5 animate-pulse hover:animate-none cursor-pointer"
                  title="Verificar autenticidad de credencial oficial en Credly"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                  </span>
                  &gt;_ VERIFICAR AUTENTICIDAD
                </a>
              ) : (
                <span className="text-[10px] font-mono text-text-muted hidden sm:inline-block select-none">
                  USA ← → PARA NAVEGAR · ESC PARA CERRAR
                </span>
              )}

              <button
                onClick={() => onNavigate('next')}
                className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-neon-cyan transition-colors px-4 py-2 cursor-pointer"
              >
                Siguiente
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
