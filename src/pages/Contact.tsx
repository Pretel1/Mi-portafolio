import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, pageTransition } from '@/utils/animations';

const CONTACT_INFO = [
  { label: 'Email', value: '1263803@senati.pe' },
  { label: 'LinkedIn', value: 'danny-pretel-2a35651a4' },
  { label: 'Ubicación', value: 'Arequipa, Perú' },
  { label: 'Teléfono', value: '+51 935 738 276' },
  { label: 'WhatsApp', value: 'Chat Directo' },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/1263803@senati.pe", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            message: formState.message,
            _subject: `Nuevo mensaje de portafolio: ${formState.name}`
        })
      });
      
      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleWhatsApp = () => {
    // Reemplaza el número con el número real de WhatsApp en formato internacional (sin el '+')
    // Ejemplo: 51935738276 (51 es código de Perú)
    const phone = '51935738276'; 
    const message = 'Hola Dany, vi tu portfolio y me gustaría conectar contigo.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-container section-padding min-h-screen flex flex-col justify-center"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        {/* Header Terminal Style */}
        <div className="mb-16 text-center">
          <p className="text-neon-cyan font-mono text-sm mb-2">&gt; ping localhost</p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter mb-4">
            Iniciar Conexión
          </h1>
          <p className="text-text-secondary text-lg font-mono">
            Disponible para oportunidades profesionales y colaboraciones.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8 terminal-window p-8"
          >
            <div className="terminal-header -mx-8 -mt-8 mb-8">
              <div className="terminal-dot dot-red" />
              <div className="terminal-dot dot-yellow" />
              <div className="terminal-dot dot-green" />
              <span className="ml-4 text-xs font-mono text-text-muted">config.json</span>
            </div>
            
            <div className="grid gap-6">
              {CONTACT_INFO.map((info) => (
                <motion.div key={info.label} variants={fadeUp} className="border-b border-white/5 pb-4">
                  <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">&quot;{info.label}&quot;:</p>
                  {info.label === 'WhatsApp' ? (
                    <button 
                      onClick={handleWhatsApp}
                      className="text-lg font-mono text-neon-green hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                    >
                      &quot;{info.value}&quot;
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                    </button>
                  ) : (
                    <p className="text-lg font-mono text-neon-green">&quot;{info.value}&quot;</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="terminal-window p-8"
          >
            <div className="terminal-header -mx-8 -mt-8 mb-8">
              <div className="terminal-dot dot-red" />
              <div className="terminal-dot dot-yellow" />
              <div className="terminal-dot dot-green" />
              <span className="ml-4 text-xs font-mono text-text-muted">send_payload.sh</span>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-mono text-neon-cyan uppercase tracking-widest">$ user_name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 p-3 text-white font-mono text-sm focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,242,254,0.2)] transition-all rounded"
                  placeholder="Tu nombre..."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-mono text-neon-cyan uppercase tracking-widest">$ user_email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 p-3 text-white font-mono text-sm focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,242,254,0.2)] transition-all rounded"
                  placeholder="tu@email.com..."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono text-neon-cyan uppercase tracking-widest">$ payload_data</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 p-3 text-white font-mono text-sm focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,242,254,0.2)] transition-all rounded resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full border font-mono font-bold py-3 mt-4 transition-all duration-300 rounded disabled:opacity-50 disabled:cursor-not-allowed
                  ${status === 'success' ? 'bg-neon-green/20 text-neon-green border-neon-green shadow-[0_0_20px_rgba(0,255,135,0.4)]' : 
                    status === 'error' ? 'bg-red-500/20 text-red-500 border-red-500' : 
                    'bg-neon-cyan/10 text-neon-cyan border-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,242,254,0.4)]'}
                `}
              >
                {status === 'loading' ? 'Transmitiendo payload...' : 
                 status === 'success' ? '[OK] ENVÍO EXITOSO' : 
                 status === 'error' ? '[!] ERROR DE CONEXIÓN' : '&gt; Ejecutar_Envío'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}
