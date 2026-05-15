'use client';

import { useState, useEffect, useCallback } from 'react';
import { loadBookings, loadEquipment } from '@/lib/storage';
import { getDashboardStats, DashboardStats, updateOverdueBookings } from '@/lib/dashboard';
import { markAsPickedUp, markAsReturned, markAsDamaged, cancelBooking, markEquipmentRepairedFromBooking } from '@/lib/bookingLogic';
import { Booking, Equipment } from '@/types';
import DashboardStatsCards from '@/components/DashboardStats';
import StatusBadge from '@/components/StatusBadge';
import { TerminalSquare } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [filter, setFilter] = useState('All');

  const refreshData = useCallback(() => {
    updateOverdueBookings();
    setStats(getDashboardStats());
    const allBookings = loadBookings().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setBookings(allBookings);
    setEquipmentList(loadEquipment());
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(refreshData, 0);
    return () => window.clearTimeout(timer);
  }, [refreshData]);

  if (!stats) return <div className="text-center py-20 font-mono text-accent">INITIALIZING COMMAND CENTER...</div>;

  const filteredBookings = filter === 'All' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const statuses = ['All', 'Booked', 'Picked Up', 'Returned', 'Overdue', 'Damaged', 'Cancelled'];

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4">
            <TerminalSquare size={40} className="text-accent" /> ADMIN DASHBOARD
          </h1>
          <p className="font-mono text-gray-400 border-l-2 border-accent pl-4">
            Administrative control interface for asset lifecycle management.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <DashboardStatsCards stats={stats} />
      </div>

      <div className="bg-[#141414] border-2 border-border p-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-black">RESERVATION LEDGER</h2>
          
          <div className="flex flex-wrap gap-2">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
                  filter === s 
                    ? 'bg-accent text-black border-accent font-bold' 
                    : 'bg-transparent text-gray-400 border-border hover:border-gray-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border text-gray-500 uppercase tracking-widest">
                <th className="pb-4 pr-4">ID / Time</th>
                <th className="pb-4 px-4">Student</th>
                <th className="pb-4 px-4">Asset</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500 uppercase border-b border-border/50">
                    No records found for filter: {filter}
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border/50 hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-4 pr-4">
                      <div className="text-white mb-1">{booking.id}</div>
                      <div className="text-gray-500 text-xs">{booking.date}</div>
                      <div className="text-gray-500 text-xs">{booking.startTime}-{booking.endTime}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-white mb-1 uppercase">{booking.studentName}</div>
                      <div className="text-gray-500 text-xs">{booking.studentId}</div>
                    </td>
                    <td className="py-4 px-4 uppercase text-accent">{booking.equipmentName}</td>
                    <td className="py-4 px-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="py-4 pl-4 text-right space-x-2">
                      {booking.status === 'Booked' && (
                        <>
                          <button onClick={() => { markAsPickedUp(booking.id); refreshData(); }} className="px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/30 hover:bg-blue-500/20 text-xs font-bold transition-colors">MARK PICKED UP</button>
                          <button onClick={() => { cancelBooking(booking.id); refreshData(); }} className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 text-xs font-bold transition-colors">CANCEL</button>
                        </>
                      )}
                      {(booking.status === 'Picked Up' || booking.status === 'Overdue') && (
                        <>
                          <button onClick={() => { markAsReturned(booking.id); refreshData(); }} className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500/20 text-xs font-bold transition-colors">RETURN</button>
                          <button onClick={() => { markAsDamaged(booking.id); refreshData(); }} className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 text-xs font-bold transition-colors">MARK DAMAGED</button>
                        </>
                      )}
                      {booking.status === 'Damaged' && (
                        (() => {
                          const equipment = equipmentList.find(e => e.id === booking.equipmentId);
                          return equipment?.status === 'Maintenance' ? (
                            <button onClick={() => { markEquipmentRepairedFromBooking(booking.id); refreshData(); }} className="px-3 py-1 bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 text-xs font-bold transition-colors">MARK REPAIRED</button>
                          ) : (
                            <span className="text-accent text-xs font-bold uppercase tracking-tight">REPAIRED / AVAILABLE</span>
                          );
                        })()
                      )}
                      {(booking.status === 'Returned' || booking.status === 'Cancelled') && (
                        <span className="text-gray-600 text-xs uppercase">NO ACTIONS</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
