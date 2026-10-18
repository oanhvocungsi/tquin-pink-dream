import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  pulseSpeed: number;
  type: 'sparkle' | 'orb' | 'petal';
  rotation: number;
  rotationSpeed: number;
  color: string;
}

interface LuxuryCanvasProps {
  currentScene: number;
}

export const LuxuryCanvas: React.FC<LuxuryCanvasProps> = ({ currentScene }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 32 : 65;

    const pinkPalette = [
      'rgba(255, 182, 193, ', // Light Pink
      'rgba(255, 105, 180, ', // Hot Pink
      'rgba(244, 114, 182, ', // Blush Pink
      'rgba(255, 228, 235, ', // Pearl Baby Pink
      'rgba(255, 255, 255, ', // Pearl White
    ];

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'sparkle' | 'orb' | 'petal' =
        typeRand < 0.35 ? 'sparkle' : typeRand < 0.7 ? 'orb' : 'petal';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size:
          type === 'petal'
            ? Math.random() * 8 + 6
            : type === 'sparkle'
            ? Math.random() * 4 + 2
            : Math.random() * 6 + 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: type === 'petal' ? Math.random() * 0.6 + 0.3 : (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.7 + 0.2,
        targetAlpha: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: pinkPalette[Math.floor(Math.random() * pinkPalette.length)],
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const drawSparkle = (
      x: number,
      y: number,
      size: number,
      alpha: number,
      color: string,
      rotation: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = `${color}${alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 105, 180, 0.8)';

      // 4-point Diamond Sparkle Star
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * size * 2.2, Math.sin(angle) * size * 2.2);
        const innerAngle = angle + Math.PI / 4;
        ctx.lineTo(Math.cos(innerAngle) * (size * 0.4), Math.sin(innerAngle) * (size * 0.4));
      }
      ctx.closePath();
      ctx.fill();

      // Core center bright dot
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha + 0.3)})`;
      ctx.fill();

      ctx.restore();
    };

    const drawPetal = (
      x: number,
      y: number,
      size: number,
      alpha: number,
      color: string,
      rotation: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = `${color}${alpha * 0.65})`;
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
      ctx.lineWidth = 0.5;

      // Organic curved luxury petal shape
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.8, size * 0.7, 0, size);
      ctx.bezierCurveTo(-size * 0.8, size * 0.7, -size * 0.8, -size * 0.5, 0, -size);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawOrb = (
      x: number,
      y: number,
      size: number,
      alpha: number,
      color: string
    ) => {
      ctx.save();
      const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 2.5);
      grad.addColorStop(0, `${color}${alpha * 0.8})`);
      grad.addColorStop(0.5, `${color}${alpha * 0.3})`);
      grad.addColorStop(1, `${color}0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Controlled subtle light leaks across scenes
      const leakGrad = ctx.createRadialGradient(
        width * 0.85,
        height * 0.15,
        10,
        width * 0.85,
        height * 0.15,
        Math.max(width, height) * 0.6
      );
      leakGrad.addColorStop(0, currentScene === 1 ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255, 182, 193, 0.12)');
      leakGrad.addColorStop(0.5, 'rgba(253, 242, 245, 0.05)');
      leakGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = leakGrad;
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse alpha
        p.alpha += (p.targetAlpha - p.alpha) * p.pulseSpeed;
        if (Math.abs(p.targetAlpha - p.alpha) < 0.05) {
          p.targetAlpha = Math.random() * 0.8 + 0.2;
        }

        // Mouse gentle interaction
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        // Motion update
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Render based on particle type
        if (p.type === 'sparkle') {
          drawSparkle(p.x, p.y, p.size, p.alpha, p.color, p.rotation);
        } else if (p.type === 'petal') {
          drawPetal(p.x, p.y, p.size, p.alpha, p.color, p.rotation);
        } else {
          drawOrb(p.x, p.y, p.size, p.alpha, p.color);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentScene]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
