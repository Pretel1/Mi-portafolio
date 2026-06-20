import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CyberGlobe from '@/components/ui/CyberGlobe';
import ParticleCanvas from '@/components/ui/ParticleCanvas';
import { fadeUp, staggerContainer, pageTransition } from '@/utils/animations';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-container flex items-center justify-center relative overflow-hidden"
    >
      {/* Matrix/Network Background */}
      <ParticleCanvas />

      {/* 3D Rotating Cyber Globe Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none select-none opacity-[0.22]">
        <div className="scale-[1.1] sm:scale-[1.3] md:scale-[1.5] lg:scale-[1.7] transition-transform duration-700">
          <CyberGlobe 
            size={600} 
            globeRadius={200} 
            color="rgba(0, 242, 254, " 
            ringColor="rgba(0, 255, 135, "
            pointCount={200}
            showRings={true}
            interactive={true}
          />
        </div>
      </div>

      {/* Vignette overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] pointer-events-none z-0" />

      <div className="relative z-10 px-6 w-full max-w-[1600px] mx-auto flex flex-col items-center justify-center text-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center w-full max-w-5xl mx-auto">
          
          {/* Status Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono font-medium uppercase tracking-widest text-neon-green border border-neon-green/30 bg-neon-green/5 rounded shadow-[0_0_15px_rgba(0,255,135,0.15)]">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" aria-hidden="true" />
              Sistema Activo // Listo para Conexión
            </span>
          </motion.div>

          {/* Full Name */}
          <div className="mb-6 w-full flex justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tighter leading-[1.1] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] text-center">
              DANY JOSE PRETEL HUAMANVILCA
            </h1>
          </div>

          {/* Subtitle */}
          <motion.div variants={fadeUp} className="mb-12 max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl text-text-secondary font-mono tracking-wide leading-relaxed">
              <span className="text-neon-cyan">Estudiante de Ingeniería de Ciberseguridad</span> en SENATI.<br/>
              Construyendo sistemas seguros e infraestructura escalable.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/certificates"
              className="px-8 py-4 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan text-sm font-mono font-bold uppercase tracking-widest hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,242,254,0.2)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] w-full sm:w-auto text-center"
            >
              &gt; Ver_Credenciales
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-transparent text-text border border-white/20 text-sm font-mono font-medium tracking-widest hover:border-white/60 transition-colors duration-300 w-full sm:w-auto text-center"
            >
              $ whoami
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}
