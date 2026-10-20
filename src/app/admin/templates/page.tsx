'use client';

import React from 'react';
import Link from 'next/link';
import { FileCode, Sparkles, Laptop, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminTemplatesPage() {
  const templates = [
    {
      name: 'Birthday Surprise',
      slug: 'birthday',
      desc: 'Multiscreen balloons, timeline grid, private letter scroll, candle release final greeting.',
      demoSlug: 'aarav-birthday',
      primaryColor: 'Electric Blue',
      accent: 'Golden Amber'
    },
    {
      name: 'Love Story / Proposal',
      slug: 'romantic',
      desc: 'Warm pink/red overlay styling, floating hearts background, couples milestones, soft letters design.',
      demoSlug: 'sukanya-love',
      primaryColor: 'Romantic Rose',
      accent: 'Electric Magenta'
    },
    {
      name: 'Milestone Anniversary',
      slug: 'anniversary',
      desc: 'Elegant editorial typography layouts, gold/purple tones, wedding milestones slider, champagne cheers greetings.',
      demoSlug: 'rahul-anniversary',
      primaryColor: 'Classic Violet',
      accent: 'Golden Amber'
    },
    {
      name: 'Friendship / Crew chaos',
      slug: 'friendship',
      desc: 'Quirky text elements, funny Polaroid picture cards, custom inside jokes lists, emoji animations.',
      demoSlug: 'friends-forever',
      primaryColor: 'Fun Orange',
      accent: 'Warm Red'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Design Templates</h1>
        <p className="text-sm text-slate-500">Preview visual structures and configuration tokens for all template engines.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((temp) => (
          <Card key={temp.slug} className="flex flex-col justify-between p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="primary" className="text-[10px] font-extrabold">{temp.slug} engine</Badge>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Live & Ready</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800">{temp.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{temp.desc}</p>
              
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-650">
                <div className="flex items-center gap-1.5"><Check size={12} className="text-emerald-500" /> {temp.primaryColor}</div>
                <div className="flex items-center gap-1.5"><Check size={12} className="text-emerald-500" /> {temp.accent}</div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 mt-4 flex items-center justify-between">
              <Link href={`/s/${temp.demoSlug}`} target="_blank">
                <Button variant="secondary" size="sm" className="flex items-center gap-1 border border-slate-200">
                  <Laptop size={12} /> Test Demo Layout
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
