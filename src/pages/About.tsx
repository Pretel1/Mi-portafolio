import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, pageTransition, staggerContainer } from '@/utils/animations';
import AntiScrapeText from '@/components/common/AntiScrapeText';
import { usePageMeta } from '@/hooks/usePageMeta';

const EMAIL_USER = '1263803';
const EMAIL_DOMAIN = 'senati.pe';
const emailAddress = `${EMAIL_USER}@${EMAIL_DOMAIN}`;

const SKILLS = [
  { name: 'Redes (CCNA)', level: 85 },
  { name: 'Ethical Hacking', level: 80 },
  { name: 'Sistemas Operativos (Linux, Windows)', level: 85 },
  { name: 'Red Hat SysAdmin I', level: 75 },
  { name: 'Git / GitHub', level: 70 },
  { name: 'Lógica / PSeInt', level: 80 },
];

export default function About() {
  usePageMeta({
    title: 'Sobre Mí',
    description: 'Conoce a Dany Pretel: futuro ingeniero de ciberseguridad. Humildad para aprender, agilidad para aplicar conocimientos y la visión de llevar proyectos a límites inalcanzables.',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <div className="mb-20 flex flex-col items-center text-center">
          <p className="text-neon-cyan font-mono text-sm mb-2">&gt; cat about.md</p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter">
            Sobre Mí
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-text-secondary font-mono max-w-3xl"
          >
            Humildad para aprender desde cero, agilidad para aplicar y visión para liderar proyectos extraordinarios. Siempre un paso adelante.
          </motion.p>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          
          {/* Bio Box */}
          <motion.div variants={fadeUp} className="md:col-span-2 terminal-window p-6 md:p-8 border-t-4 border-neon-cyan flex flex-col justify-center shadow-lg hover:shadow-neon-cyan/10 transition-shadow duration-300">
            <h3 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-6">// Perfil Profesional</h3>
            <div className="space-y-4 text-base md:text-lg text-text-secondary font-mono leading-relaxed">
              <p>
                Soy <span className="text-neon-cyan font-semibold">Futuro Ingeniero de Ciberseguridad</span> en SENATI (4to semestre). Tengo varias certificaciones y cursos, pero no pretendo saberlo todo. Mi verdadero valor radica en la <span className="text-white font-semibold">humildad para aprender constantemente</span> y la determinación para implementar de inmediato cada nuevo conocimiento que adquiero.
              </p>
              <p>
                Suelo ir un paso adelante en los temas que me apasionan. Y si me encuentro con algo que desconozco, no me detengo: lo investigo, lo asimilo y <span className="text-neon-green font-semibold">lo aprendo en ese mismo instante</span>. Para mí, herramientas como la IA no son rivales, sino poderosas aliadas que optimizan mi capacidad de análisis y síntesis.
              </p>
              <p>
                Tengo la mente llena de ideas, imagino interfaces y soluciones constantemente. Mi meta a largo plazo es grande: <span className="text-neon-cyan font-semibold">crear mi propia empresa y llevar proyectos tecnológicos a niveles inalcanzables</span>. Busco una oportunidad donde pueda demostrar esta visión y seguir creciendo.
              </p>
            </div>
          </motion.div>

          {/* Photo Box */}
          <motion.div variants={fadeUp} className="md:col-span-1 lg:row-span-2 terminal-window flex flex-col overflow-hidden shadow-lg group">
            <div className="terminal-header">
              <div className="terminal-dot dot-red" />
              <div className="terminal-dot dot-yellow" />
              <div className="terminal-dot dot-green" />
              <span className="ml-4 text-xs font-mono text-text-muted">profile_pic.jpg</span>
            </div>
            <div className="flex-1 w-full bg-dark-950 flex justify-center items-center overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}images/profile.png`}
                alt="Dany Jose Pretel Huamanvilca"
                className="w-full h-full object-contain object-top group-hover:scale-105 transition-all duration-700 p-2"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Education Box */}
          <motion.div variants={fadeUp} className="md:col-span-1 terminal-window p-6 border-t-4 border-neon-green shadow-lg hover:shadow-neon-green/10 transition-shadow duration-300">
            <h3 className="text-xs font-mono text-neon-green uppercase tracking-widest mb-4">// Educación</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-mono font-medium text-white mb-1">Ingeniería en Ciberseguridad</h4>
                <p className="text-sm font-mono text-text-secondary mb-1">SENATI — Arequipa, Perú</p>
                <p className="text-xs font-mono text-text-muted">2026 — Presente · 4to Semestre</p>
              </div>
              <div className="pt-4 border-t border-white/5">
                <h4 className="text-sm font-mono font-medium text-white mb-1">Servicio Militar Voluntario</h4>
                <p className="text-sm font-mono text-text-secondary mb-1">Fuerzas Armadas del Perú</p>
                <p className="text-xs font-mono text-text-muted">Licenciado · Instructor Militar</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Box */}
          <motion.div variants={fadeUp} className="md:col-span-1 terminal-window p-6 border-t-4 border-purple shadow-lg hover:shadow-purple/10 transition-shadow duration-300">
            <h3 className="text-xs font-mono text-purple uppercase tracking-widest mb-4">// Contacto</h3>
            <ul className="space-y-3 text-sm font-mono text-text-secondary">
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <span className="text-purple w-5">✉</span>
                <a href={`mailto:${emailAddress}`} className="hover:text-neon-cyan transition-colors" title="Enviar correo a Dany">
                  {emailAddress}
                </a>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <span className="text-purple w-5">📱</span> +51 935 738 276
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <span className="text-purple w-5">📍</span> Arequipa, Perú
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <span className="text-purple w-5">in</span>
                <a
                  href="https://www.linkedin.com/in/danny-pretel-2a35651a4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-cyan transition-colors"
                >
                  /in/danny-pretel-2a35651a4
                </a>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors mt-2 pt-2 border-t border-white/5">
                <span className="text-purple w-5 text-xs font-bold">DNI</span>
                <AntiScrapeText value="62113229" />
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <span className="text-purple w-5 text-xs font-bold">NAC</span>
                <AntiScrapeText value="09/05/2001" />
              </li>
            </ul>
          </motion.div>

          {/* Skills Box */}
          <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-2 terminal-window p-6 md:p-8 border-t-4 border-white/20 shadow-lg hover:shadow-white/5 transition-shadow duration-300">
            <h3 className="text-sm font-mono text-white uppercase tracking-widest mb-6">
              <span className="text-text-muted mr-2">const</span>skills<span className="text-text-muted"> = [</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pl-2 sm:pl-4 border-l border-white/10">
              {SKILLS.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-white text-xs sm:text-sm">&apos;{skill.name}&apos;</span>
                    <span className="text-neon-cyan text-xs sm:text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full shadow-[0_0_10px_rgba(0,242,254,0.5)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-sm font-mono text-text-muted tracking-widest mt-6">]</h3>
          </motion.div>

          {/* Languages Box */}
          <motion.div variants={fadeUp} className="md:col-span-1 lg:col-span-1 terminal-window p-6 border-t-4 border-yellow-500 shadow-lg hover:shadow-yellow-500/10 transition-shadow duration-300">
            <h3 className="text-xs font-mono text-yellow-500 uppercase tracking-widest mb-4">// Idiomas</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h4 className="text-sm font-mono text-white">Quechua</h4>
                <span className="text-[10px] font-mono text-yellow-500 px-2 py-1 rounded border border-yellow-500/30 bg-yellow-500/5">Nativo</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h4 className="text-sm font-mono text-white">Inglés</h4>
                <span className="text-[10px] font-mono text-yellow-500 px-2 py-1 rounded border border-yellow-500/30 bg-yellow-500/5">En curso</span>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-mono text-white">Portugués</h4>
                <span className="text-[10px] font-mono text-yellow-500 px-2 py-1 rounded border border-yellow-500/30 bg-yellow-500/5">Básico</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}
