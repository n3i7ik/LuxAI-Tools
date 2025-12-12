'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Summarizer', href: '/summarizer' },
  { label: 'Translator', href: '/translator' },
  { label: 'Meeting Notes', href: '/meeting-notes' },
  { label: 'Dashboard', href: '/dashboard' },
];

export default function Navbar() {
  const navRef = useRef<HTMLNavElement>(null);

  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    gsap.from(navElement, {
      duration: 0.8,
      y: -100,
      opacity: 0,
      ease: 'power3.out',
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-luxury-accent/20 backdrop-blur-glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-luxury-accent to-luxury-accent/70 bg-clip-text text-transparent">
              LuxAI
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-luxury-light/70 hover:text-luxury-accent transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex gap-4">
            <button className="px-4 py-2 text-luxury-accent border border-luxury-accent/50 rounded-lg hover:bg-luxury-accent/10 transition-all duration-300">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
