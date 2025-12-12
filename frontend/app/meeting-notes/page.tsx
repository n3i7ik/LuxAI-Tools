'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import GlassmorphicCard from '@/components/GlassmorphicCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface TimelineItem {
  timestamp: string;
  title: string;
  description: string;
}

export default function MeetingNotes() {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState('');
  const [notes, setNotes] = useState('');
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerateNotes = async () => {
    if (!file && !transcript) return;

    setLoading(true);
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      if (transcript) {
        formData.append('transcript', transcript);
      }

      const response = await axios.post(`${API_URL}/meeting-notes/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 100)
          );
          setUploadProgress(percent);
        },
      });

      setNotes(response.data.notes);
      setTimeline(response.data.timeline || []);
    } catch (error) {
      setNotes('Error generating notes. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
      setUploadProgress(0);
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
              Meeting Note Generator
            </h1>
            <p className="text-luxury-light/70 text-lg">
              Transform meeting transcripts into polished, actionable notes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1">
              <GlassmorphicCard title="Upload Meeting" description="Add your transcript">
                <div className="space-y-4">
                  {/* File Upload */}
                  <div
                    className="border-2 border-dashed border-luxury-accent/40 rounded-lg p-6 text-center cursor-pointer hover:border-luxury-accent/60 transition-all"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.pdf,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="text-4xl mb-2">📁</div>
                    <p className="text-luxury-light/60">
                      {file ? file.name : 'Click to upload or drag & drop'}
                    </p>
                    <p className="text-sm text-luxury-light/40">TXT, PDF, DOCX</p>
                  </div>

                  {/* Or Paste Text */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-luxury-accent/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gradient-luxury text-luxury-light/60">Or paste text</span>
                    </div>
                  </div>

                  <textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Paste meeting transcript here..."
                    className="w-full h-32 px-4 py-3 bg-luxury-800 text-luxury-light border border-luxury-accent/30 rounded-lg focus:outline-none focus:border-luxury-accent/60 resize-none transition-all placeholder-luxury-light/40"
                  />

                  {uploadProgress > 0 && (
                    <div className="w-full bg-luxury-800 rounded-lg h-2 overflow-hidden">
                      <div
                        className="h-full bg-luxury-accent transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}

                  <button
                    onClick={handleGenerateNotes}
                    disabled={loading || (!file && !transcript)}
                    className="w-full px-6 py-2 bg-luxury-accent text-luxury-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-luxury-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {loading ? 'Generating Notes...' : 'Generate Notes'}
                  </button>
                </div>
              </GlassmorphicCard>
            </div>

            {/* Output Section */}
            <div className="lg:col-span-2 space-y-4">
              {/* Notes Output */}
              {notes && (
                <GlassmorphicCard title="Polished Notes" description="AI-generated summary">
                  <div className="bg-luxury-800/50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <p className="text-luxury-light/80 whitespace-pre-wrap">{notes}</p>
                  </div>
                </GlassmorphicCard>
              )}

              {/* Timeline */}
              {timeline.length > 0 && (
                <GlassmorphicCard title="Meeting Timeline" description="Key moments">
                  <div className="space-y-4">
                    {timeline.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-luxury-accent rounded-full mt-2"></div>
                          {idx !== timeline.length - 1 && (
                            <div className="w-0.5 h-12 bg-luxury-accent/30 mt-2"></div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-luxury-accent font-semibold">{item.timestamp}</p>
                          <p className="text-luxury-light/80 font-medium">{item.title}</p>
                          <p className="text-luxury-light/60 text-sm mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassmorphicCard>
              )}

              {!notes && (
                <GlassmorphicCard
                  title="Results"
                  description="Your notes appear here"
                  className="h-full flex items-center justify-center text-center"
                >
                  <p className="text-luxury-light/50">
                    Upload a file or paste transcript to get started
                  </p>
                </GlassmorphicCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
