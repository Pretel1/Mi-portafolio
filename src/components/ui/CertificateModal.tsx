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

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
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

  // Handle keyboard navigation & escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate('next');
      if (e.key === 'ArrowLeft') onNavigate('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
          onContextMenu={(e) => e.preventDefault()} // Block right-click globally in modal
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
            <div className="terminal-header justify-between py-3">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="terminal-dot dot-red" />
                  <div className="terminal-dot dot-yellow" />
                  <div className="terminal-dot dot-green" />
                </div>
                <div className="ml-4">
                  <h3 id="modal-title" className="text-sm font-mono text-neon-cyan leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-[10px] font-mono text-text-muted">
                    {cert.institution} · {cert.year}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Download button intentionally removed for security */}
                <span className="px-3 py-1.5 text-xs font-mono text-red-500/50 border border-red-500/20 rounded cursor-not-allowed uppercase tracking-widest hidden sm:inline-block">
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
            <div className="flex-1 bg-dark-950 relative overflow-auto">
              
              
              {cert.type === 'pdf' ? (
                <iframe
                  src={`${getCertUrl(cert.filename)}#toolbar=0&navpanes=0`}
                  className="w-full h-full border-none"
                  title={`Certificado: ${cert.title}`}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.05)_0%,#050505_100%)] overflow-auto">
                  <img
                    src={getCertUrl(cert.filename)}
                    alt={`Certificado: ${cert.title}`}
                    className="max-w-full max-h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    loading="lazy"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between p-3 border-t border-white/10 bg-dark-900 text-sm">
              <button
                onClick={() => onNavigate('prev')}
                className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-neon-cyan transition-colors px-4 py-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </button>
              <span className="text-[10px] font-mono text-text-muted hidden sm:inline-block">
                USA ← → PARA NAVEGAR · ESC PARA CERRAR
              </span>
              <button
                onClick={() => onNavigate('next')}
                className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-neon-cyan transition-colors px-4 py-2"
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
