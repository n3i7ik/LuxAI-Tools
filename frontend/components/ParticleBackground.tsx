'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = [];
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-luxury-accent rounded-full opacity-30';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      containerRef.current.appendChild(particle);

      const tl = gsap.timeline({ repeat: -1 });
      tl.to(particle, {
        duration: 4 + Math.random() * 3,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        opacity: 0.5 + Math.random() * 0.5,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
      }}
    />
  );
}
