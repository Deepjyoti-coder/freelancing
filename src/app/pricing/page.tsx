'use client';

import React from 'react';
import Link from 'next/link';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';

export default function PricingPage() {
  const plans = [
    {
      name: 'Mini Moment',
      price: '₹499 – ₹999',
      description: 'Ideal for simple interactive greetings and quick wishes.',
      features: [
        'Single-page interactive layout',
        'Personalized greeting letter',
        'Up to 4 custom photos',
        'Basic fade-in transitions',
        'Shareable private URL link',
        'Standard delivery (3-4 days)'
      ],
      recommended: false,
      cta: 'Book Mini Moment',
      variant: 'secondary' as const
    },
    {
      name: 'Signature Moment',
      price: '₹1,499 – ₹2,499',
      description: 'Our most popular choice. A full emotional multi-screen story experience.',
      features: [
        'Full multi-screen storytelling layout',
        'Integrated memory gallery',
        'Chronological milestone timeline',
        'Soft background music track',
        'Premium theme customization',
        'Private, secure web preview URL',
        'Priority support & delivery (2-3 days)'
      ],
      recommended: true,
      cta: 'Book Signature Moment',
      variant: 'gradient' as const
    },
    {
      name: 'Ultimate Experience',
      price: '₹3,000+',
      description: 'For unique digital experiences with gamified elements or heavy custom scripts.',
      features: [
        'Custom interactive gaming/riddles layout',
        'Full media gallery integrations',
        'Custom animation features',
        'Custom domain mapping options',
        'Password-protected access option',
        'Unlimited edits before launch',
        'Express delivery (1-2 days)'
      ],
      recommended: false,
      cta: 'Design Custom surprise',
      variant: 'secondary' as const
    }
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="primary">Pricing Plans</Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Simple, Honest <GradientText>Pricing</GradientText>
        </h1>
        <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
          Choose a plan based on the depth of the story you wish to share. No auto-renewals, no hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-[32px] p-8 flex flex-col justify-between shadow-sm relative border ${
              plan.recommended ? 'border-2 border-blue-500 shadow-md' : 'border-slate-150'
            }`}
          >
            {plan.recommended && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                RECOMMENDED
              </span>
            )}
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                <p className="text-3xl font-black text-slate-950">{plan.price}</p>
              </div>
              <p className="text-sm text-slate-500 leading-normal">{plan.description}</p>
              
              <ul className="space-y-4 pt-6 border-t border-slate-100">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-650 font-medium">
                    <Check size={16} className={`flex-shrink-0 mt-0.5 ${plan.recommended ? 'text-blue-500' : 'text-emerald-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link href="/order" className="mt-8 block">
              <Button variant={plan.variant} fullWidth className="py-3.5">
                {plan.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* WhatsApp Section */}
      <div className="max-w-xl mx-auto text-center bg-slate-50 border border-slate-100 rounded-[32px] p-8 space-y-4 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800">Need something completely custom?</h3>
        <p className="text-sm text-slate-500 leading-normal">
          Whether it is coordinates, a digital clue hunt, password walls, or heavy audio, let&apos;s talk on WhatsApp and map it.
        </p>
        <div className="pt-2">
          <a
            href="https://wa.me/916001746854?text=Hi%20Deepjyoti!%20I%20want%20to%20discuss%2520a%2520custom%2520surprise%2520website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow transition"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
