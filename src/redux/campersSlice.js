import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductById } from '../api/api';

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async ({ page, limit, location, type, ...features }, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (location) params.location = location;
      if (type) params.form = type;
      Object.keys(features).forEach((key) => {
        if (features[key]) params[key] = true;
      });

      console.log('API Request Params:', params);
      const response = await fetchAllProducts(params);
      console.log('API Response:', response);

      // Обробляємо формат { total, items }
      const items = response.items && Array.isArray(response.items) ? response.items : Array.isArray(response) ? response : [];
      items.forEach((camper, index) => {
        console.log(`Camper ${index + 1} gallery:`, camper.gallery);
        camper.gallery?.forEach((img, i) => {
          console.log(`Camper ${index + 1} image ${i + 1}:`, img.original);
        });
      });

      return items;
    } catch (error) {
      console.error('Fetch Campers Error:', error.message || 'Unknown error');
      return rejectWithValue(error.message || 'Failed to fetch campers');
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  'campers/fetchCamperById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchProductById(id);
      console.log('API Response for ID:', id, 'Gallery:', response.gallery);
      response.gallery?.forEach((img, i) => {
        console.log(`Image ${i + 1}:`, img.original);
      });
      return response;
    } catch (error) {
      console.error('Fetch Camper By ID Error:', error.message || 'Unknown error');
      return rejectWithValue(error.message || 'Failed to fetch camper');
    }
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    selectedCamper: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default campersSlice.reducer;