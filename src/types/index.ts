// User related types
export interface User {
  name: string;
  type: string;
  avatar: string;
  company: string;
  registrationDate: string;
  lastLogin: string;
  address: string;
  website: string;
  phone: string;
  email: string;
  bio: string;
}

// Work Order related types
export interface WorkOrder {
  id: string;
  title: string;
  createdBy: string;
  win: string;
  companyWOID: string;
  startDate: string;
  endDate: string;
  assignedTo: string;
  phone: string;
  email: string;
  price: string;
  calcInfo: string;
  status: string[];
  messages: number;
  location: string;
}

// Tab related types
export interface Tab {
  key: string;
  label: string;
  count: number;
}

// Form option types
export interface FormOption {
  value: string;
  label: string;
}

// Filter types
export interface FilterState {
  win?: string;
  contractorId?: string;
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
  createdBy?: string;
  woTitle?: string;
  woStatus?: string;
  city?: string;
  state?: string;
  zip?: string;
}

// Sorting types
export interface SortState {
  sortBy: string;
  ascending: boolean;
} 