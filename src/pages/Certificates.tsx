import { useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import CertificateModal from '@/components/ui/CertificateModal';
import { useCertificates } from '@/hooks/useCertificates';
import { staggerContainer, pageTransition } from '@/utils/animations';
import { Certificate } from '@/data/certificates';

const CATEGORY_LOGS: Record<string, string> = {
  'Redes': 'SYS_NET: IP_ADDR 10.0.0.1 // PORT 80/443 OPEN // CCNA_SCAN: ACTIVE',
  'Seguridad': 'SYS_SEC: AES-256-GCM // INTEGRITY: SECURE // CRYPTO: OK',
  'Ciencia de Datos': 'SYS_DATA: MATRIX_VAL [0.98, 0.95, 0.99] // ALGO: SUCCESS',
  'Hardware': 'SYS_HW: CPU_TEMP 38C // VOLTAGE STABLE // MEMORY: OK',
  'Habilidades Digitales': 'SYS_DIG: PROTOCOL_SSH // CONNECTION: SECURE',
  'IoT': 'SYS_IOT: PROTOCOL_MQTT // PORT 1883 // FEED: CONNECTED',
  'Militar y Conducta': 'SYS_MIL: RANK INSTRUCTOR // STATUS CERTIFIED // CODE: 100',
  'default': 'SYS_LOG: BUFFER SAFE // PORTS SECURE // SCANNER ACTIVE',
};

// Generate binary data blocks once at module level for high performance
const generateBinaryBlock = () => {
  const lineCount = 20;
  const charsPerLine = 35;
  const lines = Array.from({ length: lineCount }, () =>
    Array.from({ length: charsPerLine }, () => (Math.random() > 0.5 ? '1' : '0')).join('')
  );
  const block = lines.join('\n');
  return block + '\n' + block; // Duplicate to enable seamless CSS loops
};
const BINARY_TEXT = generateBinaryBlock();

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
            className="terminal-window group cursor-pointer hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,242,254,0.15)] transition-all duration-500 flex flex-col justify-between overflow-hidden min-h-[300px]"
            onClick={() => openModal(cert)}
          >
            {/* Top Preview Image Section */}
            <div className="w-full h-36 relative bg-dark-950 overflow-hidden border-b border-white/5 flex items-center justify-center select-none pointer-events-none">
              
              {/* Default Encrypted State Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.04)_0%,#050505_100%)] flex flex-col items-center justify-center p-4 transition-opacity duration-500 opacity-100 group-hover:opacity-0 z-10">
                <span className="text-xl mb-1.5 animate-pulse filter drop-shadow-[0_0_8px_rgba(0,242,254,0.4)]">🔒</span>
                <span className="text-[9px] font-mono text-neon-cyan tracking-widest text-center uppercase leading-normal">
                  [ Datos Encriptados ]
                </span>
                <span className="text-[7px] font-mono text-text-muted mt-1.5 tracking-wider text-center">
                  PASAR CURSOR PARA DESCIFRAR
                </span>
              </div>

              {/* Decrypted Actual Image - Fades in on Hover */}
              <img
                src={getCertUrl(cert.filename)}
                alt={`Miniatura de ${cert.title}`}
                className="w-full h-full object-contain object-center filter brightness-[0.35] group-hover:brightness-[0.85] group-hover:scale-102 transition-all duration-500 opacity-0 group-hover:opacity-100 z-0 select-none pointer-events-none p-2"
                loading="lazy"
              />
              
              {/* Laser Scan HUD Line */}
              <div className="absolute left-0 right-0 h-[1.5px] bg-neon-cyan/80 shadow-[0_0_12px_rgba(0,242,254,0.8)] opacity-0 group-hover:opacity-100 animate-laser-scan pointer-events-none z-20" />

              {/* Watermark Copy Protection Overlay (only on hover) */}
              <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-0 group-hover:opacity-20 z-10 pointer-events-none transition-opacity duration-700">
                <span className="text-[8px] font-mono font-bold tracking-widest text-white/50 border border-white/10 px-2 py-1 rotate-[-15deg] select-none pointer-events-none">
                  COPIA PROTEGIDA
                </span>
              </div>

              {/* Overlay Badges */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-base shadow-md select-none pointer-events-none z-20">
                {cert.icon}
              </div>
              
              <span className="absolute top-3 right-3 text-[8px] font-mono font-bold px-2 py-0.5 rounded bg-dark-950/80 backdrop-blur-md border border-white/10 text-neon-cyan tracking-wider select-none pointer-events-none uppercase z-20">
                {cert.category}
              </span>
            </div>

            {/* Bottom Card Details Section with Scrolling Hologram */}
            <div className="p-5 flex flex-col justify-between flex-1 relative overflow-hidden">
              
              {/* Scrolling Binary Code Background (Hologram style) */}
              <div className="absolute inset-0 overflow-hidden opacity-[0.025] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none select-none z-0">
                <div className="font-mono text-[7px] text-neon-green leading-[1.25] tracking-widest whitespace-pre select-none pointer-events-none animate-scroll-binary opacity-85">
                  {BINARY_TEXT}
                </div>
              </div>

              {/* Text Content overlayed on top of background */}
              <div className="relative z-10">
                <h3 className="text-base font-display font-bold text-white mb-1 leading-tight group-hover:text-neon-cyan transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-text-secondary">
                  {cert.institution}
                </p>
                <p className="text-[9px] font-mono text-text-muted/65 mt-2.5 pt-2.5 border-t border-white/5 select-none uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap" aria-hidden="true">
                  &gt;_ {CATEGORY_LOGS[cert.category] || CATEGORY_LOGS['default']}
                </p>
              </div>
              
              <div className="relative z-10 flex justify-between items-center mt-5 pt-3 border-t border-white/5">
                <span className="text-[10px] font-mono text-text-muted">
                  [{cert.year}] {cert.hours ? `{${cert.hours}h}` : ''}
                </span>
                
                {cert.verificationUrl ? (
                  <span className="text-[9px] font-mono text-neon-green flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                    [Verificado]
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-text-muted">
                    [Protegido]
                  </span>
                )}
              </div>
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
        
        {/* Animated Cyber Mascot */}
        <motion.div 
          className="flex justify-center mb-6 select-none pointer-events-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img 
            src={`${import.meta.env.BASE_URL}images/cyber_hologram.png`}
            alt="Security Assistant Hologram Shield"
            className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_0_20px_rgba(0,242,254,0.35)] pointer-events-none select-none"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 1.5, -1.5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

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
                  relative px-4 py-2 text-xs font-mono tracking-wide transition-all duration-300 rounded-sm cursor-pointer
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
