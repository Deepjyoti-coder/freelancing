'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ExternalLink, 
  MapPin, 
  Sparkles, 
  Quote, 
  Laptop, 
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { FEATURED_PROJECTS } from '@/lib/mockData';

export const ClientWorkShowcase: React.FC = () => {
  const project = FEATURED_PROJECTS[0];
  const [activeView, setActiveView] = useState<'cover' | 'letter'>('cover');

  if (!project) return null;

  return (
    <section id="portfolio" className="max-w-7xl mx-auto px-6 space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold tracking-wide">
          <Sparkles size={14} className="text-rose-500" />
          <span>Real Client Showcase</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Handcrafted Stories That <GradientText>Moved Hearts</GradientText>
        </h2>
        <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
          See a live example of what we create for clients. Every project is unique, emotionally tailored, and engineered with precision.
        </p>
      </div>

      {/* Main Feature Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950 text-white rounded-[36px] p-6 md:p-12 shadow-2xl border border-slate-800/80 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: Visual Mockup */}
          <div className="lg:col-span-7 space-y-4">
            {/* View Switcher Pills */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Live in Production
                </span>
              </div>

              <div className="flex items-center gap-1 bg-slate-800/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/60 text-xs">
                <button
                  onClick={() => setActiveView('cover')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    activeView === 'cover'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Cover & Envelope
                </button>
                <button
                  onClick={() => setActiveView('letter')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    activeView === 'letter'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Letter View
                </button>
              </div>
            </div>

            {/* Desktop Mockup Frame */}
            <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl group relative">
              {/* Browser Bar */}
              <div className="bg-slate-950/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] text-slate-400 font-mono pl-3 select-all truncate max-w-[220px] sm:max-w-xs">
                    https://anikesh.lovable.app
                  </span>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition"
                >
                  Open Site <ExternalLink size={12} />
                </a>
              </div>

              {/* Preview Image */}
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeView === 'cover' ? project.thumbnailUrl : (project.secondaryImageUrl || project.thumbnailUrl)}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Floating Badge on Mockup */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-rose-400 flex-shrink-0" />
                    <span className="font-semibold text-slate-200">Gorakhpur, UP ➔ New Delhi</span>
                  </div>
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-md font-mono font-bold">
                    820 km
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Details & Story */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {project.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {project.occasion}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                {project.title}
              </h3>

              <p className="text-rose-300/90 text-sm font-semibold italic">
                &ldquo;{project.tagline}&rdquo;
              </p>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {project.description}
            </p>

            {/* Feature Highlights */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Interactive Features Built:
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 size={14} className="text-rose-400 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Client Testimonial snippet */}
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400">
                <Quote size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Client Words</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                &ldquo;Love doesn&apos;t count kilometers. It counts moments. She was so surprised and happy to receive this digital letter!&rdquo;
              </p>
              <p className="text-[11px] font-bold text-slate-400">
                — {project.client} (Client from Gorakhpur)
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px]"
              >
                <Button
                  variant="primary"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-3 shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2"
                >
                  Visit Live Client Website <ExternalLink size={16} />
                </Button>
              </a>

              <Link href={`/s/${project.previewSlug}`} className="min-w-[150px]">
                <Button
                  variant="secondary"
                  className="w-full bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 font-semibold py-3 flex items-center justify-center gap-2"
                >
                  <Laptop size={14} /> Internal Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="block text-xl md:text-2xl font-black text-white">820 km</span>
            <span className="text-[11px] font-medium text-slate-400">Distance Spanned</span>
          </div>
          <div>
            <span className="block text-xl md:text-2xl font-black text-rose-400">100% Custom</span>
            <span className="text-[11px] font-medium text-slate-400">Design & Storyline</span>
          </div>
          <div>
            <span className="block text-xl md:text-2xl font-black text-white">48 Hours</span>
            <span className="text-[11px] font-medium text-slate-400">Turnaround Time</span>
          </div>
          <div>
            <span className="block text-xl md:text-2xl font-black text-emerald-400">Delighted</span>
            <span className="text-[11px] font-medium text-slate-400">Client Reaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};
