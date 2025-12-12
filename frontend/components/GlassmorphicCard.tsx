'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GlassmorphicCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function GlassmorphicCard({
  title,
  description,
  icon,
  children,
  className = '',
}: GlassmorphicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        duration: 0.4,
        y: -10,
        boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)',
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.4,
        y: 0,
        boxShadow: '0 0 20px rgba(212, 175, 55, 0.1)',
        ease: 'power2.out',
      });
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glass glow p-6 rounded-xl border border-luxury-accent/30 hover:border-luxury-accent/60 transition-all duration-500 cursor-pointer ${className}`}
    >
      {icon && <div className="text-4xl mb-4 text-luxury-accent">{icon}</div>}
      <h3 className="text-xl font-bold text-luxury-light mb-2">{title}</h3>
      <p className="text-luxury-light/60 mb-4">{description}</p>
      {children}
    </div>
  );
}
