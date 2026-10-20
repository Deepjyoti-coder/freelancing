'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { FileUploader } from '@/components/ui/FileUploader';
import { createOrder } from '@/lib/supabase';

function OrderFormInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultOccasion = searchParams ? searchParams.get('occasion') || 'birthday' : 'birthday';

  // Multi-step index: 0 = Details, 1 = Content, 2 = Review, 3 = Success
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [occasion, setOccasion] = useState(defaultOccasion);
  const [relationship, setRelationship] = useState('');
  const [style, setStyle] = useState('Surprise Me');
  const [budget, setBudget] = useState('₹1,499 – ₹2,499');
  const [message, setMessage] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (searchParams) {
      const occasionParam = searchParams.get('occasion');
      if (occasionParam) setOccasion(occasionParam);
    }
  }, [searchParams]);

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!customerName.trim()) newErrors.customerName = 'Your name is required';
      if (!recipientName.trim()) newErrors.recipientName = 'Recipient name is required';
      if (!relationship.trim()) newErrors.relationship = 'Your relationship is required';
      if (!email.trim() || !email.includes('@')) newErrors.email = 'Enter a valid email address';
      if (!whatsapp.trim() || whatsapp.length < 8) newErrors.whatsapp = 'Enter a valid WhatsApp number';
    } else if (currentStep === 1) {
      if (!message.trim()) newErrors.message = 'Please provide details or a letters message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFilesUploaded = (uploaded: { name: string; url: string }[]) => {
    setFiles(uploaded);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const orderData = {
        customer_name: customerName,
        recipient_name: recipientName,
        occasion: occasion.toUpperCase(),
        relationship,
        style,
        budget,
        message,
        whatsapp,
        email
      };

      const result = await createOrder(orderData, files);
      setCreatedOrder(result);
      setStep(3); // Success Screen
    } catch (err) {
      console.error('Order creation error:', err);
      alert('Something went wrong. Please check details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // WhatsApp Redirect Handler
  const handleWhatsAppRedirect = () => {
    if (!createdOrder) return;
    const msg = `Hi Deepjyoti! I just placed a surprise order on your website.\nOrder ID: ${createdOrder.id}\nFrom: ${customerName}\nTo: ${recipientName}\nOccasion: ${occasion}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/916001746854?text=${encoded}`, '_blank');
  };

  const stepsList = ['01 Details', '02 Content', '03 Review', '04 Submit'];

  return (
    <div className="pt-32 pb-24 max-w-2xl mx-auto px-6">
      {/* Header */}
      {step < 3 && (
        <div className="text-center space-y-4 mb-10">
          <Badge variant="primary">Intake Studio</Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Let&apos;s create something they&apos;ll remember
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Provide occasion details, photo uploads, and warm letters. I will transform them into code.
          </p>
        </div>
      )}

      {/* Progress indicators */}
      {step < 3 && (
        <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-4">
          {stepsList.map((label, idx) => (
            <div key={label} className="flex items-center space-x-1.5">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  step === idx
                    ? 'bg-slate-900 text-white shadow-sm'
                    : step > idx
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'text-slate-400 bg-slate-100'
                }`}
              >
                {step > idx ? <Check size={10} className="inline mr-1" /> : ''}
                {label.split(' ')[0]}
              </span>
              <span className={`text-xs font-medium hidden sm:inline ${step === idx ? 'text-slate-800' : 'text-slate-400'}`}>
                {label.split(' ')[1]}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Steps Content */}
      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  placeholder="E.g. Priya Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  error={errors.customerName}
                />
                <Input
                  label="Their Name"
                  placeholder="E.g. Rahul Sharma"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  error={errors.recipientName}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Occasion"
                  options={[
                    { value: 'birthday', label: 'Birthday' },
                    { value: 'romantic', label: 'Love Story / Romantic' },
                    { value: 'anniversary', label: 'Anniversary' },
                    { value: 'friendship', label: 'Friendship' },
                    { value: 'proposal', label: 'Proposal' },
                    { value: 'surprise', label: 'Special Surprise / Other' }
                  ]}
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                />
                <Input
                  label="Relationship to Them"
                  placeholder="E.g. Husband, Wife, Best Friend"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  error={errors.relationship}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Preferred Visual Style"
                  options={[
                    { value: 'Romantic', label: 'Romantic' },
                    { value: 'Cute', label: 'Cute' },
                    { value: 'Elegant', label: 'Elegant' },
                    { value: 'Cinematic', label: 'Cinematic' },
                    { value: 'Minimal', label: 'Minimal' },
                    { value: 'Surprise Me', label: 'Surprise Me' }
                  ]}
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                />
                <Select
                  label="Your Budget Package"
                  options={[
                    { value: '₹499 – ₹999', label: 'Mini Moment (₹499 - ₹999)' },
                    { value: '₹1,499 – ₹2,499', label: 'Signature Moment (₹1,499 - ₹2,499)' },
                    { value: '₹3,000+', label: 'Ultimate Experience (₹3,000+)' }
                  ]}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="WhatsApp Number"
                  placeholder="E.g. 6001746854"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  error={errors.whatsapp}
                />
                <Input
                  label="Your Email"
                  type="email"
                  placeholder="priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="primary" className="flex items-center gap-1.5" onClick={handleNext}>
                  Next: Add Content <ArrowRight size={14} />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <Textarea
                label="Your Message / Letter / Occasion description"
                placeholder="Write the personalized letter for them, describe core memories, inside jokes, or key timeline dates you want to highlight..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={errors.message}
              />

              <FileUploader
                label="Upload Photos (Optional, but highly recommended)"
                onFilesUploaded={handleFilesUploaded}
              />

              <div className="pt-4 flex justify-between">
                <Button variant="secondary" className="flex items-center gap-1.5" onClick={handlePrev}>
                  <ArrowLeft size={14} /> Back
                </Button>
                <Button variant="primary" className="flex items-center gap-1.5" onClick={handleNext}>
                  Next: Review Order <ArrowRight size={14} />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">Review Order Information</h3>

              <div className="grid grid-cols-2 gap-4 text-sm leading-relaxed">
                <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase">Customer</span>
                  <span className="text-slate-800 font-semibold">{customerName}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase">Recipient</span>
                  <span className="text-slate-800 font-semibold">{recipientName}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase">Occasion</span>
                  <span className="text-slate-800 font-semibold capitalize">{occasion}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase">Relationship</span>
                  <span className="text-slate-800 font-semibold">{relationship}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase">Style</span>
                  <span className="text-slate-800 font-semibold">{style}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase">Budget / package</span>
                  <span className="text-slate-800 font-semibold">{budget}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase">WhatsApp</span>
                  <span className="text-slate-800 font-semibold">{whatsapp}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase">Email</span>
                  <span className="text-slate-800 font-semibold">{email}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <span className="block text-xs text-slate-400 font-bold uppercase mb-1">Message / Letter</span>
                <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl whitespace-pre-line border border-slate-100">
                  {message}
                </p>
              </div>

              {files.length > 0 && (
                <div className="border-t border-slate-100 pt-4">
                  <span className="block text-xs text-slate-400 font-bold uppercase mb-2">Uploaded Photos ({files.length})</span>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {files.map((file, idx) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={idx}
                        src={file.url}
                        alt="Thumbnail"
                        className="w-16 h-16 object-cover rounded-xl border border-slate-100 shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-slate-100 flex justify-between">
                <Button variant="secondary" className="flex items-center gap-1.5" onClick={handlePrev} disabled={submitting}>
                  <ArrowLeft size={14} /> Back
                </Button>
                <Button variant="gradient" className="flex items-center gap-1.5" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Place Order & Confirm <ArrowRight size={14} />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8"
            >
              <span className="inline-block p-4 rounded-full bg-emerald-100 text-emerald-600 mb-2">
                <Check size={36} />
              </span>
              <h2 className="text-3xl font-bold text-slate-800">Order Placed! 🎉</h2>
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-800">{customerName}</strong>! Your surprise request for {recipientName} has been saved successfully in our system.
              </p>

              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 max-w-md mx-auto space-y-3">
                <h4 className="font-bold text-emerald-800 text-sm flex items-center justify-center gap-1.5">
                  <MessageCircle size={16} /> Important Next Step
                </h4>
                <p className="text-xs text-emerald-950/80 leading-relaxed">
                  To speed up design coordination and lock in your order slot, click below to send a quick verification message to Deepjyoti Saha.
                </p>
                <Button
                  variant="primary"
                  className="bg-emerald-500 hover:bg-emerald-655 text-white flex items-center justify-center gap-1.5 w-full py-3"
                  onClick={handleWhatsAppRedirect}
                >
                  Confirm on WhatsApp <ArrowRight size={14} />
                </Button>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => router.push('/')}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Return to Home page
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-24 text-center">
        <Loader2 className="animate-spin text-blue-500 mx-auto mb-2" size={32} />
        <p className="text-xs text-slate-400 font-semibold animate-pulse">Loading surprise form...</p>
      </div>
    }>
      <OrderFormInner />
    </Suspense>
  );
}
