export const validateStudentInfo = (studentName: string, studentId: string): string | null => {
  if (!studentName.trim()) return "Student Name is required.";
  if (!studentId.trim()) return "Student ID is required.";
  if (!/^[A-Z0-9]+$/i.test(studentId)) return "Student ID format is invalid. Use alphanumeric characters.";
  return null;
};

export const validateBookingTime = (date: string, startTime: string, endTime: string): string | null => {
  if (!date) return "Booking date is required.";
  if (!startTime) return "Start time is required.";
  if (!endTime) return "End time is required.";
  
  const now = new Date();
  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);
  
  if (startDateTime < now) {
    return "Cannot book in the past.";
  }
  
  if (endDateTime <= startDateTime) {
    return "End time must be after start time.";
  }
  
  return null;
};

export const validateBookingDuration = (date: string, startTime: string, endTime: string): string | null => {
  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);
  
  const diffMs = endDateTime.getTime() - startDateTime.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 30) {
    return "Minimum booking duration is 30 minutes.";
  }
  if (diffMins > 8 * 60) {
    return "Maximum booking duration is 8 hours.";
  }
  
  return null;
};

export const validateBookingForm = (
  studentName: string, 
  studentId: string, 
  date: string, 
  startTime: string, 
  endTime: string,
  equipmentId: string,
  purpose: string
): string | null => {
  if (!equipmentId) return "Please select equipment.";
  if (!purpose.trim()) return "Purpose is required.";
  
  let error = validateStudentInfo(studentName, studentId);
  if (error) return error;
  
  error = validateBookingTime(date, startTime, endTime);
  if (error) return error;
  
  error = validateBookingDuration(date, startTime, endTime);
  if (error) return error;
  
  return null;
};
