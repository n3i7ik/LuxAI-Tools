'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface OutputCardProps {
  title: string;
  content: string;
  highlighted?: boolean;
}

export default function OutputCard({
  title,
  content,
  highlighted = false,
}: OutputCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: 'power2.out',
      });
    }
  }, [content]);

  return (
    <div
      ref={cardRef}
      className={`glass rounded-xl p-6 border transition-all duration-300 ${
        highlighted
          ? 'border-luxury-accent/60 bg-luxury-accent/5'
          : 'border-luxury-accent/20'
      }`}
    >
      <h4 className="text-sm font-semibold text-luxury-accent uppercase tracking-wider mb-3">
        {title}
      </h4>
      <p className="text-luxury-light/80 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}
