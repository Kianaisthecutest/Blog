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
      const pulse = {
        id: `${Date.now()}-${Math.random()}`,
        x: event.clientX,
        y: event.clientY,
        size: 18 + Math.random() * 18,
        duration: 0.45 + Math.random() * 0.3,
      };

      setClickPulse((prev) => [...prev, pulse].slice(-12));
      window.setTimeout(() => {
        setClickPulse((prev) => prev.filter((item) => item.id !== pulse.id));
      }, (pulse.duration + 0.2) * 1000);
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
            animationDuration: `${point.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
