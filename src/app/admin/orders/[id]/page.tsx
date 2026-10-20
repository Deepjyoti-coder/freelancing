'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, ExternalLink, ShieldAlert, Loader2, Play } from 'lucide-react';
import { getOrderById, updateOrderStatus, createProject, Order, OrderFile } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [files, setFiles] = useState<OrderFile[]>([]);
  const [status, setStatus] = useState<Order['status']>('NEW');

  // Project provision state
  const [projTitle, setProjTitle] = useState('');
  const [projSlug, setProjSlug] = useState('');
  const [projTemplate, setProjTemplate] = useState('birthday');
  const [projDataJSON, setProjDataJSON] = useState('');
  const [provisioning, setProvisioning] = useState(false);
  const [provisionedUrl, setProvisionedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrderDetails = async () => {
      try {
        const { order: orderData, files: filesData } = await getOrderById(id);
        setOrder(orderData);
        setFiles(filesData);
        setStatus(orderData.status);

        // Autofill project values
        setProjTitle(`${orderData.recipient_name} Surprise Experience`);
        
        const cleanSlug = orderData.recipient_name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        setProjSlug(`${cleanSlug}-${orderData.occasion.toLowerCase()}`);

        const initialData = {
          recipientName: orderData.recipient_name,
          senderName: orderData.customer_name,
          occasion: orderData.occasion.toLowerCase(),
          style: orderData.style,
          message: orderData.message || '',
          whatsapp: orderData.whatsapp,
          email: orderData.email,
          musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          photos: filesData.map(f => f.file_url).concat([
            'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80'
          ]),
          memories: [
            {
              date: 'Summer 2024',
              title: 'A Special Day',
              description: 'Remember when we sat and laughed about everything...',
              imageUrl: filesData[0]?.file_url || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80'
            }
          ]
        };
        setProjDataJSON(JSON.stringify(initialData, null, 2));

      } catch (err) {
        console.error('Error fetching details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleStatusChange = async (newStatus: Order['status']) => {
    setStatus(newStatus);
    try {
      await updateOrderStatus(id, newStatus);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleProvisionProject = async () => {
    if (!projSlug.trim() || !projTitle.trim()) return;
    setProvisioning(true);
    try {
      let parsedData = {};
      try {
        parsedData = JSON.parse(projDataJSON);
      } catch (e) {
        alert('Invalid Surprise Data JSON format. Please correct it.');
        setProvisioning(false);
        return;
      }

      const projPayload = {
        order_id: id,
        title: projTitle,
        slug: projSlug,
        template: projTemplate,
        preview_url: `/s/${projSlug}`,
        published_url: `/s/${projSlug}`,
        status: 'PUBLISHED' as const,
        data: parsedData
      };

      await createProject(projPayload);
      await updateOrderStatus(id, 'PREVIEW_READY');
      setStatus('PREVIEW_READY');
      setProvisionedUrl(`/s/${projSlug}`);
      alert('Surprise project provisioned successfully!');
    } catch (err) {
      console.error('Error provisioning project:', err);
      alert('Slug may already be taken. Try updating the slug.');
    } finally {
      setProvisioning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-4 text-center">
        <ShieldAlert className="text-rose-500 mx-auto" size={36} />
        <h2 className="text-xl font-bold">Order not found.</h2>
        <Link href="/admin">
          <Button variant="primary">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const customerWhatsAppUrl = `https://wa.me/${order.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%2520${encodeURIComponent(order.customer_name)}!%2520This%2520is%2520Deepjyoti.%2520I%2520am%2520working%2520on%2520your%2520surprise%2520order.`;

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-2">
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition">
            <ArrowLeft size={14} /> Back to Orders
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Order for {order.recipient_name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <a href={customerWhatsAppUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm" className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-100">
              <MessageCircle size={14} /> WhatsApp Client
            </Button>
          </a>
          
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-bold uppercase">Pipeline State:</span>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value as Order['status'])}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="PREVIEW_READY">Preview Ready</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Order Data Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">Order Information</h3>
            
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold leading-relaxed">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Client Name</span>
                <span className="text-slate-800 font-bold">{order.customer_name}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Recipient</span>
                <span className="text-slate-800 font-bold">{order.recipient_name}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Occasion</span>
                <span className="text-slate-800 font-bold capitalize">{order.occasion.toLowerCase()}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Relationship</span>
                <span className="text-slate-800 font-bold">{order.relationship}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Visual Style</span>
                <span className="text-slate-800 font-bold">{order.style}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Budget / package</span>
                <span className="text-slate-800 font-bold">{order.budget}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">WhatsApp</span>
                <span className="text-slate-800 font-bold">{order.whatsapp}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Email</span>
                <span className="text-slate-800 font-bold">{order.email}</span>
              </div>
            </div>

            <div className="border-t border-slate-50 pt-4">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Message Detail</span>
              <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl whitespace-pre-line border border-slate-100 leading-relaxed font-medium">
                {order.message || 'No letters message details submitted.'}
              </p>
            </div>

            {files.length > 0 && (
              <div className="border-t border-slate-50 pt-4">
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-2">Uploaded Images ({files.length})</span>
                <div className="grid grid-cols-3 gap-3">
                  {files.map((file, idx) => (
                    <a
                      key={idx}
                      href={file.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-square rounded-xl border border-slate-100 overflow-hidden bg-slate-50 group hover:opacity-95 shadow-sm"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={file.file_url} alt={file.file_name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 p-1 bg-slate-900/60 rounded text-[8px] text-white flex items-center gap-0.5">
                        Open <ExternalLink size={8} />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Project Provision Panel */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">
              Surprise Generator
            </h3>

            {provisionedUrl ? (
              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-center space-y-4">
                <span className="text-2xl">🎉</span>
                <h4 className="font-bold text-emerald-800 text-sm">Surprise Site Live!</h4>
                <p className="text-xs text-emerald-950/80 leading-normal">
                  The interactive surprise experience has been compiled successfully. You can share this link with the client.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <a href={provisionedUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" fullWidth className="text-xs py-2 bg-emerald-500 hover:bg-emerald-600">
                      Open Live Experience <ExternalLink size={12} className="inline ml-1" />
                    </Button>
                  </a>
                  <button
                    onClick={() => setProvisionedUrl(null)}
                    className="text-xs text-slate-450 hover:underline font-semibold"
                  >
                    Edit and regenerate project
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Project Title"
                    placeholder="E.g. Sukanya Birthday Surprise"
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                  />
                  <Input
                    label="Custom Slug (/s/[slug])"
                    placeholder="E.g. sukanya-birthday"
                    value={projSlug}
                    onChange={(e) => setProjSlug(e.target.value)}
                  />
                </div>

                <Select
                  label="Surprise Template"
                  options={[
                    { value: 'birthday', label: 'Birthday Template' },
                    { value: 'romantic', label: 'Love Story / Romantic' },
                    { value: 'anniversary', label: 'Anniversary Template' },
                    { value: 'friendship', label: 'Friendship Template' }
                  ]}
                  value={projTemplate}
                  onChange={(e) => setProjTemplate(e.target.value)}
                />

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                    Surprise Content Configuration (JSON)
                  </label>
                  <Textarea
                    placeholder="SurpriseData Structure..."
                    rows={12}
                    className="font-mono text-xs leading-normal"
                    value={projDataJSON}
                    onChange={(e) => setProjDataJSON(e.target.value)}
                  />
                </div>

                <Button
                  variant="gradient"
                  fullWidth
                  disabled={provisioning}
                  onClick={handleProvisionProject}
                  className="flex items-center justify-center gap-1.5 py-3"
                >
                  {provisioning ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Provisioning...
                    </>
                  ) : (
                    <>
                      <Play size={14} /> Provision Surprise Site
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
