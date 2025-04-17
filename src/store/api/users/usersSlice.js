import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchWrapper from "../../../util/fetchWrapper";
//import userSlice from "../user/userSlice"

const initialState = {
  loading: false,
  error: null,
  success: false,
  users: [],
};

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  try {
    const response = await fetchWrapper.get(`/users`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data";
      });
  },
});

export default usersSlice.reducer;
