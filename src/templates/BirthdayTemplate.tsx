'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Calendar, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SurpriseData } from '@/lib/mockData';

interface TemplateProps {
  data: SurpriseData;
  activeStep: number;
  nextStep: () => void;
}

export const BirthdayTemplate: React.FC<TemplateProps> = ({ data, activeStep, nextStep }) => {
  useEffect(() => {
    if (activeStep === 4) {
      // Trigger confetti multiple times for a birthday blast
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [activeStep]);

  const colors = data.themeColors || {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    background: '#F8FAFC',
    text: '#1E293B',
    accent: '#F59E0B'
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-between p-6 transition-colors duration-500"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Dynamic Background Elements */}
      {activeStep === 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-400 rounded-full"
              style={{
                width: Math.random() * 80 + 40,
                height: Math.random() * 80 + 40,
                left: `${Math.random() * 100}%`,
                bottom: '-10%',
                backgroundColor: i % 2 === 0 ? colors.primary : colors.secondary
              }}
              animate={{
                y: '-120vh',
                x: [0, Math.random() * 50 - 25, 0],
                rotate: 360
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full relative z-10 py-12">
        {activeStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <span className="inline-block p-4 rounded-3xl bg-white shadow-sm border border-slate-100 mb-2">
              <Gift size={36} className="text-blue-500" style={{ color: colors.primary }} />
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight">
              Hey {data.recipientName}...
            </h1>
            <p className="text-lg text-slate-500">
              Someone created something special for you. Ready to open your surprise?
            </p>
            <button
              onClick={nextStep}
              className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              Open Your Surprise <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {activeStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-center mb-2">Do you remember these?</h2>
            <p className="text-sm text-slate-500 text-center mb-8">Some of our best smiles, frozen in time.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {data.photos.slice(0, 4).map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -3 : 3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white p-3 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt="Memory"
                    className="w-full aspect-square object-cover rounded-xl mb-2"
                  />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Memory {i + 1}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center pt-8">
              <button
                onClick={nextStep}
                className="px-6 py-3 text-white font-medium rounded-full hover:opacity-95 transition-all inline-flex items-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                View Story <ArrowRight size={16} />
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
            <h2 className="text-3xl font-bold text-center mb-8">Our Journey So Far</h2>
            
            <div className="relative border-l border-slate-200 ml-4 space-y-8 pb-4">
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
                    <Calendar size={10} className="text-white" />
                  </span>
                  
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    {memory.date && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {memory.date}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-slate-900">{memory.title}</h3>
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
                Read Message <ArrowRight size={16} />
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
            <h2 className="text-3xl font-bold text-center mb-6">A Letter for You</h2>
            
            <div className="bg-white/80 border border-slate-150 rounded-3xl p-8 shadow-md leading-relaxed space-y-4">
              <p className="text-lg font-medium italic text-slate-500">Dear {data.recipientName},</p>
              <div className="text-slate-700 whitespace-pre-line text-base font-serif pl-2">
                {data.message}
              </div>
              <p className="text-right text-lg font-bold italic text-slate-800 mt-6">— {data.senderName}</p>
            </div>

            <div className="text-center pt-6">
              <button
                onClick={nextStep}
                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all inline-flex items-center gap-2 shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                The Final Reveal! <ArrowRight size={18} />
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
              <span className="inline-block p-6 rounded-full bg-yellow-100 text-yellow-600 mb-2">
                <Gift size={48} className="animate-bounce" />
              </span>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Happy Birthday, {data.recipientName}! 🎂
              </h1>
              <p className="text-lg text-slate-500 max-w-md mx-auto">
                Made especially for you by {data.senderName} to make your day completely unforgettable.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 max-w-sm mx-auto shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Want to build a surprise like this for someone?</p>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
              >
                Explore Moments by Deepjyoti <Heart size={14} className="text-red-500 fill-red-500" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
