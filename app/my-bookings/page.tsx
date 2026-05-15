'use client';

import { useState, useEffect } from 'react';
import { loadBookings } from '@/lib/storage';
import { cancelBooking } from '@/lib/bookingLogic';
import { Booking } from '@/types';
import BookingCard from '@/components/BookingCard';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MyBookingsPage() {
  const [studentId, setStudentId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAllBookings(loadBookings());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;
    
    const userBookings = allBookings
      .filter(b => b.studentId.toUpperCase() === studentId.toUpperCase())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setBookings(userBookings);
    setHasSearched(true);
  };

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you want to abort this reservation?')) {
      cancelBooking(id);
      // Refresh list
      const updatedAll = loadBookings();
      setAllBookings(updatedAll);
      setBookings(updatedAll.filter(b => b.studentId.toUpperCase() === studentId.toUpperCase())
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  };

  return (
    <div className="py-8">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">My Bookings</h1>
        <p className="font-mono text-gray-400 border-l-2 border-accent pl-4">
          Access your reservation history by entering your Student ID.
        </p>
      </div>

      <div className="max-w-xl mb-12">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="ENTER STUDENT ID (e.g. TP012345)" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="input-brutal pl-10 w-full uppercase"
            />
          </div>
          <button type="submit" className="btn-brutal px-8 shrink-0">
            QUERY
          </button>
        </form>
      </div>

      {hasSearched && (
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-accent">RESULTS FOR:</span> 
            <span className="font-mono bg-[#141414] px-3 py-1 border border-border">{studentId.toUpperCase()}</span>
          </h2>
          
          {bookings.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-border bg-[#0a0a0a]">
              <p className="font-mono text-xl text-gray-500 uppercase">No active or past reservations found.</p>
            </div>
          ) : (
            <motion.div 
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <BookingCard booking={booking} onCancel={handleCancel} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
