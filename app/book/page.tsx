'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadEquipment } from '@/lib/storage';
import { createBooking } from '@/lib/bookingLogic';
import { Equipment } from '@/types';
import Toast, { ToastType } from '@/components/Toast';
import { motion } from 'framer-motion';
import { Box, Calendar, User, FileText } from 'lucide-react';
import Image from 'next/image';

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEquipmentId = searchParams.get('equipment') || '';

  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [toast, setToast] = useState<{ message: string, type: ToastType } | null>(null);

  const getTodayLocal = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    equipmentId: initialEquipmentId,
    date: getTodayLocal(),
    startTime: '09:00',
    endTime: '11:00',
    purpose: ''
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setEquipmentList(loadEquipment().filter(e => e.status === 'Available'));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = createBooking(
      formData.studentName,
      formData.studentId,
      formData.equipmentId,
      formData.date,
      formData.startTime,
      formData.endTime,
      formData.purpose
    );

    if (result.success) {
      setToast({ message: result.message, type: 'success' });
      setTimeout(() => {
        router.push('/my-bookings');
      }, 2000);
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  const selectedEquipment = equipmentList.find(e => e.id === formData.equipmentId);

  return (
    <div className="py-8 grid lg:grid-cols-5 gap-12">
      <div className="lg:col-span-3">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">RESERVE ASSET</h1>
          <p className="font-mono text-gray-400 border-l-2 border-accent pl-4">
            Fill in the parameters below to acquire equipment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-[#141414] p-8 border-2 border-border">
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-4">
              <User className="text-accent" /> Student Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label-brutal">Student Name</label>
                <input 
                  type="text" 
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="input-brutal"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <label className="label-brutal">Student ID</label>
                <input 
                  type="text" 
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="input-brutal uppercase"
                  placeholder="e.g. TP012345"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-4">
              <Box className="text-accent" /> Asset Selection
            </h2>
            <div>
              <label className="label-brutal">Target Asset</label>
              <select 
                name="equipmentId"
                value={formData.equipmentId}
                onChange={handleChange}
                className="input-brutal appearance-none bg-[#0f0f0f]"
              >
                <option value="">-- SELECT ASSET --</option>
                {equipmentList.map(eq => (
                  <option key={eq.id} value={eq.id}>{eq.name} ({eq.category})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-4">
              <Calendar className="text-accent" /> Temporal Parameters
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="label-brutal">Operation Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input-brutal"
                />
              </div>
              <div>
                <label className="label-brutal">Start Time (24H)</label>
                <input 
                  type="time" 
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="input-brutal"
                />
              </div>
              <div>
                <label className="label-brutal">End Time (24H)</label>
                <input 
                  type="time" 
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="input-brutal"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-4">
              <FileText className="text-accent" /> Booking Purpose
            </h2>
            <div>
              <label className="label-brutal">Purpose</label>
              <textarea 
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="input-brutal min-h-[100px] resize-y"
                placeholder="Briefly state the objective..."
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-brutal text-xl">
            Create Booking
          </button>
        </form>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-28 space-y-6">
          <h2 className="text-2xl font-black mb-6">ASSET PREVIEW</h2>
          {selectedEquipment ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-brutal"
            >
              <div className="h-40 w-full bg-[#1a1a1a] border-2 border-border mb-6 flex items-center justify-center text-accent relative overflow-hidden">
                {selectedEquipment.image ? (
                  <Image
                    src={selectedEquipment.image}
                    alt={selectedEquipment.name}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <Box size={48} strokeWidth={1} />
                )}
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase">{selectedEquipment.name}</h3>
              <div className="space-y-2 font-mono text-sm text-gray-400">
                <p><span className="text-white">ID:</span> {selectedEquipment.id}</p>
                <p><span className="text-white">TYPE:</span> {selectedEquipment.category}</p>
                <p><span className="text-white">LOC:</span> {selectedEquipment.location}</p>
                <p><span className="text-white">COND:</span> {selectedEquipment.condition}</p>
              </div>
            </motion.div>
          ) : (
            <div className="card-brutal border-dashed flex flex-col items-center justify-center py-20 text-center text-gray-500">
              <Box size={48} strokeWidth={1} className="mb-4 opacity-50" />
              <p className="font-mono uppercase tracking-widest text-sm">NO ASSET SELECTED</p>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-mono text-accent">INITIALIZING SECURE LINK...</div>}>
      <BookingForm />
    </Suspense>
  );
}
