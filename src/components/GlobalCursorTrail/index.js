import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export default function GlobalCursorTrail() {
  const [fluidTrail, setFluidTrail] = useState([]);
  const [fringeParticles, setFringeParticles] = useState([]);
  const [clickPulse, setClickPulse] = useState([]);
  const lastPointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handlePointerMove = (event) => {
      const next = { x: event.clientX, y: event.clientY };
      const prev = lastPointer.current.active ? lastPointer.current : { x: next.x, y: next.y, active: true };

      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 1) {
        lastPointer.current = { ...next, active: true };
        return;
      }

      const steps = Math.max(3, Math.min(6, Math.ceil(distance / 8)));
      const mainTrail = [];
      const sideTrail = [];
      const nx = dy === 0 ? 1 : -dy / distance;
      const ny = dx === 0 ? 0 : dx / distance;

      for (let i = 0; i < steps; i += 1) {
        const t = i / steps;
        const x = prev.x + dx * t;
        const y = prev.y + dy * t;
        const driftX = (Math.random() - 0.5) * 8;
        const driftY = (Math.random() - 0.5) * 8;
        const size = 9 + distance * 0.05 + Math.random() * 5;

        mainTrail.push({
          id: `${Date.now()}-${Math.random()}-${i}`,
          x,
          y,
          size,
          opacity: 0.68,
          driftX,
          driftY,
          delay: i * 0.014,
        });

        if (i % 2 === 0 && Math.random() > 0.18) {
          const overlapBias = Math.random() * 0.9 + 0.2;
          const offset = 8 + Math.random() * 18;
          const sideX = x + nx * offset * overlapBias - (dx * 0.12 || 0);
          const sideY = y + ny * offset * overlapBias - (dy * 0.12 || 0);
          sideTrail.push({
            id: `${Date.now()}-${Math.random()}-side-${i}`,
            x: sideX,
            y: sideY,
            size: 4 + Math.random() * 7,
            opacity: 0.64,
            driftX: (Math.random() - 0.5) * 10,
            driftY: (Math.random() - 0.5) * 10,
            delay: i * 0.018,
          });
        }
      }

      setFluidTrail((prevTrail) => [...prevTrail, ...mainTrail].slice(-24));
      setFringeParticles((prevTrail) => [...prevTrail, ...sideTrail].slice(-40));
      lastPointer.current = { ...next, active: true };
    };

    const handlePointerDown = (event) => {
      const baseX = event.clientX;
      const baseY = event.clientY;
      const ringColors = [
        'rgba(255,255,255,0.72)',
        'rgba(216,180,254,0.68)',
        'rgba(196,181,253,0.6)',
        'rgba(192,132,252,0.52)',
        'rgba(168,85,247,0.38)',
      ];

      const rippleSet = Array.from({ length: 5 }, (_, index) => {
        const size = 22 + index * 24 + Math.random() * 8;
        const duration = 0.52 + index * 0.1 + Math.random() * 0.08;
        const delay = index * 0.09;

        return {
          id: `${Date.now()}-${Math.random()}-${index}`,
          x: baseX,
          y: baseY,
          size,
          duration,
          delay,
          opacity: 0.76 - index * 0.08,
          borderColor: ringColors[index % ringColors.length],
          borderWidth: 1.5 + index * 0.8,
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(216,180,254,0.08) 30%, rgba(168,85,247,0.04) 58%, rgba(15,23,42,0) 75%)',
        };
      });

      setClickPulse((prev) => [...prev, ...rippleSet].slice(-30));

      rippleSet.forEach((pulse) => {
        window.setTimeout(() => {
          setClickPulse((prev) => prev.filter((item) => item.id !== pulse.id));
        }, (pulse.duration + pulse.delay + 0.25) * 1000);
      });
    };

    const handlePointerLeave = () => {
      setFluidTrail([]);
      setFringeParticles([]);
      setClickPulse([]);
      lastPointer.current = { x: 0, y: 0, active: false };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div className={styles.cursorTrail} aria-hidden="true">
      {fluidTrail.map((point) => (
        <span
          key={point.id}
          className={styles.fluidBlob}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            opacity: point.opacity,
            animationDelay: `${point.delay}s`,
            '--dx': `${point.driftX}px`,
            '--dy': `${point.driftY}px`,
          }}
        />
      ))}

      {fringeParticles.map((point) => (
        <span
          key={point.id}
          className={styles.fringeParticle}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            opacity: point.opacity,
            animationDelay: `${point.delay}s`,
            '--dx': `${point.driftX}px`,
            '--dy': `${point.driftY}px`,
          }}
        />
      ))}

      {clickPulse.map((point) => (
        <span
          key={point.id}
          className={styles.clickPulse}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            opacity: point.opacity,
            background: point.background,
            borderColor: point.borderColor,
            borderWidth: `${point.borderWidth}px`,
            animationDelay: `${point.delay}s`,
            animationDuration: `${point.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
