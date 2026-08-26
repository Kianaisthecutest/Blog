import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export default function GlobalCursorTrail() {
  const [trail, setTrail] = useState([]);
  const [bursts, setBursts] = useState([]);
  const lastPointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handlePointerMove = (event) => {
      const next = { x: event.clientX, y: event.clientY };
      const prev = lastPointer.current.active
        ? lastPointer.current
        : { x: next.x, y: next.y, active: true };

      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const distance = Math.hypot(dx, dy);
      const steps = Math.max(4, Math.ceil(distance / 2.4));
      const particles = [];

      for (let i = 0; i < steps; i += 1) {
        const t = i / steps;
        const travel = Math.min(distance / 10, 28);
        const size = 2.8 + (distance / 48) * 0.9 + i * 0.08 + Math.random() * 1.3;
        particles.push({
          id: `${Date.now()}-${Math.random()}-${i}`,
          x: prev.x + dx * t,
          y: prev.y + dy * t,
          size: Math.max(2.1, size * 0.68),
          delay: i * 0.008,
          offset: (Math.random() - 0.5) * 10,
          travel,
        });
      }

      setTrail((prevTrail) => [...prevTrail, ...particles].slice(-180));
      lastPointer.current = { ...next, active: true };
    };

    const handlePointerDown = (event) => {
      const burstCount = 18 + Math.floor(Math.random() * 8);
      const nextBursts = Array.from({ length: burstCount }, (_, index) => {
        const angle = (Math.PI * 2 * index) / burstCount + Math.random() * 0.5;
        const speed = 26 + Math.random() * 58;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        const colorSet = ['#7dd3fc', '#c4b5fd', '#a78bfa', '#93c5fd', '#e9d5ff'];

        return {
          id: `${Date.now()}-${Math.random()}-${index}`,
          x: event.clientX,
          y: event.clientY,
          dx,
          dy,
          size: 3 + Math.random() * 6,
          duration: 0.44 + Math.random() * 0.38,
          color: colorSet[index % colorSet.length],
        };
      });

      setBursts((prevBursts) => [...prevBursts, ...nextBursts].slice(-220));
      nextBursts.forEach((item) => {
        window.setTimeout(() => {
          setBursts((prevBursts) => prevBursts.filter((burst) => burst.id !== item.id));
        }, (item.duration + 0.2) * 1000);
      });
    };

    const handlePointerLeave = () => {
      setTrail([]);
      setBursts([]);
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
      {trail.map((point) => (
        <span
          key={point.id}
          className={styles.cursorDot}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            animationDelay: `${point.delay}s`,
          }}
        />
      ))}

      {bursts.map((point) => (
        <span
          key={point.id}
          className={styles.burstParticle}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            background: point.color,
            boxShadow: `0 0 12px ${point.color}, 0 0 24px ${point.color}`,
            animationDuration: `${point.duration}s`,
            '--dx': `${point.dx}px`,
            '--dy': `${point.dy}px`,
          }}
        />
      ))}
    </div>
  );
}
