import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, pageTransition } from '@/utils/animations';
import { usePageMeta } from '@/hooks/usePageMeta';
import AntiScrapeText from '@/components/common/AntiScrapeText';

export default function CV() {
  usePageMeta({
    title: 'Curriculum Vitae — Dany Pretel',
    description: 'Hoja de vida profesional de Dany Jose Pretel Huamanvilca. Estudiante de Ingeniería de Ciberseguridad y Licenciado Militar.',
  });

  useEffect(() => {
    // Add class to enable printing for this page specifically
    document.body.classList.add('allow-print');
    window.scrollTo(0, 0);
    return () => {
      // Clean up on unmount to keep security active on other pages
      document.body.classList.remove('allow-print');
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-container section-padding min-h-screen relative"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        
        {/* Floating Print Dashboard - Screen Only */}
        <div className="max-w-4xl mx-auto mb-10 no-print flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg border border-neon-cyan/20 bg-dark-900/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-neon-cyan"></span>
            </span>
            <div className="font-mono text-xs text-text-secondary">
              <p className="text-white font-bold uppercase tracking-wider font-mono">Vista Previa del CV</p>
              <p className="text-[10px] text-text-muted mt-0.5 font-mono">Visualiza antes de imprimir o descargar la versión Word</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`${import.meta.env.BASE_URL}CV_Dany_Pretel.pdf`}
              download="CV_Dany_Pretel.pdf"
              className="flex items-center gap-2 px-5 py-2.5 border border-neon-cyan/50 text-neon-cyan text-xs font-mono font-bold uppercase tracking-wider rounded hover:bg-neon-cyan/15 hover:shadow-[0_0_20px_rgba(0,242,254,0.2)] transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar PDF
            </a>
            
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-neon-cyan text-black text-xs font-mono font-bold uppercase tracking-wider rounded hover:bg-white hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimir / PDF
            </button>
          </div>
        </div>

        {/* CV Document Container - Styled to match the Word template directly (NO borders/borders layout) */}
        <motion.div
          variants={fadeUp}
          className="max-w-4xl mx-auto bg-dark-900 text-text p-6 sm:p-12 print:p-0 print:bg-white print:text-black print:max-w-full"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6 mb-6 print:border-black/20 print:pb-4 print:mb-4">
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white print:text-black leading-tight">
                DANY JOSE PRETEL HUAMANVILCA
              </h1>
              <p className="text-neon-cyan font-mono text-base font-bold mt-2 uppercase tracking-widest print:text-black print:font-semibold">
                Estudiante de Ingeniería en Ciberseguridad
              </p>
              
              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 text-sm font-mono text-text-secondary print:text-black/80 print:text-xs">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-neon-cyan print:text-black/50">📍</span> Arequipa, Perú
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-neon-cyan print:text-black/50">📱</span> +51 935 738 276
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-neon-cyan print:text-black/50">✉️</span> 1263803@senati.pe
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-neon-cyan print:text-black/50">🔗</span>
                  <a
                    href="https://www.linkedin.com/in/danny-pretel-2a35651a4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neon-cyan hover:underline transition-colors print:no-underline print:text-black"
                  >
                    linkedin.com/in/danny-pretel-2a35651a4
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-neon-cyan print:text-black/50">DNI:</span> 
                  <span className="print:hidden"><AntiScrapeText value="62113229" /></span>
                  <span className="hidden print:inline">62113229</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-neon-cyan print:text-black/50">Nacimiento:</span>
                  <span className="print:hidden"><AntiScrapeText value="09/05/2001" /></span>
                  <span className="hidden print:inline">09/05/2001</span>
                </div>
              </div>
            </div>

            {/* Profile circular photo */}
            <div className="shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}images/profile_circle.png`}
                alt="Foto de Perfil"
                className="w-40 h-40 object-cover border-2 border-neon-cyan/30 p-1 rounded-full bg-dark-950/40 shadow-[0_0_15px_rgba(0,242,254,0.15)] hover:border-neon-cyan hover:shadow-[0_0_25px_rgba(0,242,254,0.35)] transition-all duration-300 print:w-36 print:h-36 print:border-black print:p-0.5 print:shadow-none print:transition-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* Body Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3 print:gap-6">
            
            {/* Left Column (Skills, Languages, Strengths) */}
            <div className="md:col-span-1 flex flex-col gap-6 print:gap-5">
              
              {/* Technical Skills */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neon-cyan print:text-black print:font-bold border-b border-white/10 print:border-black/20 pb-1.5 mb-3">
                  // Habilidades
                </h3>
                <ul className="space-y-2 text-sm font-mono text-text-secondary print:text-black/85 print:text-xs">
                  <li className="flex flex-col gap-0.5">
                    <span className="text-white print:text-black font-semibold">Redes & Cisco:</span>
                    <span className="text-xs text-text-muted print:text-black/60">CCNA (Introducción a Redes), Subnetting IP, enrutamiento básico.</span>
                  </li>
                  <li className="flex flex-col gap-0.5">
                    <span className="text-white print:text-black font-semibold">Ciberseguridad:</span>
                    <span className="text-xs text-text-muted print:text-black/60">Ethical hacking básico, escaneo de puertos, análisis de seguridad.</span>
                  </li>
                  <li className="flex flex-col gap-0.5">
                    <span className="text-white print:text-black font-semibold">Sistemas Operativos:</span>
                    <span className="text-xs text-text-muted print:text-black/60">Linux (Kali Linux, Red Hat Enterprise Linux I), Windows.</span>
                  </li>
                  <li className="flex flex-col gap-0.5">
                    <span className="text-white print:text-black font-semibold">Lógica & Herramientas:</span>
                    <span className="text-xs text-text-muted print:text-black/60">Lógica en PSeInt, Git/GitHub, uso avanzado de IA.</span>
                  </li>
                </ul>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neon-cyan print:text-black print:font-bold border-b border-white/10 print:border-black/20 pb-1.5 mb-3">
                  // Idiomas
                </h3>
                <ul className="space-y-1.5 text-sm font-mono text-text-secondary print:text-black/85 print:text-xs">
                  <li className="flex justify-between">
                    <span className="text-white print:text-black">Español</span>
                    <span className="text-text-muted print:text-black/60">Nativo</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white print:text-black">Quechua</span>
                    <span className="text-text-muted print:text-black/60">Nativo</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white print:text-black">Inglés</span>
                    <span className="text-text-muted print:text-black/60">En curso</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white print:text-black">Portugués</span>
                    <span className="text-text-muted print:text-black/60">Básico</span>
                  </li>
                </ul>
              </div>

              {/* Attributes / Strengths */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neon-cyan print:text-black print:font-bold border-b border-white/10 print:border-black/20 pb-1.5 mb-3">
                  // Fortalezas
                </h3>
                <ul className="space-y-1 text-sm font-mono text-text-secondary print:text-black/85 print:text-xs list-disc pl-4">
                  <li>Humildad en el aprendizaje</li>
                  <li>Agilidad para adquirir conocimientos</li>
                  <li>Pensamiento estructurado y sintético</li>
                  <li>Resiliencia y disciplina militar</li>
                  <li>Orientación a la resolución</li>
                </ul>
              </div>
            </div>

            {/* Right Column (Profile, Education, Certificates) */}
            <div className="md:col-span-2 flex flex-col gap-6 print:gap-5">
              
              {/* Profile paragraph */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neon-cyan print:text-black print:font-bold border-b border-white/10 print:border-black/20 pb-1.5 mb-3">
                  // Perfil Profesional
                </h3>
                <p className="text-sm md:text-base font-mono text-text-secondary print:text-black/90 print:text-[11px] leading-relaxed">
                  Futuro Ingeniero en Ciberseguridad en el 4to semestre de SENATI. Aunque cuento con varias certificaciones, mantengo la humildad de aprender constantemente y aplicar los conocimientos rápido. Suelo ir un paso adelante en los temas que me apasionan, y si desconozco algo, lo aprendo en el instante. Integro la IA como aliada clave para el análisis y síntesis. Mi meta es liderar proyectos tecnológicos extraordinarios y crear mi propia empresa en el sector.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neon-cyan print:text-black print:font-bold border-b border-white/10 print:border-black/20 pb-1.5 mb-3">
                  // Experiencia Laboral
                </h3>
                <div className="exp-item">
                  <h4 className="text-sm font-mono font-bold text-white print:text-black uppercase">
                    Ejército del Perú
                  </h4>
                  <p className="text-xs font-mono text-neon-cyan print:text-black/70 italic mt-0.5">
                    Cargo: Licenciado del Servicio Militar Voluntario / Instructor Militar | 2020 — 2022
                  </p>
                  
                  <p className="text-xs font-mono text-white print:text-black font-semibold mt-2 mb-1">// Funciones:</p>
                  <ul className="list-disc pl-4 text-xs font-mono text-text-secondary print:text-black/70 space-y-0.5">
                    <li>Impartir instrucción militar básica y entrenamiento físico al personal de nuevos contingentes.</li>
                    <li>Cumplir con los servicios tácticos y operativos de resguardo y seguridad de las instalaciones.</li>
                    <li>Mantener la disciplina, el orden y el cumplimiento de los reglamentos del servicio militar vigente.</li>
                  </ul>
                  
                  <p className="text-xs font-mono text-white print:text-black font-semibold mt-2 mb-1">// Logros:</p>
                  <ul className="list-disc pl-4 text-xs font-mono text-text-secondary print:text-black/70 space-y-0.5">
                    <li>Destacar por disciplina y conducta, obteniendo el licenciamiento y designación como Instructor Militar.</li>
                    <li>Cumplir satisfactoriamente con el Servicio Militar Voluntario con legajo impecable.</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neon-cyan print:text-black print:font-bold border-b border-white/10 print:border-black/20 pb-1.5 mb-3">
                  // Educación
                </h3>
                <div className="space-y-4 print:space-y-3">
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <h4 className="text-sm font-mono font-bold text-white print:text-black">
                        Ingeniería de Ciberseguridad (Carrera Técnica)
                      </h4>
                      <span className="text-xs font-mono text-neon-green print:text-black/70">
                        2025 — Presente
                      </span>
                    </div>
                    <p className="text-xs font-mono text-text-secondary print:text-black/70">
                      SENATI · Arequipa, Perú — 4to Semestre
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <h4 className="text-sm font-mono font-bold text-white print:text-black">
                        Licenciamiento del Servicio Militar Voluntario & Especialidad de Instructor
                      </h4>
                    </div>
                    <p className="text-xs font-mono text-text-secondary print:text-black/70 mt-1">
                      Fuerzas Armadas del Perú | UNIDAD: CEMOV_COSTA | FECHA DE ALTA: 01 JUL 2020 — FECHA DE BAJA: 23 JUN 2022 | ARMA: INFANTERÍA
                    </p>
                  </div>
                </div>
              </div>

              {/* Certificates */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neon-cyan print:text-black print:font-bold border-b border-white/10 print:border-black/20 pb-1.5 mb-3">
                  // Certificaciones Destacadas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-mono text-text-secondary print:text-black/85 print:text-[10px]">
                  <div className="flex items-start gap-1">
                    <span className="text-neon-green print:text-black/70">•</span>
                    <div>
                      <p className="font-semibold text-white print:text-black">CCNA: Introducción a Redes</p>
                      <p className="text-[10px] text-text-muted print:text-black/60">Cisco Networking Academy · 70 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-neon-green print:text-black/70">•</span>
                    <div>
                      <p className="font-semibold text-white print:text-black">Hacker Ético</p>
                      <p className="text-[10px] text-text-muted print:text-black/60">CyberGames · Cisco · UTP · 70 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-neon-green print:text-black/70">•</span>
                    <div>
                      <p className="font-semibold text-white print:text-black">Red Hat System Administration I</p>
                      <p className="text-[10px] text-text-muted print:text-black/60">SENATI · Curso de Especialización</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-neon-green print:text-black/70">•</span>
                    <div>
                      <p className="font-semibold text-white print:text-black">Conceptos Básicos de Redes</p>
                      <p className="text-[10px] text-text-muted print:text-black/60">Cisco · SENATI · 22 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-neon-green print:text-black/70">•</span>
                    <div>
                      <p className="font-semibold text-white print:text-black">Conceptos Básicos de Hardware</p>
                      <p className="text-[10px] text-text-muted print:text-black/60">Cisco · SENATI · 6 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-neon-green print:text-black/70">•</span>
                    <div>
                      <p className="font-semibold text-white print:text-black">Ciencia de Datos (Introducción)</p>
                      <p className="text-[10px] text-text-muted print:text-black/60">Cisco · SENATI · 6 horas</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer QR Section */}
          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 print:border-black/20 print:pt-4">
            <div className="text-center sm:text-left text-[11px] font-mono text-text-muted print:text-black/60 leading-normal max-w-xl">
              <b>VERIFICACIÓN DIGITAL DEL CURRÍCULUM:</b><br />
              Este currículum cuenta con una versión en línea interactiva. Escanee el código QR para abrir las credenciales certificadas y acceder al portafolio digital.
            </div>
            
            <div className="p-2 rounded bg-white border border-white/10 shrink-0">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://pretel1.github.io/Mi-portafolio/&color=000000&bgcolor=ffffff"
                alt="Código QR CV"
                className="w-20 h-20 bg-white"
                loading="lazy"
              />
            </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}
