'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SurpriseData } from '@/lib/mockData';

interface TemplateProps {
  data: SurpriseData;
  activeStep: number;
  nextStep: () => void;
}

export const AnniversaryTemplate: React.FC<TemplateProps> = ({ data, activeStep, nextStep }) => {
  useEffect(() => {
    if (activeStep === 4) {
      // Trigger golden anniversary confetti
      const end = Date.now() + 3 * 1000;
      const colors = ['#FBBF24', '#F59E0B', '#D97706'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [activeStep]);

  const colors = data.themeColors || {
    primary: '#8B5CF6',
    secondary: '#3B82F6',
    background: '#FAF5FF',
    text: '#2E1065',
    accent: '#10B981'
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-between p-6 transition-colors duration-500 font-sans"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Decorative lines */}
      {activeStep === 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-purple-500 rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-indigo-500 rounded-full" />
        </div>
      )}

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full relative z-10 py-12">
        {activeStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <span className="inline-block p-4 rounded-3xl bg-white shadow-sm border border-purple-100 mb-2">
              <Sparkles size={36} className="text-purple-600 animate-spin" style={{ color: colors.primary }} />
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Happy Anniversary, {data.recipientName}
            </h1>
            <p className="text-base md:text-lg opacity-80 max-w-md mx-auto">
              A celebration of everything you&apos;ve built together. Let&apos;s look back at the beautiful road you&apos;ve traveled.
            </p>
            <button
              onClick={nextStep}
              className="px-8 py-4 text-white font-semibold rounded-full hover:opacity-95 transition-all flex items-center gap-2 mx-auto shadow-md"
              style={{ backgroundColor: colors.primary }}
            >
              Explore Milestones <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {activeStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-center mb-2">Captured Memories</h2>
            <p className="text-sm opacity-75 text-center mb-6">Moments that became the pillars of your story.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {data.photos.slice(0, 4).map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white p-3 rounded-2xl shadow-sm border border-purple-100/50 flex flex-col items-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt="Anniversary milestone"
                    className="w-full aspect-[4/3] object-cover rounded-xl"
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center pt-6">
              <button
                onClick={nextStep}
                className="px-6 py-3 text-white font-medium rounded-full hover:opacity-95 transition-all inline-flex items-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                Our Journey Timeline <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {activeStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-serif font-bold text-center mb-8">Chapters of Togetherness</h2>
            
            <div className="relative border-l border-purple-200 ml-4 space-y-8 pb-4">
              {data.memories.map((memory, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className="relative pl-8"
                >
                  <span 
                    className="absolute -left-3 top-1.5 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Sparkles size={10} className="text-white" />
                  </span>
                  
                  <div className="bg-white p-5 rounded-2xl border border-purple-50 shadow-sm space-y-3">
                    {memory.date && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                        {memory.date}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-slate-800">{memory.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{memory.description}</p>
                    
                    {memory.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={memory.imageUrl}
                        alt={memory.title}
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={nextStep}
                className="px-6 py-3 text-white font-medium rounded-full hover:opacity-95 transition-all inline-flex items-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                Read Anniversary Note <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {activeStep === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-center mb-6">A Letter of Love</h2>
            
            <div className="bg-white border border-purple-100 rounded-3xl p-8 shadow-md leading-relaxed space-y-4">
              <p className="text-lg font-serif italic text-purple-600">Dear {data.recipientName},</p>
              <div className="text-slate-700 whitespace-pre-line text-base font-serif pl-2">
                {data.message}
              </div>
              <p className="text-right text-lg font-bold italic text-slate-800 mt-6">— {data.senderName}</p>
            </div>

            <div className="text-center pt-6">
              <button
                onClick={nextStep}
                className="px-8 py-4 text-white font-bold rounded-full hover:opacity-95 transition-all inline-flex items-center gap-2 shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                Reveal Celebration Card <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {activeStep === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="relative inline-block">
              <span className="inline-block p-6 rounded-full bg-purple-100 text-purple-600 mb-2">
                <Sparkles size={48} className="animate-spin" style={{ animationDuration: '4s' }} />
              </span>
            </div>

            <div className="space-y-4 font-serif">
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Cheers to Your Love! 🥂
              </h1>
              <p className="text-lg text-slate-500 max-w-md mx-auto font-sans">
                May your love continue to grow and inspire everyone around you. Created by {data.senderName}.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-50 max-w-sm mx-auto shadow-sm font-sans">
              <p className="text-xs text-slate-400 mb-2">Want to build an anniversary page like this?</p>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 transition"
              >
                Explore Moments by Deepjyoti <Sparkles size={14} className="text-purple-500" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
