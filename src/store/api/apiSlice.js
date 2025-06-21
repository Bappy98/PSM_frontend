import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 const url = import.meta.env.VITE_API_URL;
  console.log(url);
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  endpoints: (builder) => ({}),
});
