import { User as AuthUser } from '../services/authService';

export type User = AuthUser;

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

export interface Tab {
  key: string;
  label: string;
  count: number;
}

export interface FormOption {
  value: string;
  label: string;
}

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

export interface SortState {
  sortBy: string;
  ascending: boolean;
} 