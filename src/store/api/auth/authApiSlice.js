import { apiSlice } from "./../apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    branchRegister: builder.mutation({
      query: (user) => ({
        url: "/branch/register",
        method: "post",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useBranchRegisterMutation, useLoginMutation } = authApi;
