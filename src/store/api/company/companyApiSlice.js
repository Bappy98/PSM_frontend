import { apiSlice } from "../apiSlice";

export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => ({
        url: "/company",
        method: "GET",
      }),
    }),
  }),
});

export const {useGetCompanyQuery} = companyApi
