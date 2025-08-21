import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FilterState, SortState } from '../../types';

interface DashboardState {
  searchQuery: string;
  selectedTab: string;
  filter: FilterState;
  sort: SortState;
  selectedIds: string[];
}

const initialState: DashboardState = {
  searchQuery: '',
  selectedTab: 'all',
  filter: {},
  sort: { sortBy: 'createdAt', ascending: true },
  selectedIds: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedTab(state, action: PayloadAction<string>) {
      state.selectedTab = action.payload;
    },
    setFilter(state, action: PayloadAction<FilterState>) {
      state.filter = action.payload;
    },
    resetFilter(state) {
      state.filter = {};
    },
    setSort(state, action: PayloadAction<SortState>) {
      state.sort = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sort.sortBy = action.payload;
    },
    toggleSortDirection(state) {
      state.sort.ascending = !state.sort.ascending;
    },
    setSelection(state, action: PayloadAction<string[]>) {
      state.selectedIds = action.payload;
    },
    clearSelection(state) {
      state.selectedIds = [];
    },
    toggleSelect(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(existingId => existingId !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
  },
});

export const {
  setSearchQuery,
  setSelectedTab,
  setFilter,
  resetFilter,
  setSort,
  setSortBy,
  toggleSortDirection,
  setSelection,
  clearSelection,
  toggleSelect,
} = dashboardSlice.actions;

export default dashboardSlice.reducer; 