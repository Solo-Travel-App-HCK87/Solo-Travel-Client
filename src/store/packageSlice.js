import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../helpers/http';
import { showError } from '../helpers/alert';
export const packageSlice = createSlice({
  name: 'package',
  initialState: {
    packages: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPackages.fulfilled, (state, actions) => {
      state.packages = actions.payload;
    });
  },
});

export const fetchPackages = createAsyncThunk(
  'packages/getData',
  async function getPackage(params = {}, thunkAPI) {
    try {
      const { search, sort } = params;
      const queryParams = new URLSearchParams();
      
      if (search) {
        queryParams.append('search', search);
      }
      
      if (sort) {
        queryParams.append('sort', sort);
      }
      
      const url = `/packages${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const { data } = await http({
        method: 'GET',
        url: url,
        headers : {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      return data;
    } catch (error) {
      showError(error);
      throw error;
    }
  }
);

export const packageReducer = packageSlice.reducer;
