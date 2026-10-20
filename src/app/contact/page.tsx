'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Check, Send, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { GradientText } from '@/components/ui/GradientText';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    // Simulate simple network contact form submit
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="primary">Get in Touch</Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Have an <GradientText>Idea?</GradientText>
        </h1>
        <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
          Tell me what you are imagining. We will turn your stories and photos into a premium interactive digital memory.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Cards */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Founder</span>
            <h4 className="text-xl font-bold text-slate-800">Deepjyoti Saha</h4>
            <p className="text-xs text-slate-500 font-medium">Gemini Certified Student</p>
            <p className="text-xs text-slate-500">Phone: +91 6001746854</p>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-3xl shadow-sm space-y-3">
            <h4 className="font-bold text-emerald-800 flex items-center gap-1.5">
              <MessageCircle size={18} /> Direct WhatsApp
            </h4>
            <p className="text-xs text-emerald-950/70 leading-normal">
              Click below to send a pre-filled WhatsApp message directly to Deepjyoti to chat about project scopes immediately.
            </p>
            <a
              href="https://wa.me/916001746854?text=Hi%2520Deepjyoti!%2520I%2520want%2520to%2520create%2520a%2520surprise%2520website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full transition shadow-sm"
            >
              WhatsApp Me
            </a>
          </div>
        </div>

        {/* Right Side: Interactive message Form */}
        <div className="md:col-span-7 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <span className="inline-block p-4 rounded-full bg-emerald-100 text-emerald-600">
                <Check size={28} />
              </span>
              <h3 className="text-2xl font-bold text-slate-800">Message Received!</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Thank you for reaching out. I will read your message and respond via email or phone within 12 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Your Email Address"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Textarea
                label="Your Idea / Message"
                placeholder="Tell me what surprise you are looking to build..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button
                variant="primary"
                type="submit"
                fullWidth
                disabled={loading}
                className="flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
