'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Search, Filter, ShoppingBag, Loader2, IndianRupee } from 'lucide-react';
import { getOrders, Order } from '@/lib/supabase';
import { Badge } from '@/components/ui/Badge';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Compute stats
  const totalOrders = orders.length;
  const newOrders = orders.filter((o) => o.status === 'NEW').length;
  const inProgress = orders.filter((o) => o.status === 'IN_PROGRESS').length;
  const completed = orders.filter((o) => o.status === 'COMPLETED').length;

  // Simple revenue estimator based on values in budget
  const totalRevenue = orders
    .filter((o) => o.status === 'COMPLETED')
    .reduce((acc, curr) => {
      if (curr.budget.includes('499')) return acc + 750;
      if (curr.budget.includes('1,499')) return acc + 2000;
      if (curr.budget.includes('3,000')) return acc + 3500;
      return acc + 1500;
    }, 0);

  // Filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.recipient_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      selectedStatus === 'ALL' || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'NEW':
        return 'primary';
      case 'CONTACTED':
        return 'info';
      case 'IN_PROGRESS':
        return 'warning';
      case 'PREVIEW_READY':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Studio Orders</h1>
        <p className="text-sm text-slate-500">Track incoming client surprise submissions and design pipeline status.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">New Orders</span>
          <p className="text-3xl font-black text-slate-800 mt-2">{newOrders}</p>
        </div>
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">In Progress</span>
          <p className="text-3xl font-black text-slate-800 mt-2">{inProgress}</p>
        </div>
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Completed</span>
          <p className="text-3xl font-black text-slate-800 mt-2">{completed}</p>
        </div>
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Estimated Revenue</span>
          <p className="text-3xl font-black text-emerald-600 mt-2 flex items-center gap-0.5">
            <IndianRupee size={22} /> {totalRevenue}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-100">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client or recipient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:bg-white focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={16} className="text-slate-400 hidden sm:inline" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none cursor-pointer w-full md:w-auto"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="PREVIEW_READY">Preview Ready</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <ShoppingBag size={32} className="mx-auto text-slate-300" />
            <p className="font-bold text-sm">No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <th className="py-4 px-6">Client Name</th>
                  <th className="py-4 px-6">Recipient</th>
                  <th className="py-4 px-6">Occasion</th>
                  <th className="py-4 px-6 text-center">Style</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-semibold text-slate-700">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/50 cursor-pointer transition"
                  >
                    <td className="py-4 px-6">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        {order.customer_name}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        {order.recipient_name}
                      </Link>
                    </td>
                    <td className="py-4 px-6 capitalize">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        {order.occasion.toLowerCase()}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link href={`/admin/orders/${order.id}`} className="block text-slate-450 font-normal">
                        {order.style}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        <Badge variant={getStatusBadgeVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-right text-xs text-slate-400 font-normal">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        {new Date(order.created_at).toLocaleDateString()}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
