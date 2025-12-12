'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import Link from 'next/link';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline();
      tl.from(heroRef.current.querySelector('h1'), {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
      })
        .from(
          heroRef.current.querySelector('p'),
          {
            duration: 0.8,
            opacity: 0,
            y: 30,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          heroRef.current.querySelectorAll('button'),
          {
            duration: 0.6,
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.4'
        );
    }

    if (ctaRef.current) {
      gsap.from(ctaRef.current.querySelectorAll('.card-item'), {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        stagger: 0.2,
      });
    }
  }, []);

  return (
    <main className="bg-gradient-luxury min-h-screen">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-luxury-accent via-luxury-accent/80 to-luxury-accent/60 bg-clip-text text-transparent">
              LuxAI Tools
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-luxury-light/70 mb-8 leading-relaxed">
            Experience premium AI-powered productivity. Summarize, translate, and transform your
            workflow with elegance and intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/summarizer">
              <button className="px-8 py-4 bg-luxury-accent text-luxury-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-luxury-accent/50 transition-all duration-300">
                Get Started
              </button>
            </Link>
            <button className="px-8 py-4 border-2 border-luxury-accent text-luxury-accent rounded-lg font-semibold hover:bg-luxury-accent/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        ref={ctaRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-luxury-light">
            Premium Tools at Your Service
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/summarizer">
              <GlassmorphicCard
                title="Summarizer"
                description="Condense lengthy texts into concise, insightful summaries with advanced AI."
                icon="📝"
                className="card-item h-full"
              >
                <button className="w-full mt-4 px-4 py-2 bg-luxury-accent/20 text-luxury-accent rounded-lg hover:bg-luxury-accent/30 transition-all duration-300">
                  Explore
                </button>
              </GlassmorphicCard>
            </Link>

            <Link href="/translator">
              <GlassmorphicCard
                title="Translator"
                description="Break language barriers with premium translation across 50+ languages."
                icon="🌐"
                className="card-item h-full"
              >
                <button className="w-full mt-4 px-4 py-2 bg-luxury-accent/20 text-luxury-accent rounded-lg hover:bg-luxury-accent/30 transition-all duration-300">
                  Explore
                </button>
              </GlassmorphicCard>
            </Link>

            <Link href="/meeting-notes">
              <GlassmorphicCard
                title="Meeting Notes"
                description="Transform meeting transcripts into polished, actionable notes automatically."
                icon="📊"
                className="card-item h-full"
              >
                <button className="w-full mt-4 px-4 py-2 bg-luxury-accent/20 text-luxury-accent rounded-lg hover:bg-luxury-accent/30 transition-all duration-300">
                  Explore
                </button>
              </GlassmorphicCard>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-luxury-accent/20 glass-dark">
        <div className="max-w-6xl mx-auto text-center text-luxury-light/60">
          <p>© 2025 LuxAI Tools. Crafted with elegance and AI intelligence.</p>
        </div>
      </footer>
    </main>
  );
}
