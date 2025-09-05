


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