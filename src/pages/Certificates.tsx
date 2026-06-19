import { useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import CertificateModal from '@/components/ui/CertificateModal';
import { useCertificates } from '@/hooks/useCertificates';
import { fadeUp, staggerContainer, pageTransition } from '@/utils/animations';
import { Certificate } from '@/data/certificates';

export default function Certificates() {
  const {
    certificates: filtered,
    categories,
    activeCategory,
    setActiveCategory,
    selectedCert,
    modalOpen,
    openModal,
    closeModal,
    navigateCert,
    getCertUrl,
  } = useCertificates();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const senatiCerts = filtered.filter((c) => c.origin === 'SENATI');
  const externalCerts = filtered.filter((c) => c.origin === 'Externo');

  const renderGrid = (certs: Certificate[]) => (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      layout
    >
      <AnimatePresence mode="popLayout">
        {certs.map((cert) => (
          <motion.div
            key={cert.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="terminal-window p-6 group cursor-pointer hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,242,254,0.1)] transition-all duration-500 flex flex-col justify-between min-h-[280px]"
            onClick={() => openModal(cert)}
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-3xl filter brightness-75 group-hover:brightness-100 transition-all duration-500">{cert.icon}</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-dark-800 border border-white/10 text-neon-cyan tracking-widest">{cert.category}</span>
              </div>
              <h3 className="text-xl font-display font-medium text-white mb-2 leading-tight group-hover:text-neon-cyan transition-colors">
                {cert.title}
              </h3>
              <p className="text-sm font-mono text-text-secondary">
                {cert.institution}
              </p>
            </div>
            
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5">
              <span className="text-xs font-mono text-text-muted">
                [{cert.year}] {cert.hours ? `{${cert.hours}h}` : ''}
              </span>
              <span className="text-xs font-mono text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                &gt; Ver Documento
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-container section-padding"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        {/* Header Terminal Style */}
        <div className="mb-16 flex flex-col items-center text-center">
          <p className="text-neon-cyan font-mono text-sm mb-2">&gt; ls -la ./certificados</p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter mb-4">
            Credenciales
          </h1>
          <p className="text-text-secondary text-lg font-mono max-w-2xl">
            Un registro completo de certificaciones profesionales, entrenamiento técnico y honores militares.
          </p>
        </div>

        {/* Filters (Terminal Tabs Style) */}
        <div className="mb-12 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  relative px-4 py-2 text-xs font-mono tracking-wide transition-all duration-300 rounded-sm
                  ${activeCategory === category 
                    ? 'text-black bg-neon-cyan shadow-[0_0_10px_rgba(0,242,254,0.3)]' 
                    : 'text-text-muted hover:text-neon-cyan hover:bg-neon-cyan/10 border border-transparent'}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grids separated by Origin */}
        <LayoutGroup>
          {senatiCerts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-xl font-mono text-white mb-6 border-l-4 border-neon-cyan pl-4">
                [ Certificaciones Internas: SENATI ]
              </h2>
              {renderGrid(senatiCerts)}
            </div>
          )}

          {externalCerts.length > 0 && (
            <div>
              <h2 className="text-xl font-mono text-white mb-6 border-l-4 border-neon-green pl-4">
                [ Certificaciones Externas & Militares ]
              </h2>
              {renderGrid(externalCerts)}
            </div>
          )}
        </LayoutGroup>
      </div>

      <CertificateModal
        cert={selectedCert}
        isOpen={modalOpen}
        onClose={closeModal}
        onNavigate={navigateCert}
        getCertUrl={getCertUrl}
      />
    </motion.div>
  );
}
