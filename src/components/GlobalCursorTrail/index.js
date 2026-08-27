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
      // determine burst style from closest data-burst attribute or element type
      const el = event.target;
      const byAttr = el.closest && el.closest('[data-burst]') ? el.closest('[data-burst]').getAttribute('data-burst') : null;
      let burstType = byAttr || 'default';

      if (!byAttr) {
        const btn = el.closest && el.closest('button, [role="button"]');
        const link = el.closest && el.closest('a');
        const folder = el.closest && el.closest('.groupItem, [data-folder]');
        if (btn) burstType = 'button';
        else if (link) burstType = 'link';
        else if (folder) burstType = 'folder';
      }

      const colorSets = {
        default: ['#7dd3fc', '#c4b5fd', '#a78bfa', '#93c5fd', '#e9d5ff'],
        strong: ['#7dd3fc', '#60a5fa', '#93c5fd', '#a78bfa', '#c4b5fd'],
        glitter: ['#7dd3fc', '#93c5fd', '#a78bfa', '#dbeafe', '#e9d5ff'],
        link: ['#93c5fd', '#7dd3fc', '#a78bfa'],
        button: ['#a78bfa', '#7dd3fc', '#60a5fa'],
        folder: ['#c4b5fd', '#7dd3fc', '#a78bfa'],
      };

      const colors = colorSets[burstType] || colorSets.default;

      // variant generation
      const burstsToAdd = [];

      if (burstType === 'strong' || burstType === 'default' || burstType === 'button') {
        const burstCount = 28 + Math.floor(Math.random() * 18);
        for (let i = 0; i < burstCount; i++) {
          const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.6;
          const speed = 36 + Math.random() * 84;
          burstsToAdd.push({
            id: `${Date.now()}-${Math.random()}-b${i}`,
            kind: 'particle',
            x: event.clientX,
            y: event.clientY,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            size: 2 + Math.random() * 5,
            duration: 0.48 + Math.random() * 0.6,
            color: colors[i % colors.length],
          });
        }
      }

      if (burstType === 'glitter' || burstType === 'link') {
        // add halo
        burstsToAdd.push({
          id: `${Date.now()}-halo-${Math.random()}`,
          kind: 'halo',
          x: event.clientX,
          y: event.clientY,
          size: 36 + Math.random() * 32,
          duration: 0.6 + Math.random() * 0.4,
          color: colors[0],
        });

        // small crack fragments
        const crackCount = 8 + Math.floor(Math.random() * 8);
        for (let i = 0; i < crackCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 18 + Math.random() * 42;
          burstsToAdd.push({
            id: `${Date.now()}-cr${i}-${Math.random()}`,
            kind: 'crack',
            x: event.clientX,
            y: event.clientY,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            size: 1 + Math.random() * 2.2,
            duration: 0.34 + Math.random() * 0.46,
            color: colors[(i + 1) % colors.length],
          });
        }
      }

      if (burstType === 'folder') {
        // medium burst + longer trail for folders
        const burstCount = 20 + Math.floor(Math.random() * 14);
        for (let i = 0; i < burstCount; i++) {
          const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.8;
          const speed = 28 + Math.random() * 62;
          burstsToAdd.push({
            id: `${Date.now()}-${Math.random()}-f${i}`,
            kind: 'particle',
            x: event.clientX,
            y: event.clientY,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            size: 2 + Math.random() * 4.2,
            duration: 0.56 + Math.random() * 0.64,
            color: colors[i % colors.length],
          });
        }
      }

      // fallback small burst if nothing added
      if (burstsToAdd.length === 0) {
        burstsToAdd.push({
          id: `${Date.now()}-mini-${Math.random()}`,
          kind: 'particle',
          x: event.clientX,
          y: event.clientY,
          dx: (Math.random() - 0.5) * 36,
          dy: (Math.random() - 0.5) * 36,
          size: 2.4 + Math.random() * 2.6,
          duration: 0.36 + Math.random() * 0.42,
          color: colors[0],
        });
      }

      setBursts((prevBursts) => [...prevBursts, ...burstsToAdd].slice(-420));

      burstsToAdd.forEach((item) => {
        window.setTimeout(() => {
          setBursts((prevBursts) => prevBursts.filter((burst) => burst.id !== item.id));
        }, (item.duration + 0.28) * 1000);
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

      {bursts.map((point) => {
        if (point.kind === 'halo') {
          return (
            <span
              key={point.id}
              className={styles.burstHalo}
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                width: `${point.size}px`,
                height: `${point.size}px`,
                background: `radial-gradient(circle, ${point.color} 0%, transparent 60%)`,
                animationDuration: `${point.duration}s`,
              }}
            />
          );
        }

        if (point.kind === 'crack') {
          return (
            <span
              key={point.id}
              className={styles.burstCrack}
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                width: `${point.size}px`,
                height: `${point.size}px`,
                background: point.color,
                boxShadow: `0 0 8px ${point.color}`,
                animationDuration: `${point.duration}s`,
                '--dx': `${point.dx}px`,
                '--dy': `${point.dy}px`,
              }}
            />
          );
        }

        return (
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
        );
      })}
    </div>
  );
}
