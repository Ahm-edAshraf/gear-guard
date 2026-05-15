export type EquipmentCategory = 'Media' | 'Audio' | 'Presentation' | 'Computing' | 'Event Setup' | 'Accessories';

export type EquipmentCondition = 'Excellent' | 'Good' | 'Fair' | 'Needs Repair';

export type EquipmentStatus = 'Available' | 'In Use' | 'Maintenance';

export type BookingStatus = 'Booked' | 'Picked Up' | 'Returned' | 'Overdue' | 'Cancelled' | 'Damaged';

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  location: string;
  condition: EquipmentCondition;
  status: EquipmentStatus;
  image: string;
}

export interface Booking {
  id: string;
  studentName: string;
  studentId: string;
  equipmentId: string;
  equipmentName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm (24-hour)
  endTime: string; // HH:mm (24-hour)
  purpose: string;
  status: BookingStatus;
  createdAt: string; // ISO string
}
