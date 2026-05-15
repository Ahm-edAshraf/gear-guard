import { Booking } from '../types';
import { loadBookings, loadEquipment, saveBookings } from './storage';

export const isBookingOverdue = (booking: Booking): boolean => {
  if (booking.status === 'Returned' || booking.status === 'Cancelled' || booking.status === 'Damaged') {
    return false;
  }
  
  const now = new Date();
  const endDateTime = new Date(`${booking.date}T${booking.endTime}`);
  
  return now > endDateTime;
};

export const updateOverdueBookings = (): void => {
  const bookings = loadBookings();
  let changed = false;
  
  for (const booking of bookings) {
    if (booking.status === 'Booked' || booking.status === 'Picked Up') {
      if (isBookingOverdue(booking)) {
        booking.status = 'Overdue';
        changed = true;
      }
    }
  }
  
  if (changed) {
    saveBookings(bookings);
  }
};

export interface DashboardStats {
  totalEquipment: number;
  totalBookings: number;
  activeBookings: number;
  pickedUpItems: number;
  returnedItems: number;
  overdueItems: number;
  damagedItems: number;
}

export const getDashboardStats = (): DashboardStats => {
  const equipment = loadEquipment();
  const bookings = loadBookings();
  
  let activeBookings = 0;
  let pickedUpItems = 0;
  let returnedItems = 0;
  let overdueItems = 0;
  let damagedItems = 0;
  
  for (const booking of bookings) {
    if (booking.status === 'Booked' || booking.status === 'Picked Up' || booking.status === 'Overdue') {
      activeBookings++;
    }
    if (booking.status === 'Picked Up') pickedUpItems++;
    if (booking.status === 'Returned') returnedItems++;
    if (booking.status === 'Overdue') overdueItems++;
    if (booking.status === 'Damaged') damagedItems++;
  }
  
  return {
    totalEquipment: equipment.length,
    totalBookings: bookings.length,
    activeBookings,
    pickedUpItems,
    returnedItems,
    overdueItems,
    damagedItems
  };
};

export const getActiveBookings = (): Booking[] => {
  const bookings = loadBookings();
  return bookings.filter(b => 
    b.status === 'Booked' || b.status === 'Picked Up' || b.status === 'Overdue'
  );
};

export const getMostBookedEquipment = (): {name: string, count: number}[] => {
  const bookings = loadBookings();
  const equipmentCounts: Record<string, number> = {};
  
  for (const booking of bookings) {
    if (booking.status !== 'Cancelled') {
      equipmentCounts[booking.equipmentName] = (equipmentCounts[booking.equipmentName] || 0) + 1;
    }
  }
  
  return Object.entries(equipmentCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // top 5
};
