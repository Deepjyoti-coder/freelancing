'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FileCode, Layers, LogOut, Globe, Shield, Loader2 } from 'lucide-react';
import { isAdminAuthenticated, logoutAdmin } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Skip auth check for login page itself
    if (pathname === '/admin/login') {
      setAuthChecked(true);
      return;
    }

    if (!isAdminAuthenticated()) {
      router.push('/admin/login');
    } else {
      setAuthChecked(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col space-y-3">
        <Loader2 className="animate-spin text-blue-500" size={32} />
        <p className="text-xs text-slate-400 font-semibold animate-pulse">Authenticating Admin...</p>
      </div>
    );
  }

  // If login page, do not render layout sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const sidebarLinks = [
    { label: 'Orders Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Live Slugs', href: '/admin/projects', icon: Globe },
    { label: 'Templates', href: '/admin/templates', icon: FileCode },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pt-20 md:pt-0">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between p-6 border-r border-slate-800">
        <div className="space-y-8">
          <div className="flex items-center gap-2 pb-6 border-b border-slate-800">
            <span className="p-2 bg-blue-500 text-white rounded-xl">
              <Shield size={18} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">Studio Hub</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Admin Dashboard</span>
            </div>
          </div>

          <nav className="flex flex-col space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={16} /> {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-slate-800 mt-8">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <Layers size={14} /> Main Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/30 hover:text-red-300 transition w-full text-left"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
