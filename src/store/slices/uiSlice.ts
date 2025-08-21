import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
  isFilterPanelOpen: boolean;
}

const initialState: UIState = {
  darkMode: false,
  isFilterPanelOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    openFilterPanel(state) {
      state.isFilterPanelOpen = true;
    },
    closeFilterPanel(state) {
      state.isFilterPanelOpen = false;
    },
    toggleFilterPanel(state) {
      state.isFilterPanelOpen = !state.isFilterPanelOpen;
    },
  },
});

export const { setDarkMode, toggleDarkMode, openFilterPanel, closeFilterPanel, toggleFilterPanel } = uiSlice.actions;
export default uiSlice.reducer; 