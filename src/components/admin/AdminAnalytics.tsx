'use client';

import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, PackageCheck } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const stats = [
    { title: 'Total Revenue', value: '$128,450', change: '+18.2%', icon: DollarSign },
    { title: 'Orders Completed', value: '1,420', change: '+12.5%', icon: ShoppingBag },
    { title: 'Active VIP Clients', value: '890', change: '+8.4%', icon: Users },
    { title: 'Avg. Order Value', value: '$245', change: '+4.1%', icon: TrendingUp },
  ];

  const recentOrders = [
    { id: 'ORD-9821', customer: 'Prince Khalid Al-Saud', total: '$1,250.00', status: 'Delivered', date: '2026-08-04' },
    { id: 'ORD-9822', customer: 'Sophia Laurent', total: '$420.00', status: 'In Transit', date: '2026-08-04' },
    { id: 'ORD-9823', customer: 'Vikramaditya Mehta', total: '$850.00', status: 'Processing', date: '2026-08-05' },
  ];

  return (
    <div className="p-8 bg-[#0B0B0B] min-h-screen text-white space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#D4AF37]">ASIF Executive Dashboard</h1>
        <p className="text-xs text-gray-400 mt-1">Real-time luxury e-commerce metrics & inventory controls.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{stat.title}</p>
                <h3 className="text-2xl font-bold font-serif text-white mt-2">{stat.value}</h3>
                <span className="text-xs text-emerald-light font-semibold mt-1 inline-block">{stat.change} vs last month</span>
              </div>
              <div className="p-3 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37]">
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders Overview Table */}
      <div className="glass-panel rounded-xl p-6">
        <h2 className="font-serif text-xl font-semibold text-[#D4AF37] mb-6">Recent Luxury Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Total</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 font-mono text-[#D4AF37]">{ord.id}</td>
                  <td className="py-4 font-medium">{ord.customer}</td>
                  <td className="py-4 font-semibold">{ord.total}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold bg-[#0B6E4F]/30 text-emerald-light border border-[#0B6E4F]">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-400">{ord.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};