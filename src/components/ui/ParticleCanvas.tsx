import { useEffect, useRef, useCallback } from 'react';

interface CyberNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: 'dot' | 'cross';
  pulseSpeed: number;
  pulseTime: number;
}

interface BinaryColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  active: boolean;
}

const NODE_COUNT = 30;
const CONNECTION_DISTANCE = 160;
const MOUSE_RADIUS = 180;
const GRID_SIZE = 60; // Size of grid squares

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<CyberNode[]>([]);
  const columnsRef = useRef<BinaryColumn[]>([]);
  const ripplesRef = useRef<ClickRipple[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const dprRef = useRef(1);
  
  // Scan line tracking
  const scanLineYRef = useRef(0);

  const initCyberCanvas = useCallback((width: number, height: number) => {
    // Initialize nodes
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2.5 + 1.5,
      opacity: Math.random() * 0.6 + 0.2,
      type: Math.random() > 0.7 ? 'cross' : 'dot',
      pulseSpeed: Math.random() * 0.05 + 0.02,
      pulseTime: Math.random() * Math.PI,
    }));

    // Initialize binary streams
    const columnCount = Math.floor(width / 30);
    columnsRef.current = Array.from({ length: columnCount }, (_, i) => {
      const length = Math.floor(Math.random() * 8) + 4;
      const chars = Array.from({ length }, () => (Math.random() > 0.5 ? '1' : '0'));
      return {
        x: i * 30 + Math.random() * 10,
        y: Math.random() * -height,
        speed: Math.random() * 1.5 + 0.8,
        chars,
        opacity: Math.random() * 0.25 + 0.05,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      initCyberCanvas(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse movement
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    // Click ripples
    const handleClick = (e: MouseEvent) => {
      // Add a shockwave at the clicked position
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 220,
        opacity: 0.8,
        active: true,
      });

      // Keep array size small
      if (ripplesRef.current.length > 5) {
        ripplesRef.current.shift();
      }
    };
    window.addEventListener('click', handleClick);

    const animate = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const columns = columnsRef.current;
      const ripples = ripplesRef.current;
      const mouse = mouseRef.current;

      // 1. Draw Holographic Cyber Grid
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.025)';
      ctx.lineWidth = 0.5;
      
      // Draw grid vertical lines
      for (let x = 0; x < w; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      // Draw grid horizontal lines
      for (let y = 0; y < h; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw faint radial grid vignette centered at mouse (flashlight effect)
      if (mouse.x > -500) {
        const gridGlow = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, MOUSE_RADIUS * 1.5);
        gridGlow.addColorStop(0, 'rgba(0, 242, 254, 0.08)');
        gridGlow.addColorStop(0.5, 'rgba(79, 172, 254, 0.02)');
        gridGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gridGlow;
        ctx.fillRect(0, 0, w, h);
      }

      // Update scan line
      scanLineYRef.current += 1.2;
      if (scanLineYRef.current > h + 100) {
        scanLineYRef.current = -50;
      }
      const scanY = scanLineYRef.current;

      // 2. Draw active firewall horizontal scan line
      const scanGlow = ctx.createLinearGradient(0, scanY - 30, 0, scanY);
      scanGlow.addColorStop(0, 'rgba(0, 242, 254, 0)');
      scanGlow.addColorStop(0.9, 'rgba(0, 242, 254, 0.05)');
      scanGlow.addColorStop(1, 'rgba(0, 242, 254, 0.18)');
      
      ctx.fillStyle = scanGlow;
      ctx.fillRect(0, scanY - 30, w, 30);

      // Draw bright core of scan line
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(w, scanY);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Draw active ripples/shockwaves from mouse clicks
      for (const r of ripples) {
        if (!r.active) continue;
        
        r.radius += 5;
        r.opacity = (1 - r.radius / r.maxRadius) * 0.8;

        if (r.radius >= r.maxRadius) {
          r.active = false;
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 242, 254, ${r.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner glowing border
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0, r.radius - 8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(79, 172, 254, ${r.opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 4. Update and Draw Binary Stream Columns (Matrix Rain style)
      ctx.font = '10px JetBrains Mono, Fira Code, monospace';
      ctx.textBaseline = 'top';
      
      for (const col of columns) {
        col.y += col.speed;
        if (col.y > h) {
          col.y = -col.chars.length * 15;
          col.speed = Math.random() * 1.5 + 0.8;
        }

        // Draw each character in the column stream
        col.chars.forEach((char, index) => {
          const charY = col.y + index * 14;
          if (charY < 0 || charY > h) return;

          // Make characters closer to the head of the stream brighter
          const progress = index / col.chars.length;
          let charOpacity = col.opacity * progress;
          
          // Make it glow if scan line is nearby
          const distToScan = Math.abs(charY - scanY);
          if (distToScan < 40) {
            charOpacity += (1 - distToScan / 40) * 0.25;
          }

          // Randomly mutate characters to make it alive
          if (Math.random() > 0.98) {
            col.chars[index] = Math.random() > 0.5 ? '1' : '0';
          }

          ctx.fillStyle = `rgba(0, 255, 135, ${charOpacity})`; // neon-green
          ctx.fillText(char, col.x, charY);
        });
      }

      // 5. Update and Draw nodes
      for (const p of nodes) {
        // Natural pulse oscillation
        p.pulseTime += p.pulseSpeed;
        const pulse = Math.sin(p.pulseTime) * 0.15;
        const currentOpacity = Math.min(1, Math.max(0.1, p.opacity + pulse));

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.025;
          p.vy += (dy / dist) * force * 0.025;
        }

        // Ripple/shockwave repulsion force
        for (const r of ripples) {
          if (!r.active) continue;
          const rdx = p.x - r.x;
          const rdy = p.y - r.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          // Push nodes outward as shockwave front reaches them
          if (Math.abs(rdist - r.radius) < 25) {
            const rforce = (25 - Math.abs(rdist - r.radius)) / 25;
            p.vx += (rdx / rdist) * rforce * 0.8 * r.opacity;
            p.vy += (rdy / rdist) * rforce * 0.8 * r.opacity;
          }
        }

        // Damping/friction
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw connections
        for (let j = 0; j < nodes.length; j++) {
          const p2 = nodes[j];
          if (p === p2) continue;

          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < CONNECTION_DISTANCE) {
            // Fades lines smoothly with distance
            let lineOpacity = (1 - cdist / CONNECTION_DISTANCE) * 0.16;

            // Amplify opacity if connection is close to scan line or mouse
            const avgY = (p.y + p2.y) / 2;
            const distToScan = Math.abs(avgY - scanY);
            if (distToScan < 50) {
              lineOpacity += (1 - distToScan / 50) * 0.15;
            }

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Draw gradient-like connections
            ctx.strokeStyle = `rgba(0, 242, 254, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw Node Geometry (Dots or Tech Crosses)
        let finalOpacity = currentOpacity;
        const distToScan = Math.abs(p.y - scanY);
        if (distToScan < 30) {
          // Glow brighter under radar scan
          finalOpacity = Math.min(1.0, finalOpacity + (1 - distToScan / 30) * 0.6);
        }

        ctx.fillStyle = `rgba(0, 242, 254, ${finalOpacity})`;
        
        if (p.type === 'cross') {
          // Draw a small HUD target crosshairs '+'
          const len = p.size * 2;
          ctx.beginPath();
          ctx.moveTo(p.x - len, p.y);
          ctx.lineTo(p.x + len, p.y);
          ctx.moveTo(p.x, p.y - len);
          ctx.lineTo(p.x, p.y + len);
          ctx.strokeStyle = `rgba(0, 242, 254, ${finalOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Core dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw glowing round node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Outer pulse glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(79, 172, 254, ${finalOpacity * 0.15})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('click', handleClick);
    };
  }, [initCyberCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    />
  );
}
