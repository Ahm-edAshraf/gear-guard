import { Booking, BookingStatus, Equipment } from '../types';
import { loadBookings, saveBookings, loadEquipment, saveEquipment } from './storage';
import { validateBookingForm } from './validation';

export const isTimeOverlap = (newStart: string, newEnd: string, existingStart: string, existingEnd: string): boolean => {
  // newStart < existingEnd AND newEnd > existingStart
  return newStart < existingEnd && newEnd > existingStart;
};

export const findBookingConflict = (
  equipmentId: string, 
  date: string, 
  newStart: string, 
  newEnd: string, 
  existingBookings: Booking[]
): Booking | null => {
  for (const booking of existingBookings) {
    if (booking.equipmentId === equipmentId && booking.date === date) {
      if (booking.status !== 'Cancelled' && booking.status !== 'Returned') {
        if (isTimeOverlap(newStart, newEnd, booking.startTime, booking.endTime)) {
          return booking;
        }
      }
    }
  }
  return null;
};

export const generateBookingId = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.floor(1000 + Math.random() * 9000).toString();
  return `BOOK-${dateStr}-${randomStr}`;
};

export const createBooking = (
  studentName: string,
  studentId: string,
  equipmentId: string,
  date: string,
  startTime: string,
  endTime: string,
  purpose: string
): { success: boolean; message: string; booking?: Booking } => {
  const error = validateBookingForm(studentName, studentId, date, startTime, endTime, equipmentId, purpose);
  if (error) return { success: false, message: error };

  const equipmentList = loadEquipment();
  const equipment = equipmentList.find(e => e.id === equipmentId);
  if (!equipment) return { success: false, message: "Equipment not found." };

  if (equipment.status !== "Available") {
    return {
      success: false,
      message: "This equipment is currently unavailable."
    };
  }

  const bookings = loadBookings();
  const conflict = findBookingConflict(equipmentId, date, startTime, endTime, bookings);
  
  if (conflict) {
    return { success: false, message: "This equipment is already booked during this time. Please choose another slot." };
  }

  const newBooking: Booking = {
    id: generateBookingId(),
    studentName,
    studentId,
    equipmentId,
    equipmentName: equipment.name,
    date,
    startTime,
    endTime,
    purpose,
    status: 'Booked',
    createdAt: new Date().toISOString()
  };

  bookings.push(newBooking);
  saveBookings(bookings);

  return { success: true, message: "Booking created successfully.", booking: newBooking };
};

export const updateBookingStatus = (bookingId: string, newStatus: BookingStatus): void => {
  const bookings = loadBookings();
  const index = bookings.findIndex(b => b.id === bookingId);
  if (index !== -1) {
    bookings[index].status = newStatus;
    saveBookings(bookings);
  }
};

export const cancelBooking = (bookingId: string): void => {
  updateBookingStatus(bookingId, 'Cancelled');
};

export const markAsPickedUp = (bookingId: string): void => {
  updateBookingStatus(bookingId, 'Picked Up');
};

export const markAsReturned = (bookingId: string): void => {
  updateBookingStatus(bookingId, 'Returned');
};

export const markAsDamaged = (bookingId: string): void => {
  updateBookingStatus(bookingId, 'Damaged');

  const bookings = loadBookings();
  const booking = bookings.find(b => b.id === bookingId);
  
  if (booking) {
    const equipmentList = loadEquipment();
    const equipment = equipmentList.find(e => e.id === booking.equipmentId);
    if (equipment) {
      equipment.status = 'Maintenance';
      equipment.condition = 'Needs Repair';
      saveEquipment(equipmentList);
    }
  }
};

export const markEquipmentRepairedFromBooking = (bookingId: string): void => {
  const bookings = loadBookings();
  const booking = bookings.find(b => b.id === bookingId);
  
  if (booking) {
    const equipmentList = loadEquipment();
    const equipment = equipmentList.find(e => e.id === booking.equipmentId);
    if (equipment) {
      equipment.status = 'Available';
      equipment.condition = 'Good';
      saveEquipment(equipmentList);
    }
  }
};

export const getEquipmentAvailability = (equipmentId: string, date: string, startTime: string, endTime: string): boolean => {
  const equipmentList = loadEquipment();
  const equipment = equipmentList.find(e => e.id === equipmentId);
  if (!equipment || equipment.status !== 'Available') return false;

  const bookings = loadBookings();
  const conflict = findBookingConflict(equipmentId, date, startTime, endTime, bookings);
  return conflict === null;
};

export const getAvailableEquipment = (date: string, startTime: string, endTime: string): Equipment[] => {
  const equipment = loadEquipment();
  const bookings = loadBookings();
  
  return equipment.filter(eq => {
    if (eq.status !== 'Available') return false;
    const conflict = findBookingConflict(eq.id, date, startTime, endTime, bookings);
    return conflict === null;
  });
};
