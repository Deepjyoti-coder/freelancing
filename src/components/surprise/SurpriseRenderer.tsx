'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowLeft, ArrowRight, Play, RefreshCw, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SurpriseData } from '@/lib/mockData';
import { BirthdayTemplate } from '@/templates/BirthdayTemplate';
import { RomanticTemplate } from '@/templates/RomanticTemplate';
import { AnniversaryTemplate } from '@/templates/AnniversaryTemplate';
import { FriendshipTemplate } from '@/templates/FriendshipTemplate';

interface SurpriseRendererProps {
  data: SurpriseData;
  slug?: string;
}

export const SurpriseRenderer: React.FC<SurpriseRendererProps> = ({ data, slug }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordPassed, setPasswordPassed] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check if data is password protected (custom key option)
  const isProtected = (data as any).password && (data as any).password.trim().length > 0;

  useEffect(() => {
    if (isProtected) {
      setPasswordPassed(false);
    }
  }, [isProtected]);

  // Audio setup
  useEffect(() => {
    if (data.musicUrl && typeof window !== 'undefined') {
      audioRef.current = new Audio(data.musicUrl);
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [data.musicUrl]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.log('Audio autoplay blocked:', err));
      setIsPlaying(true);
    }
  };

  const nextStep = () => {
    if (activeStep < 4) {
      // Auto-start music on first interaction if present and not already playing
      if (activeStep === 0 && data.musicUrl && !isPlaying && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const verifyPassword = () => {
    if (passwordInput === (data as any).password) {
      setPasswordPassed(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  // Dispatch template component
  const renderTemplateContent = () => {
    const templateProps = {
      data,
      activeStep,
      nextStep
    };

    const occasionLower = data.occasion?.toLowerCase() || '';

    if (occasionLower.includes('birthday')) {
      return <BirthdayTemplate {...templateProps} />;
    }
    if (occasionLower.includes('romantic') || occasionLower.includes('love') || occasionLower.includes('proposal')) {
      return <RomanticTemplate {...templateProps} />;
    }
    if (occasionLower.includes('anniversary')) {
      return <AnniversaryTemplate {...templateProps} />;
    }
    if (occasionLower.includes('friendship') || occasionLower.includes('friend')) {
      return <FriendshipTemplate {...templateProps} />;
    }
    return <BirthdayTemplate {...templateProps} />;
  };

  // Password Protection Screen
  if (!passwordPassed) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-6 text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-slate-800/80 backdrop-blur border border-slate-700 p-8 rounded-3xl text-center space-y-6 shadow-xl"
        >
          <span className="inline-block p-4 rounded-full bg-slate-700/50 text-blue-400 mb-2">
            <Key size={32} />
          </span>
          <h2 className="text-2xl font-bold tracking-tight">Private Surprise Waiting</h2>
          <p className="text-sm text-slate-400">
            This experience has been password protected by {data.senderName}. Please enter the passcode to view it.
          </p>
          
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Enter passcode"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
              className="w-full px-4 py-3 rounded-2xl bg-slate-700 border border-slate-600 text-white text-center focus:outline-none focus:border-blue-500 transition"
            />
            {passwordError && (
              <span className="block text-xs font-semibold text-rose-400">Invalid passcode. Try again.</span>
            )}
            <button
              onClick={verifyPassword}
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition"
            >
              Open Experience
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background audio controller */}
      {data.musicUrl && (
        <button
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 p-3 bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-md backdrop-blur border border-slate-100 transition flex items-center justify-center"
          title={isPlaying ? 'Mute Music' : 'Play Music'}
        >
          {isPlaying ? <Volume2 size={20} className="text-blue-500 animate-pulse" /> : <VolumeX size={20} />}
        </button>
      )}

      {/* Progress Line */}
      {activeStep > 0 && activeStep < 4 && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ width: '0%' }}
            animate={{ width: `${(activeStep / 4) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      {/* Renders the template */}
      {renderTemplateContent()}

      {/* Floating Story Stepper Controls */}
      {activeStep > 0 && activeStep < 4 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-4 bg-white/95 backdrop-blur border border-slate-100 rounded-full py-2.5 px-4 shadow-lg">
          <button
            onClick={prevStep}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition flex items-center"
            title="Previous Memory"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-xs font-bold text-slate-400 select-none uppercase tracking-widest px-2">
            Story {activeStep} / 3
          </span>
          <button
            onClick={nextStep}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition flex items-center"
            title="Next Memory"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Quick restart helper on the final page */}
      {activeStep === 4 && (
        <button
          onClick={() => setActiveStep(0)}
          className="fixed bottom-6 left-6 z-50 py-2.5 px-4 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-500 rounded-full shadow-md border border-slate-100 flex items-center gap-1.5 transition"
        >
          <RefreshCw size={12} /> Replay Surprise
        </button>
      )}
    </div>
  );
};
