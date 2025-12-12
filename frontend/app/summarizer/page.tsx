'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import OutputCard from '@/components/OutputCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function Summarizer() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('english');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleSummarize = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/summarize/`, {
        text: input,
        language: language,
      });
      setSummary(response.data.summary);
    } catch (error) {
      setSummary('Error generating summary. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gradient-luxury min-h-screen">
      <ParticleBackground />
      <Navbar />

      <div ref={containerRef} className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-luxury-light">
              AI Summarizer
            </h1>
            <p className="text-luxury-light/70 text-lg">
              Transform lengthy content into concise, intelligent summaries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <GlassmorphicCard title="Your Content" description="Paste text to summarize">
              <div className="space-y-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 bg-luxury-800 text-luxury-light border border-luxury-accent/30 rounded-lg focus:outline-none focus:border-luxury-accent/60 transition-all"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>

                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your text here... (minimum 100 characters)"
                  className="w-full h-64 px-4 py-3 bg-luxury-800 text-luxury-light border border-luxury-accent/30 rounded-lg focus:outline-none focus:border-luxury-accent/60 resize-none transition-all placeholder-luxury-light/40"
                />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-luxury-light/60">{input.length} characters</span>
                  <button
                    onClick={handleSummarize}
                    disabled={loading || input.length < 100}
                    className="px-6 py-2 bg-luxury-accent text-luxury-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-luxury-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {loading ? 'Summarizing...' : 'Summarize'}
                  </button>
                </div>
              </div>
            </GlassmorphicCard>

            {/* Output Section */}
            <div className="flex flex-col gap-4">
              {summary && (
                <OutputCard
                  title="AI Summary"
                  content={summary}
                  highlighted={true}
                />
              )}
              {!summary && (
                <GlassmorphicCard
                  title="Summary Result"
                  description="Your summary will appear here"
                  className="h-full flex items-center justify-center text-center"
                >
                  <p className="text-luxury-light/50">
                    Enter text and click "Summarize" to get started
                  </p>
                </GlassmorphicCard>
              )}

              {/* Statistics */}
              <GlassmorphicCard title="Statistics" description="">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-luxury-light/60">Input Length</p>
                    <p className="text-2xl font-bold text-luxury-accent">{input.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-luxury-light/60">Summary Length</p>
                    <p className="text-2xl font-bold text-luxury-accent">{summary.length}</p>
                  </div>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
