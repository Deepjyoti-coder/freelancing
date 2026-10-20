'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SurpriseData } from '@/lib/mockData';

interface TemplateProps {
  data: SurpriseData;
  activeStep: number;
  nextStep: () => void;
}

export const RomanticTemplate: React.FC<TemplateProps> = ({ data, activeStep, nextStep }) => {
  useEffect(() => {
    if (activeStep === 4) {
      // Trigger heart confetti or classic pink bursts
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#EC4899', '#F43F5E', '#D946EF']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#EC4899', '#F43F5E', '#D946EF']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [activeStep]);

  const colors = data.themeColors || {
    primary: '#EC4899',
    secondary: '#D946EF',
    background: '#FFF1F2',
    text: '#4C0519',
    accent: '#EF4444'
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-between p-6 transition-colors duration-500"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Floating Hearts background */}
      {activeStep === 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-400"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-10%',
                fontSize: `${Math.random() * 30 + 20}px`
              }}
              animate={{
                y: '-120vh',
                x: [0, Math.random() * 60 - 30, 0],
                rotate: [0, 45, 0, -45, 0]
              }}
              transition={{
                duration: Math.random() * 12 + 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full relative z-10 py-12">
        {activeStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <span className="inline-block p-4 rounded-full bg-white shadow-sm border border-pink-100 mb-2 animate-pulse">
              <Heart size={36} className="text-pink-500 fill-pink-500" />
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Hey {data.recipientName}...
            </h1>
            <p className="text-base md:text-lg opacity-80 max-w-sm mx-auto">
              Every love story is special, but ours is my absolute favorite. I have a little surprise for you.
            </p>
            <button
              onClick={nextStep}
              className="px-8 py-4 text-white font-semibold rounded-full hover:opacity-95 transition-all flex items-center gap-2 mx-auto shadow-md"
              style={{ backgroundColor: colors.primary }}
            >
              Begin Our Story <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {activeStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-center mb-2">Our Chapters</h2>
            <p className="text-sm opacity-70 text-center mb-6">Frozen in time, but living in my heart forever.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {data.photos.slice(0, 4).map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white p-3 rounded-3xl shadow-sm border border-pink-100 flex flex-col items-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt="Love memory"
                    className="w-full aspect-[4/5] object-cover rounded-2xl mb-2"
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center pt-6">
              <button
                onClick={nextStep}
                className="px-6 py-3 text-white font-medium rounded-full hover:opacity-95 transition-all inline-flex items-center gap-2 shadow"
                style={{ backgroundColor: colors.primary }}
              >
                Walk Down Memory Lane <ArrowRight size={16} />
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
            <h2 className="text-3xl font-bold text-center mb-8">Milestones of Us</h2>
            
            <div className="relative border-l border-pink-200 ml-4 space-y-8 pb-4">
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
                    <Heart size={10} className="text-white fill-white" />
                  </span>
                  
                  <div className="bg-white p-5 rounded-2xl border border-pink-50 shadow-sm space-y-3">
                    {memory.date && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                        {memory.date}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-pink-900">{memory.title}</h3>
                    <p className="text-sm text-pink-950/70 leading-relaxed">{memory.description}</p>
                    
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
                className="px-6 py-3 text-white font-medium rounded-full hover:opacity-95 transition-all inline-flex items-center gap-2 shadow"
                style={{ backgroundColor: colors.primary }}
              >
                Read My Letter <ArrowRight size={16} />
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
            <h2 className="text-3xl font-bold text-center mb-6">A Letter to My Favorite Person</h2>
            
            <div className="bg-white border border-pink-100 rounded-3xl p-8 shadow-md leading-relaxed space-y-4 relative">
              <span className="absolute top-4 right-4 text-pink-100">❤️</span>
              <p className="text-lg font-semibold italic text-pink-500">Dearest {data.recipientName},</p>
              <div className="text-pink-950 whitespace-pre-line text-base font-serif pl-2">
                {data.message}
              </div>
              <p className="text-right text-lg font-bold italic text-pink-700 mt-6">With all my love,\n— {data.senderName}</p>
            </div>

            <div className="text-center pt-6">
              <button
                onClick={nextStep}
                className="px-8 py-4 text-white font-bold rounded-full hover:opacity-95 transition-all inline-flex items-center gap-2 shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                Open Final Screen <ArrowRight size={18} />
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
              <span className="inline-block p-6 rounded-full bg-pink-100 text-pink-600 mb-2">
                <Heart size={48} className="animate-pulse fill-pink-600" />
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                I Love You, {data.recipientName}! ❤️
              </h1>
              <p className="text-lg text-slate-500 max-w-md mx-auto">
                Thank you for being my constant, my laughter, and my home. Built with love by {data.senderName}.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-pink-50 max-w-sm mx-auto shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Want to build an emotional surprise like this?</p>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-700 transition"
              >
                Explore Moments by Deepjyoti <Heart size={14} className="text-pink-500 fill-pink-500" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
