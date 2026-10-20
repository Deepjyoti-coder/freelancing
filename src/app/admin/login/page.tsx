'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Key, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { loginAdmin, isAdminAuthenticated } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    setError(false);

    try {
      const success = await loginAdmin(username, password);
      if (success) {
        router.push('/admin');
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-slate-100 p-8 rounded-3xl shadow-sm text-center space-y-6"
      >
        <div className="space-y-2">
          <span className="inline-block p-4 rounded-full bg-blue-50 text-blue-500 mb-2">
            <Key size={30} />
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Admin Control Panel</h2>
          <p className="text-xs text-slate-400">
            Sign in to manage surprise orders, customize templates, and publish client Slugs.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <Input
            label="Username / Email"
            placeholder="E.g. admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="flex items-center gap-2 p-3.5 bg-rose-50 text-rose-650 rounded-2xl text-xs font-semibold border border-rose-100">
              <AlertCircle size={16} /> Invalid credentials. Try username: admin / pass: admin123
            </div>
          )}

          <Button variant="primary" type="submit" fullWidth disabled={loading} className="py-3">
            {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'Log In'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
