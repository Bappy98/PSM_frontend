import { createSlice } from "@reduxjs/toolkit";

const storeUser = JSON.parse(localStorage.getItem("auth"));

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: storeUser?.accessToken ? storeUser.accessToken : null,
    isLoggedIn: storeUser?.accessToken ? true : false,
    user_id: storeUser?.user_id ? storeUser?.user_id : null,
    userType: storeUser?.userType ? storeUser?.userType : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
      state.user_id = action.payload.user_id;
      state.userType = action.payload.userType;
    },
    logOut: (state, action) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.user_id = null;
      state.userType = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user_id;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectCurrentUserType = (state) => state.auth.userType;
