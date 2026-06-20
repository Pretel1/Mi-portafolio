import { useEffect, useRef, useCallback } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface CyberGlobeProps {
  size?: number; // Size of the canvas
  globeRadius?: number; // Radius of the sphere
  color?: string; // e.g. "rgba(0, 242, 254, " for neon-cyan
  interactive?: boolean; // Mouse interactive tilt
  ringColor?: string; // e.g. "rgba(0, 255, 135, " for neon-green
  pointCount?: number;
  showRings?: boolean;
}

export default function CyberGlobe({
  size = 600,
  globeRadius = 180,
  color = 'rgba(0, 242, 254, ',
  interactive = true,
  ringColor = 'rgba(0, 255, 135, ',
  pointCount = 180,
  showRings = true,
}: CyberGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point3D[]>([]);
  const rotationRef = useRef({ x: 0.2, y: 0.5, speedX: 0.002, speedY: 0.004 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef<number>(0);

  // Initialize points on a sphere using Fibonacci lattice
  const initGlobePoints = useCallback(() => {
    const pts: Point3D[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI * goldenRatio;

    for (let i = 0; i < pointCount; i++) {
      const t = i / pointCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      const x = Math.sin(inclination) * Math.cos(azimuth);
      const y = Math.sin(inclination) * Math.sin(azimuth);
      const z = Math.cos(inclination);

      pts.push({ x, y, z });
    }
    pointsRef.current = pts;
  }, [pointCount]);

  useEffect(() => {
    initGlobePoints();
  }, [initGlobePoints]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      // Map to target angles
      mouseRef.current.targetY = x * 0.0015;
      mouseRef.current.targetX = -y * 0.0015;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const animate = () => {
      const cx = size / 2;
      const cy = size / 2;

      ctx.clearRect(0, 0, size, size);

      // Smooth mouse tilt interpolation
      if (interactive) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      }

      // Update rotation angles
      rotationRef.current.y += rotationRef.current.speedY;
      rotationRef.current.x += rotationRef.current.speedX;

      const angleX = rotationRef.current.x + mouseRef.current.x;
      const angleY = rotationRef.current.y + mouseRef.current.y;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // 1. Draw Globe Core Glow Radial Gradient
      const coreGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, globeRadius);
      coreGlow.addColorStop(0, color + '0.08)');
      coreGlow.addColorStop(0.5, color + '0.03)');
      coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Project all points to 3D and then 2D
      const projected = pointsRef.current.map((p) => {
        // Rotate around Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y1 = p.y;

        // Rotate around X axis
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        // Perspective Projection
        const fov = 400;
        const scale = fov / (fov + z2 * globeRadius);
        const px = cx + x2 * globeRadius * scale;
        const py = cy + y2 * globeRadius * scale;

        return { px, py, z: z2, xRaw: x2, yRaw: y2 };
      });

      // 2. Draw connections (lines) between points that are close to each other in 3D
      ctx.lineWidth = 0.5;
      const threshold = 0.23; // distance threshold in 3D space

      for (let i = 0; i < projected.length; i++) {
        const p1 = pointsRef.current[i];
        const proj1 = projected[i];

        // Draw connections to nearby points
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = pointsRef.current[j];
          const proj2 = projected[j];

          // Compute 3D distance
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < threshold) {
            // Opacity based on average depth (fade out points on the back side)
            const avgDepth = (proj1.z + proj2.z) / 2;
            const lineOpacity = Math.max(0, (1 - avgDepth) * 0.15);

            ctx.beginPath();
            ctx.moveTo(proj1.px, proj1.py);
            ctx.lineTo(proj2.px, proj2.py);
            ctx.strokeStyle = color + `${lineOpacity})`;
            ctx.stroke();
          }
        }
      }

      // 3. Draw Outer Orbit HUD Rings (if enabled)
      if (showRings) {
        // Draw 3D outer ring of dots
        const ringSegments = 60;
        const ringRadius = globeRadius * 1.15;
        const ringAngle = rotationRef.current.y * -0.5; // rotate in reverse
        const cosR = Math.cos(ringAngle);
        const sinR = Math.sin(ringAngle);

        ctx.strokeStyle = ringColor + '0.12)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 12]);
        
        // Draw 2 intersecting ring paths
        ctx.beginPath();
        for (let i = 0; i <= ringSegments; i++) {
          const theta = (i / ringSegments) * Math.PI * 2;
          const rx = Math.cos(theta) * ringRadius;
          const rz = Math.sin(theta) * ringRadius;
          
          // Tilt and rotate this ring
          const rx1 = rx * cosR - rz * sinR;
          const rz1 = rx * sinR + rz * cosR;
          const ry1 = rz1 * 0.35; // tilt

          const fov = 400;
          const scale = fov / (fov + rz1);
          const px = cx + rx1 * scale;
          const py = cy + ry1 * scale;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 4. Draw dots (layered: draw back dots first, then front dots)
      // Sort indices by depth z (descending, so higher z is back, lower z is front)
      const sortedIndices = Array.from({ length: projected.length }, (_, i) => i)
        .sort((a, b) => projected[b].z - projected[a].z);

      for (const idx of sortedIndices) {
        const p = projected[idx];
        // Opacity based on depth (z ranges from -1 to 1)
        // front points (z < 0) are brighter, back points (z > 0) are fainter
        const opacity = Math.max(0.04, (1 - p.z) * 0.35);
        const size = (1 - p.z) * 1.5 + 1.2;

        ctx.beginPath();
        ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
        
        // Front points are bright neon-cyan, back are dimmer
        if (p.z < -0.2) {
          ctx.fillStyle = color + `${opacity})`;
          ctx.fill();
          
          // Add micro-glow ring to closest points
          if (p.z < -0.6) {
            ctx.beginPath();
            ctx.arc(p.px, p.py, size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = color + '0.08)';
            ctx.fill();
          }
        } else {
          ctx.fillStyle = color + `${opacity * 0.6})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [size, globeRadius, color, interactive, ringColor, showRings]);

  return (
    <div className="flex items-center justify-center pointer-events-none select-none overflow-visible">
      <canvas
        ref={canvasRef}
        className="pointer-events-none select-none max-w-full max-h-full"
        style={{ filter: 'drop-shadow(0 0 15px rgba(0, 242, 254, 0.15))' }}
      />
    </div>
  );
}
