'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, ArrowRight, Award, Sparkles, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 space-y-16">
      
      {/* Intro */}
      <div className="space-y-6 text-center md:text-left max-w-2xl">
        <Badge variant="primary">The Builder</Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Hi, I&apos;m <GradientText>Deepjyoti Saha</GradientText>.
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed font-medium">
          I am a developer and creative builder who loves turning raw memories, stories, and emotions into beautiful, premium interactive digital experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Credentials Grid */}
        <div className="md:col-span-8 space-y-8 bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Award className="text-blue-500" /> Gemini Certified Student
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              As a Gemini Certified Student, I combine modern front-end technologies like React, Next.js, Framer Motion, and Supabase to engineer scalable, lightning-fast digital solutions.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800">Studio Philosophy</h3>
            <p className="text-sm text-slate-555 leading-relaxed">
              Moments by Deepjyoti was founded on a simple principle: <strong>digital templates shouldn&apos;t look cheap or generic</strong>. 
              Gifting a website is a deeply personal gesture. It should feel like a premium editorial magazine, fluidly responding to touch, highlighting memories in gorgeous typography, and unfolding like an interactive storybook.
            </p>
          </div>

          {/* Real Work Delivered */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="text-rose-500" size={20} /> Recent Client Delivery
              </h3>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Live in Production
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Happy Birthday, Aarushi — from Anikesh
                </h4>
                <span className="text-xs text-rose-500 font-semibold font-mono">820 km apart</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A handmade digital birthday letter bridging Gorakhpur, UP and New Delhi. Engineered with an interactive envelope, audio player, memories timeline, and real-time distance countdown.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="https://anikesh.lovable.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Visit Live Client Site (anikesh.lovable.app) <ExternalLink size={12} />
                </a>
                <span className="text-slate-300">&bull;</span>
                <Link
                  href="/s/anikesh-aarushi"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700"
                >
                  View in Demo Player
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel & Profile Photo Card */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white border border-slate-100 rounded-[32px] p-3 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/deepjyoti.png" 
              alt="Deepjyoti Saha - Gemini Certified Student" 
              className="w-full rounded-2xl object-cover shadow-inner"
            />
          </div>

          <div className="bg-slate-900 text-white rounded-[32px] p-6 shadow-md space-y-6">
            <div className="space-y-2">
              <h4 className="text-lg font-bold">Let&apos;s build something magic</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Have an idea for a birthday surprise, romantic love page, or wedding anniversary? Let&apos;s translate it into code.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link href="/order" className="block">
                <Button variant="gradient" fullWidth className="text-xs font-bold py-3 flex items-center justify-center gap-1.5">
                  Start Surprise Order <ArrowRight size={14} />
                </Button>
              </Link>

              <a
                href="https://wa.me/916001746854?text=Hi%20Deepjyoti!%20I%20want%20to%20chat%20about%20a%20surprise%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full text-xs transition"
              >
                <MessageCircle size={14} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
