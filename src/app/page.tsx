'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Gift, 
  Heart, 
  Sparkles, 
  Smile, 
  Activity, 
  PartyPopper,
  Shield, 
  Share2, 
  Clock, 
  Check, 
  MessageCircle,
  Laptop
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';
import { EXPERIENCE_CATEGORIES, DEMO_SURPRISES } from '@/lib/mockData';
import { ClientWorkShowcase } from '@/components/shared/ClientWorkShowcase';

export default function HomePage() {
  // Mockup inside Hero state
  const [heroMockupStep, setHeroMockupStep] = useState(0);

  // Template previewer state
  const [activePreviewTemplate, setActivePreviewTemplate] = useState<'birthday' | 'romantic' | 'anniversary' | 'friendship'>('birthday');
  
  const templateMapping = {
    birthday: 'aarav-birthday',
    romantic: 'sukanya-love',
    anniversary: 'rahul-anniversary',
    friendship: 'friends-forever'
  };

  const previewData = DEMO_SURPRISES[templateMapping[activePreviewTemplate]];

  const iconComponents = {
    Gift: Gift,
    Heart: Heart,
    Sparkles: Sparkles,
    Smile: Smile,
    Activity: Activity,
    PartyPopper: PartyPopper,
  };

  const handleNextHeroStep = () => {
    setHeroMockupStep((prev) => (prev + 1) % 3);
  };

  return (
    <div className="pt-24 space-y-24 md:space-y-36 pb-20">
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-4">
              Premium Digital Surprises
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
              Turn a special moment <br className="hidden md:inline" />
              into an <GradientText>experience.</GradientText>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-500 max-w-xl font-medium leading-relaxed"
          >
            Personalized websites for birthdays, anniversaries, love stories and unforgettable surprises. Made to move people.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link href="/order">
              <Button variant="gradient" size="lg" className="flex items-center gap-2">
                Create a Surprise <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="#experiences">
              <Button variant="secondary" size="lg">
                Explore Experiences
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Live Interactive Hero Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-sm aspect-[9/16] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800/80 overflow-hidden"
          >
            {/* Phone Notch/Island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-full z-30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900" />
            </div>

            {/* Inner Phone Screen Content */}
            <div className="w-full h-full bg-slate-50 rounded-[38px] overflow-hidden flex flex-col justify-between p-6 relative z-10 pt-14 select-none">
              
              {/* Screen 1: Welcome */}
              {heroMockupStep === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-grow flex flex-col justify-center items-center text-center space-y-4"
                >
                  <span className="p-3 bg-red-50 text-red-500 rounded-full border border-red-100 animate-pulse">
                    <Heart size={28} className="fill-red-500" />
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-800">Hey Aarav...</h3>
                  <p className="text-xs text-slate-500 max-w-[200px]">
                    Someone created something special for you ❤️
                  </p>
                  <Button variant="primary" size="sm" onClick={handleNextHeroStep}>
                    Open Surprise
                  </Button>
                </motion.div>
              )}

              {/* Screen 2: Photo Reveal */}
              {heroMockupStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-grow flex flex-col justify-center space-y-4"
                >
                  <h4 className="text-sm font-bold text-slate-800 text-center">Do you remember this?</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden shadow-sm border border-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&q=80" alt="Memory" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden shadow-sm border border-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&q=80" alt="Memory" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="mx-auto" onClick={handleNextHeroStep}>
                    Continue
                  </Button>
                </motion.div>
              )}

              {/* Screen 3: Wish Card */}
              {heroMockupStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-grow flex flex-col justify-center items-center text-center space-y-4"
                >
                  <span className="p-3 bg-yellow-50 text-yellow-500 rounded-full border border-yellow-100">
                    <Gift size={28} />
                  </span>
                  <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-orange-400">
                    Happy Birthday! 🎂
                  </h3>
                  <p className="text-[10px] text-slate-400 max-w-[180px]">
                    Made especially for you.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setHeroMockupStep(0)}>
                    Replay preview
                  </Button>
                </motion.div>
              )}

              {/* Mockup Indicators */}
              <div className="flex justify-center space-x-1.5 mt-4">
                {[0, 1, 2].map((s) => (
                  <div
                    key={s}
                    className={`w-1.5 h-1.5 rounded-full transition ${
                      heroMockupStep === s ? 'bg-slate-800 w-3' : 'bg-slate-350'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Glowing reflection accents around phone */}
            <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
          </motion.div>
        </div>
      </section>

      {/* ----------------- SOCIAL PROOF / BENEFITS ----------------- */}
      <section className="max-w-7xl mx-auto px-6 py-10 bg-slate-50/50 rounded-3xl border border-slate-100">
        <h3 className="text-xs uppercase tracking-widest text-center text-slate-400 font-bold mb-10">
          Built for moments that matter
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <span className="p-3 bg-blue-50 text-blue-500 rounded-2xl border border-blue-100">
              <Heart size={20} className="fill-blue-500/10" />
            </span>
            <h4 className="text-lg font-bold text-slate-800">Personalized</h4>
            <p className="text-sm text-slate-500 max-w-xs">
              Every single experience is meticulously custom-designed for that one person.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <span className="p-3 bg-purple-50 text-purple-500 rounded-2xl border border-purple-100">
              <Shield size={20} />
            </span>
            <h4 className="text-lg font-bold text-slate-800">Memorable</h4>
            <p className="text-sm text-slate-500 max-w-xs">
              Designed dynamically to evoke genuine emotion and unforgettable reactions.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <span className="p-3 bg-pink-50 text-pink-500 rounded-2xl border border-pink-100">
              <Share2 size={20} />
            </span>
            <h4 className="text-lg font-bold text-slate-800">Shareable</h4>
            <p className="text-sm text-slate-500 max-w-xs">
              Delivered instantly to their phone as one elegant private website link.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------- EXPERIENCE CATEGORIES ----------------- */}
      <section id="experiences" className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            What are you celebrating?
          </h2>
          <p className="text-slate-500 max-w-md mx-auto font-medium">
            Select a theme category and let&apos;s build an emotional interactive memory link.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCE_CATEGORIES.map((category) => {
            const Icon = iconComponents[category.icon as keyof typeof iconComponents] || Gift;
            return (
              <Card key={category.slug} className="flex flex-col justify-between h-72">
                <div className="space-y-4">
                  <span className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${category.gradient} text-white shadow-sm`}>
                    <Icon size={20} />
                  </span>
                  <h3 className="text-xl font-bold text-slate-800">{category.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <Link href={`/experiences/${category.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 pt-4">
                  Explore {category.title} <ArrowRight size={14} />
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ----------------- INTERACTIVE TEMPLATE PREVIEW ----------------- */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            See what your moment could look like
          </h2>
          <p className="text-slate-500 max-w-md mx-auto font-medium">
            Toggle between templates below to preview interactive story designs dynamically.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center space-x-2 border-b border-slate-200 pb-3 max-w-md mx-auto">
          {(['birthday', 'romantic', 'anniversary', 'friendship'] as const).map((temp) => (
            <button
              key={temp}
              onClick={() => setActivePreviewTemplate(temp)}
              className={`px-4 py-2 text-sm font-bold capitalize rounded-xl transition ${
                activePreviewTemplate === temp
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {temp}
            </button>
          ))}
        </div>

        {/* Interactive Desktop Mockup Visual */}
        <div className="bg-white rounded-3xl border border-slate-150 shadow-xl overflow-hidden max-w-4xl mx-auto">
          {/* Browser Header Bar */}
          <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium pl-4 select-none">
                momentsbydeepjyoti.com/s/{templateMapping[activePreviewTemplate]}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-slate-400">
              <Laptop size={12} /> Live Preview
            </div>
          </div>

          {/* Simulated Template Preview Body */}
          <div className="p-8 md:p-12 min-h-[350px] flex flex-col justify-center bg-slate-50/50">
            <div className="max-w-xl mx-auto space-y-6 text-center">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
                Template Preview ({activePreviewTemplate})
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Hey {previewData.recipientName}...
              </h3>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed italic max-w-md mx-auto">
                &ldquo;{previewData.message.substring(0, 160)}...&rdquo;
              </p>
              
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link href={`/s/${templateMapping[activePreviewTemplate]}`} target="_blank">
                  <Button variant="primary" className="flex items-center gap-1.5 shadow-md">
                    Experience Demo <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- FEATURED CLIENT WORK SHOWCASE ----------------- */}
      <ClientWorkShowcase />

      {/* ----------------- HOW IT WORKS ----------------- */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            From idea to unforgettable
          </h2>
          <p className="text-slate-500 max-w-sm mx-auto font-medium">
            Our step-by-step studio process to make a premium digital surprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="flex flex-col space-y-4">
            <span className="text-4xl font-black text-blue-100">01</span>
            <h3 className="text-xl font-bold text-slate-800">Tell me your idea</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Share the occasion, person&apos;s name, relationship, photos, and messages inside our booking form.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <span className="text-4xl font-black text-purple-100">02</span>
            <h3 className="text-xl font-bold text-slate-800">I design the story</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Your stories, dates, and images are custom coded into a gorgeous responsive narrative flow.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <span className="text-4xl font-black text-pink-100">03</span>
            <h3 className="text-xl font-bold text-slate-800">Preview and approve</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Review a private testing link of the site. Request text tweaks or changes until you say it&apos;s perfect.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <span className="text-4xl font-black text-orange-100">04</span>
            <h3 className="text-xl font-bold text-slate-800">Send the surprise</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Receive the final link. Share it with your special person on WhatsApp, email, or a surprise QR code.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------- SERVICES ----------------- */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            Creative Digital Services
          </h2>
          <p className="text-slate-500 max-w-sm mx-auto font-medium">
            Explore standard studio services tailored for specific milestone memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Custom Surprise Websites', desc: 'Completely unique interaction mechanics tailored around coordinate maps, clues, or riddles.' },
            { title: 'Interactive Birthday Websites', desc: 'Unfold childhood timelines, birthday cards, and balloon blast triggers beautifully.' },
            { title: 'Love Story Websites', desc: 'An emotional digital archive of relationship dates, sunset diaries, and letters.' },
            { title: 'Anniversary Experiences', desc: 'Celebrate multi-year wedding milestones, wedding photo walls, and orchestral backings.' },
            { title: 'Digital Memory Books', desc: 'Group friendship tributes, graduation summaries, and funny video collages.' },
            { title: 'Custom Surprises', desc: 'Have a completely out-of-the-box digital surprise idea? Let&apos;s map and code it.' }
          ].map((srv, i) => (
            <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-slate-800 mb-2">{srv.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- PRICING ----------------- */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            Transparent Pricing
          </h2>
          <p className="text-slate-500 max-w-md mx-auto font-medium">
            Select the scale of surprise that suits your moment. No hidden fees or fake discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1 */}
          <div className="bg-white border border-slate-150 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800">Mini Moment</h3>
                <span className="text-3xl font-black text-slate-900">₹499 – ₹999</span>
              </div>
              <p className="text-xs text-slate-500">Ideal for direct messages or simple interactive greeting surprises.</p>
              
              <ul className="space-y-3 pt-4 border-t border-slate-100">
                {['Single-page interactive layout', 'Personalized greeting letter', 'Up to 4 custom photos', 'Basic fade-in transitions', 'Shareable private URL link'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Check size={14} className="text-emerald-500 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link href="/order" className="mt-8 block">
              <Button variant="secondary" fullWidth>Book Mini Surprise</Button>
            </Link>
          </div>

          {/* Card 2: Signature Moment (Recommended) */}
          <div className="bg-white border-2 border-blue-500 rounded-3xl p-8 flex flex-col justify-between shadow-md relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow">
              RECOMMENDED
            </span>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800">Signature Moment</h3>
                <span className="text-3xl font-black text-slate-900">₹1,499 – ₹2,499</span>
              </div>
              <p className="text-xs text-slate-500">Perfect for deep impact. Multi-screen emotional journeys with letters, music, and timelines.</p>
              
              <ul className="space-y-3 pt-4 border-t border-slate-100">
                {['Full multi-screen storytelling layout', 'Integrated memory gallery', 'Chronological milestone timeline', 'Soft background music track', 'Premium theme customization', 'Private, secure web preview URL'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                    <Check size={14} className="text-blue-500 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link href="/order" className="mt-8 block">
              <Button variant="gradient" fullWidth>Book Signature Surprise</Button>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-150 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800">Ultimate Experience</h3>
                <span className="text-3xl font-black text-slate-900">₹3,000+</span>
              </div>
              <p className="text-xs text-slate-500">For completely tailored, custom interactive surprises with high creative freedom.</p>
              
              <ul className="space-y-3 pt-4 border-t border-slate-100">
                {['Custom interactive gaming/riddles layout', 'Full media gallery integrations', 'Custom animation features', 'Custom domain mapping options', 'Priority studio turnaround', 'Unlimited edits and secure access settings'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Check size={14} className="text-emerald-500 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link href="/order" className="mt-8 block">
              <Button variant="secondary" fullWidth>Design Custom Surprise</Button>
            </Link>
          </div>
        </div>

        {/* Custom inquiry cta */}
        <div className="text-center bg-slate-50 p-6 rounded-3xl border border-slate-100 max-w-lg mx-auto">
          <p className="text-sm text-slate-600 mb-3 font-medium">Need something completely unique?</p>
          <a
            href="https://wa.me/916001746854?text=Hi%20Deepjyoti!%20I%20want%20to%20discuss%20a%20custom%20surprise%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700 transition"
          >
            Let&apos;s talk custom surprise <MessageCircle size={16} />
          </a>
        </div>
      </section>

      {/* ----------------- ABOUT SHORT ----------------- */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-slate-100 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="flex-1 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 uppercase">
              Meet the Builder
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Hi, I&apos;m Deepjyoti Saha.
            </h3>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              I am a developer and creative builder, and a <strong className="text-slate-800">Gemini Certified Student</strong>. 
              I love turning ideas, memories, and raw emotions into beautiful, interactive digital products.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span>Deepjyoti Saha</span> &bull; <span>Founder of Moments</span>
            </div>
          </div>
          <div className="w-full md:w-64 flex-shrink-0 bg-slate-50 border border-slate-100 p-2 rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/deepjyoti.png" 
              alt="Deepjyoti Saha - Gemini Certified Student" 
              className="w-full rounded-xl object-contain shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* ----------------- CONTACT SECTION ----------------- */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-8 pb-10">
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Have an idea?</h2>
          <p className="text-slate-500 max-w-md mx-auto font-medium">
            Tell me what you are imagining. We will turn your special memory into something unforgettable.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/916001746854?text=Hi%20Deepjyoti!%20I%20want%20to%20create%20a%20surprise%20website."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" className="flex items-center gap-2 px-8 py-4 shadow-lg hover:shadow-xl bg-emerald-500 hover:bg-emerald-600 text-white">
              <MessageCircle size={18} /> WhatsApp Me
            </Button>
          </a>
          <Link href="/order">
            <Button variant="secondary" className="px-8 py-4 shadow-sm border border-slate-200">
              Start a Project
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
