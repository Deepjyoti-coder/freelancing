'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift, Heart, Sparkles, Smile, Activity, PartyPopper, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';
import { EXPERIENCE_CATEGORIES } from '@/lib/mockData';
import { ClientWorkShowcase } from '@/components/shared/ClientWorkShowcase';

export default function ExperiencesPage() {
  const iconComponents = {
    Gift,
    Heart,
    Sparkles,
    Smile,
    Activity,
    PartyPopper,
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="primary">Creative Catalog</Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Surprise <GradientText>Experiences</GradientText>
        </h1>
        <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
          Explore our range of productized digital experiences. Each memory site is hand-crafted to evoke genuine emotional responses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EXPERIENCE_CATEGORIES.map((category, idx) => {
          const Icon = iconComponents[category.icon as keyof typeof iconComponents] || Gift;
          return (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="flex flex-col justify-between h-96 p-8 relative overflow-hidden group">
                {/* Background soft glow */}
                <div className="absolute -right-16 -top-16 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                
                <div className="space-y-6">
                  <span className={`inline-flex p-4 rounded-3xl bg-gradient-to-r ${category.gradient} text-white shadow-sm`}>
                    <Icon size={24} />
                  </span>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800">{category.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {category.longDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <Link
                    href={`/experiences/${category.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
                  >
                    View Details & Demos <ArrowRight size={14} />
                  </Link>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Real Client Story */}
      <div className="pt-12 border-t border-slate-100">
        <ClientWorkShowcase />
      </div>
    </div>
  );
}
