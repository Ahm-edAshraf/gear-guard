import { Booking, Equipment } from '../types';
import { defaultEquipment } from './equipmentData';

const BOOKINGS_KEY = 'gearguard_bookings';
const EQUIPMENT_KEY = 'gearguard_equipment';

export const loadBookings = (): Booking[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(BOOKINGS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse bookings from localStorage', e);
      return [];
    }
  }
  return [];
};

export const saveBookings = (bookings: Booking[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

export const loadEquipment = (): Equipment[] => {
  if (typeof window === 'undefined') return defaultEquipment;
  const stored = localStorage.getItem(EQUIPMENT_KEY);
  if (stored) {
    try {
      const parsed: Equipment[] = JSON.parse(stored);
      // Migration: normalize stored image references to the current bundled public assets.
      let updated = false;
      const migrated = parsed.map(eq => {
        const defaultEq = defaultEquipment.find(d => d.id === eq.id);
        if (defaultEq) {
          if (eq.image !== defaultEq.image) {
            updated = true;
            return { ...eq, image: defaultEq.image };
          }
        }
        return eq;
      });
      if (updated) {
        saveEquipment(migrated);
        return migrated;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse equipment from localStorage', e);
      return defaultEquipment;
    }
  }
  // Initialize with default if empty
  saveEquipment(defaultEquipment);
  return defaultEquipment;
};

export const saveEquipment = (equipment: Equipment[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(EQUIPMENT_KEY, JSON.stringify(equipment));
};

export const resetDemoData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(EQUIPMENT_KEY, JSON.stringify(defaultEquipment));
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify([]));
};
