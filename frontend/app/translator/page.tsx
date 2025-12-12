'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import OutputCard from '@/components/OutputCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const languages = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function Translator() {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0].code);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
      });
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTranslate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/translate/`, {
        text: input,
        target_language: selectedLang,
      });
      setTranslation(response.data.translation);
    } catch (error) {
      setTranslation('Error during translation. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedLangObj = languages.find((l) => l.code === selectedLang);

  return (
    <main className="bg-gradient-luxury min-h-screen">
      <ParticleBackground />
      <Navbar />

      <div ref={containerRef} className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-luxury-light">
              Premium Translator
            </h1>
            <p className="text-luxury-light/70 text-lg">
              Break language barriers with AI-powered translations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <GlassmorphicCard title="Source Text" description="English content">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-64 px-4 py-3 bg-luxury-800 text-luxury-light border border-luxury-accent/30 rounded-lg focus:outline-none focus:border-luxury-accent/60 resize-none transition-all placeholder-luxury-light/40"
              />
              <button
                onClick={handleTranslate}
                disabled={loading || input.length === 0}
                className="mt-4 w-full px-6 py-2 bg-luxury-accent text-luxury-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-luxury-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? 'Translating...' : 'Translate'}
              </button>
            </GlassmorphicCard>

            {/* Language & Output Section */}
            <div className="flex flex-col gap-4">
              {/* Language Selector */}
              <div ref={dropdownRef} className="relative">
                <GlassmorphicCard title="Target Language" description="Select destination">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full px-4 py-3 bg-luxury-800 text-luxury-light border border-luxury-accent/30 rounded-lg hover:border-luxury-accent/60 flex items-center justify-between transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-2xl">{selectedLangObj?.flag}</span>
                      <span>{selectedLangObj?.name}</span>
                    </span>
                    <span className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-luxury-800 border border-luxury-accent/30 rounded-lg overflow-hidden z-50">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLang(lang.code);
                            setShowDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-luxury-accent/10 transition-all flex items-center gap-2 group"
                        >
                          <span className="text-2xl">{lang.flag}</span>
                          <span className="text-luxury-light/70 group-hover:text-luxury-accent">
                            {lang.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </GlassmorphicCard>
              </div>

              {/* Output */}
              {translation && (
                <OutputCard
                  title={`Translation to ${selectedLangObj?.name}`}
                  content={translation}
                  highlighted={true}
                />
              )}
              {!translation && (
                <GlassmorphicCard
                  title="Translation Result"
                  description="Output appears here"
                  className="h-full flex items-center justify-center text-center"
                >
                  <p className="text-luxury-light/50">Your translation will appear here</p>
                </GlassmorphicCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
