import fetchWrapper from "../../../util/fetchWrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  branch: {},
};

export const singleBranch = createAsyncThunk("user/branch", async ({ userId }) => {
  try {
    const response = await fetchWrapper(`/branch/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

const userSlice = createSlice({
  name: "singleBranch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(singleBranch.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(singleBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data";
      });
  },
});

export default userSlice.reducer;
