'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, Heart, ArrowLeft, ExternalLink } from 'lucide-react';
import { DEMO_SURPRISES, SurpriseData } from '@/lib/mockData';
import { getProjectBySlug, Project } from '@/lib/supabase';
import { SurpriseRenderer } from '@/components/surprise/SurpriseRenderer';
import { Button } from '@/components/ui/Button';

export default function SurpriseSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  const [surpriseData, setSurpriseData] = useState<SurpriseData | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const loadSurprise = async () => {
      setLoading(true);
      setErrorText(null);

      // 1. Check if it is a default static demo experience
      if (DEMO_SURPRISES[slug]) {
        setSurpriseData(DEMO_SURPRISES[slug]);
        setLoading(false);
        return;
      }

      // 2. Query dynamic project database
      try {
        const project = await getProjectBySlug(slug);
        if (project && project.status === 'PUBLISHED') {
          setSurpriseData(project.data as SurpriseData);
        } else if (project && project.status === 'DRAFT') {
          setErrorText('Your surprise is being prepared by Deepjyoti. Check back in a moment! ✨');
        } else {
          setErrorText('This surprise link does not exist, or has expired.');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setErrorText('Something went wrong. Please check connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    loadSurprise();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-blue-500" size={36} />
        <p className="text-sm font-semibold text-slate-500 animate-pulse">
          Opening surprise box...
        </p>
      </div>
    );
  }

  if (errorText) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center space-y-6">
        <span className="p-4 bg-rose-50 text-rose-500 rounded-full border border-rose-100 mb-2">
          <Heart size={32} />
        </span>
        <h2 className="text-2xl font-bold text-slate-800">Surprise Box Empty</h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          {errorText}
        </p>
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
        >
          <ArrowLeft size={16} /> Visit Moments Homepage
        </button>
      </div>
    );
  }

  if (!surpriseData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <p className="text-slate-500 font-medium">Something went wrong. Reloading...</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Reload Page
        </Button>
      </div>
    );
  }

  const isAnikeshProject = slug === 'anikesh-aarushi';

  return (
    <div className="min-h-screen bg-slate-50 select-none relative">
      {isAnikeshProject && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-950/90 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 border border-pink-500/40">
          <span className="flex items-center gap-1.5 text-pink-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Client Project for Anikesh
          </span>
          <span className="text-slate-500">|</span>
          <a
            href="https://anikesh.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-300 font-bold flex items-center gap-1 underline underline-offset-4 decoration-pink-500/60"
          >
            Visit Live Site (anikesh.lovable.app) <ExternalLink size={12} />
          </a>
        </div>
      )}
      <SurpriseRenderer data={surpriseData} slug={slug} />
    </div>
  );
}
