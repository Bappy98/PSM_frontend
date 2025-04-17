import fetchWrapper from "../../../util/fetchWrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  user: {},
};

export const getUser = createAsyncThunk("user/getUser", async ({ user_id }) => {
  try {
    const response = await fetchWrapper(`user/${user_id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data";
      });
  },
});

export default userSlice.reducer;
