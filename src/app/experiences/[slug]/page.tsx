'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift, Heart, Sparkles, Smile, Activity, PartyPopper, ArrowLeft, ArrowRight, Laptop, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EXPERIENCE_CATEGORIES, FEATURED_PROJECTS } from '@/lib/mockData';

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const category = EXPERIENCE_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="pt-36 pb-24 text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Experience Category Not Found</h2>
        <Link href="/experiences">
          <Button variant="primary">Back to Experiences</Button>
        </Link>
      </div>
    );
  }

  const iconComponents = {
    Gift,
    Heart,
    Sparkles,
    Smile,
    Activity,
    PartyPopper,
  };

  const Icon = iconComponents[category.icon as keyof typeof iconComponents] || Gift;

  const demoMapping: Record<string, string> = {
    birthday: 'aarav-birthday',
    romantic: 'sukanya-love',
    anniversary: 'rahul-anniversary',
    friendship: 'friends-forever',
  };

  const demoSlug = demoMapping[category.slug];

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 space-y-12">
      {/* Back link */}
      <Link href="/experiences" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition">
        <ArrowLeft size={14} /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Icon and Info */}
        <div className="md:col-span-8 space-y-6">
          <span className={`inline-flex p-4 rounded-3xl bg-gradient-to-r ${category.gradient} text-white shadow`}>
            <Icon size={32} />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {category.title} Surprise
          </h1>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
            {category.longDescription}
          </p>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-slate-800">What is included:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Elegant story screen layout',
                'Custom letter configuration',
                'Interactive memory timeline',
                'Pre-vetted premium soundtracks',
                'Mobile-first responsive layout',
                'Secured private viewing link',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-650 font-medium">
                  <Check size={16} className="text-emerald-500 flex-shrink-0" /> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: CTA Panel */}
        <div className="md:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Starting from</span>
            <p className="text-3xl font-black text-slate-950">₹1,499</p>
          </div>
          
          <div className="space-y-3">
            <Link href={`/order?occasion=${category.slug}`} className="block w-full">
              <Button variant="gradient" fullWidth className="flex items-center justify-center gap-1.5">
                Book this Surprise <ArrowRight size={16} />
              </Button>
            </Link>

            {demoSlug && (
              <Link href={`/s/${demoSlug}`} target="_blank" className="block w-full">
                <Button variant="secondary" fullWidth className="flex items-center justify-center gap-1.5 border border-slate-200">
                  <Laptop size={14} /> Experience Demo
                </Button>
              </Link>
            )}
          </div>

          <p className="text-[10px] text-center text-slate-400 leading-normal">
            Every website is custom built. Normal delivery within 2-4 days. Express turnaround options available in check-out.
          </p>
        </div>
      </div>

      {/* Real Client Work Spotlight */}
      {FEATURED_PROJECTS[0] && (slug === 'birthday' || slug === 'romantic') && (
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-rose-950 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Live Client Spotlight
              </span>
            </div>
            <span className="text-xs text-rose-300 font-mono">Gorakhpur ➔ New Delhi (820 km)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold text-white">
                {FEATURED_PROJECTS[0].title}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {FEATURED_PROJECTS[0].description}
              </p>
              <p className="text-xs text-rose-300 italic">
                &ldquo;Love doesn&apos;t count kilometers. It counts moments.&rdquo;
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2.5">
              <a
                href={FEATURED_PROJECTS[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="primary"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 text-white text-xs font-bold py-3 flex items-center justify-center gap-2"
                >
                  Visit Live Client Site <ExternalLink size={14} />
                </Button>
              </a>

              <Link href={`/s/${FEATURED_PROJECTS[0].previewSlug}`} className="w-full">
                <Button
                  variant="secondary"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold py-3 flex items-center justify-center gap-2"
                >
                  <Laptop size={14} /> Open in Player
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
