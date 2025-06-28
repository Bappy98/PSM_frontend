import { apiSlice } from "../apiSlice";

export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => ({
        url: "/company",
        method: "GET",
      }),
    }),
    getSingleCompany: builder.query({
      query: (id) => `/company/${id}`,
      providesTags: (result, error, id) => [{ type: "Company", id }],
    }),
    updateCompany: builder.mutation({
      query: ({ id, ...updateCompany }) => ({
        url: `/company/${id}`,
        method: "PUT",
        body: updateCompany,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Company", id },
        { type: "Company", id: "LIST" },
      ],
    }),
  }),
});

export const {useGetCompanyQuery,useGetSingleCompanyQuery,useUpdateCompanyMutation} = companyApi
