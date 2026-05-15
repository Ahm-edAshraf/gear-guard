import { Booking } from '@/types';
import StatusBadge from './StatusBadge';
import { Calendar, Clock, Tag } from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
}

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
  return (
    <div className="card-brutal border-l-4" style={{ borderLeftColor: 'var(--accent)' }}>
      <div className="flex justify-between items-start mb-4 gap-2">
        <div>
          <h3 className="text-xl font-bold uppercase">{booking.equipmentName}</h3>
          <p className="font-mono text-sm text-gray-500 mt-1">ID: {booking.id}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="space-y-3 font-mono text-sm text-gray-400 mb-6 bg-[#0a0a0a] p-4 border border-border">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-accent shrink-0" />
          <span className="text-white">{booking.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-accent shrink-0" />
          <span className="text-white">{booking.startTime} - {booking.endTime}</span>
        </div>
        <div className="flex items-start gap-3">
          <Tag size={16} className="text-accent shrink-0 mt-0.5" />
          <span>{booking.purpose || 'No purpose specified'}</span>
        </div>
      </div>

      {onCancel && booking.status === 'Booked' && (
        <button 
          onClick={() => onCancel(booking.id)}
          className="w-full btn-brutal-outline border-red-500 text-red-500 hover:bg-red-500/10 hover:border-red-400 hover:text-red-400"
        >
          ABORT RESERVATION
        </button>
      )}
    </div>
  );
}
