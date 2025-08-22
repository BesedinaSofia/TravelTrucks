import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    location: '',
    type: '',
    features: {
      AC: false,
      kitchen: false,
      TV: false,
      bathroom: false,
    },
    page: 1,
    limit: 4,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
      state.page = 1; // Reset page on filter change
    },
    setType: (state, action) => {
      state.type = action.payload;
      state.page = 1;
    },
    toggleFeature: (state, action) => {
      state.features[action.payload] = !state.features[action.payload];
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetFilters: (state) => {
      state.location = '';
      state.type = '';
      state.features = { AC: false, kitchen: false, TV: false, bathroom: false };
      state.page = 1;
    },
  },
});

export const { setLocation, setType, toggleFeature, incrementPage, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;