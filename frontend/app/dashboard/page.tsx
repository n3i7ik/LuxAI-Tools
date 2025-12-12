'use client';

import { useEffect, useRef, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import GlassmorphicCard from '@/components/GlassmorphicCard';

const chartData = [
  { month: 'Jan', summarizations: 120, translations: 80, meetings: 60 },
  { month: 'Feb', summarizations: 150, translations: 95, meetings: 75 },
  { month: 'Mar', summarizations: 180, translations: 110, meetings: 90 },
  { month: 'Apr', summarizations: 200, translations: 140, meetings: 110 },
  { month: 'May', summarizations: 240, translations: 160, meetings: 130 },
  { month: 'Jun', summarizations: 280, translations: 190, meetings: 150 },
];

const toolUsage = [
  { name: 'Summarizer', value: 45, color: '#d4af37' },
  { name: 'Translator', value: 30, color: '#a0860d' },
  { name: 'Meeting Notes', value: 25, color: '#8b6f47' },
];

const productivityStats = [
  { label: 'Time Saved', value: '240 hrs', icon: '⏱️' },
  { label: 'Documents Processed', value: '1,250+', icon: '📄' },
  { label: 'Languages Supported', value: '50+', icon: '🌐' },
  { label: 'User Satisfaction', value: '98%', icon: '⭐' },
];

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartOpacity, setChartOpacity] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();
      tl.from(containerRef.current.querySelector('h1'), {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
      })
        .from(
          containerRef.current.querySelectorAll('.stat-card'),
          {
            duration: 0.5,
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .from(
          containerRef.current.querySelectorAll('.chart-card'),
          {
            duration: 0.6,
            opacity: 0,
            y: 30,
            stagger: 0.15,
            ease: 'power2.out',
          },
          '-=0.5'
        );

      setChartOpacity(1);
    }
  }, []);

  return (
    <main className="bg-gradient-luxury min-h-screen">
      <ParticleBackground />
      <Navbar />

      <div ref={containerRef} className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-luxury-light">
            Productivity Dashboard
          </h1>
          <p className="text-luxury-light/70 text-lg mb-12">
            Track your AI-powered productivity metrics
          </p>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {productivityStats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <GlassmorphicCard title={stat.label} description="">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{stat.icon}</span>
                    <p className="text-3xl font-bold text-luxury-accent">{stat.value}</p>
                  </div>
                </GlassmorphicCard>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Activity Trend Chart */}
            <div className="chart-card">
              <GlassmorphicCard title="Activity Trend" description="Last 6 months">
                <div style={{ opacity: chartOpacity, transition: 'opacity 0.8s ease' }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid stroke="rgba(212, 175, 55, 0.1)" strokeDasharray="0" />
                      <XAxis stroke="rgba(212, 175, 55, 0.4)" />
                      <YAxis stroke="rgba(212, 175, 55, 0.4)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(10, 14, 39, 0.9)',
                          border: '1px solid rgba(212, 175, 55, 0.4)',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="summarizations"
                        stroke="#d4af37"
                        dot={{ fill: '#d4af37', r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="translations"
                        stroke="#a0860d"
                        dot={{ fill: '#a0860d', r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="meetings"
                        stroke="#8b6f47"
                        dot={{ fill: '#8b6f47', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassmorphicCard>
            </div>

            {/* Tool Usage Pie Chart */}
            <div className="chart-card">
              <GlassmorphicCard title="Tool Usage Distribution" description="By percentage">
                <div style={{ opacity: chartOpacity, transition: 'opacity 0.8s ease' }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={toolUsage}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#d4af37"
                        dataKey="value"
                      >
                        {toolUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(10, 14, 39, 0.9)',
                          border: '1px solid rgba(212, 175, 55, 0.4)',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </GlassmorphicCard>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="chart-card">
            <GlassmorphicCard title="Tool Performance Comparison" description="">
              <div style={{ opacity: chartOpacity, transition: 'opacity 0.8s ease' }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid stroke="rgba(212, 175, 55, 0.1)" strokeDasharray="0" />
                    <XAxis stroke="rgba(212, 175, 55, 0.4)" />
                    <YAxis stroke="rgba(212, 175, 55, 0.4)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(10, 14, 39, 0.9)',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="summarizations" fill="#d4af37" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="translations" fill="#a0860d" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="meetings" fill="#8b6f47" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </div>
    </main>
  );
}
