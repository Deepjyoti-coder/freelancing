'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smile, Calendar, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SurpriseData } from '@/lib/mockData';

interface TemplateProps {
  data: SurpriseData;
  activeStep: number;
  nextStep: () => void;
}

export const FriendshipTemplate: React.FC<TemplateProps> = ({ data, activeStep, nextStep }) => {
  useEffect(() => {
    if (activeStep === 4) {
      // Trigger fun random colored confetti
      const end = Date.now() + 3 * 1000;

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#EC4899', '#3B82F6']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#EC4899', '#3B82F6']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [activeStep]);

  const colors = data.themeColors || {
    primary: '#F59E0B',
    secondary: '#EF4444',
    background: '#FEF3C7',
    text: '#78350F',
    accent: '#10B981'
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-between p-6 transition-colors duration-500"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Playful floating elements */}
      {activeStep === 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-10%',
              }}
              animate={{
                y: '-120vh',
                x: [0, Math.random() * 40 - 20, 0],
                rotate: 360
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {['😂', '🎉', '🍕', '🍻', '🎓', '👾'][i % 6]}
            </motion.span>
          ))}
        </div>
      )}

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full relative z-10 py-12">
        {activeStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <span className="inline-block p-4 rounded-3xl bg-white shadow-sm border border-yellow-100 mb-2">
              <Smile size={36} className="text-amber-500" style={{ color: colors.primary }} />
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Hey {data.recipientName}!
            </h1>
            <p className="text-base md:text-lg opacity-85 max-w-sm mx-auto font-medium">
              Inside jokes, memories, and total chaos — beautifully preserved. Ready to open your surprise?
            </p>
            <button
              onClick={nextStep}
              className="px-8 py-4 text-white font-bold rounded-full hover:opacity-95 transition-all flex items-center gap-2 mx-auto shadow-md"
              style={{ backgroundColor: colors.primary }}
            >
              Open the Chaos <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {activeStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-center mb-2">Crazy Moments</h2>
            <p className="text-sm opacity-75 text-center mb-6">Our funniest faces, group chats, and memories.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {data.photos.slice(0, 4).map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -4 : 4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white p-3 rounded-2xl shadow-sm border border-yellow-100/50 flex flex-col items-center group cursor-pointer hover:rotate-0 transition-transform"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt="Friendship memories"
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
                Read Our Adventures <ArrowRight size={16} />
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
            <h2 className="text-3xl font-bold text-center mb-8">The Joke Timeline</h2>
            
            <div className="relative border-l border-amber-200 ml-4 space-y-8 pb-4">
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
                    <Smile size={10} className="text-white" />
                  </span>
                  
                  <div className="bg-white p-5 rounded-2xl border border-yellow-50 shadow-sm space-y-3">
                    {memory.date && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                        {memory.date}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-amber-900">{memory.title}</h3>
                    <p className="text-sm text-amber-950/80 leading-relaxed">{memory.description}</p>
                    
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
            <h2 className="text-3xl font-bold text-center mb-6">A Letter for the Squad</h2>
            
            <div className="bg-white border border-yellow-100 rounded-3xl p-8 shadow-md leading-relaxed space-y-4">
              <p className="text-lg font-bold italic text-amber-600">Yo {data.recipientName},</p>
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
                Unlock Card <ArrowRight size={18} />
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
                <Smile size={48} className="animate-bounce" />
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Friends Forever! 🍕
              </h1>
              <p className="text-lg text-slate-500 max-w-md mx-auto">
                No matter how busy our schedules get, or how far apart we live. Built with laughs by {data.senderName}.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-yellow-50 max-w-sm mx-auto shadow-sm">
              <p className="text-xs text-slate-400 mb-2">Want to build a friendship collage surprise?</p>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition"
              >
                Explore Moments by Deepjyoti <Smile size={14} className="text-amber-500" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
