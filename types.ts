
// @fix: Added missing interfaces required by various components
export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  category: string;
  frequency: string;
  time: string;
  stock: number;
}

export interface Reminder {
  id: string;
  medicineId: string;
  time: string;
  completed: boolean;
}

export interface MedicineOrder {
  medicineName: string;
  units: string;
  address: string;
  phone: string;
  notes?: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  address: string;
  phone: string;
}
