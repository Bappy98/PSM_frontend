import { apiSlice } from "../apiSlice";

export const medicineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMedicine: builder.query({
      query: () => ({
        url: "/medicines",
        method: "GET",
      }),
    }),
    getSingleMedicine: builder.query({
      query: (id) => `/medicine/${id}`,
      providesTags: (result, error, id) => [{ type: "Medicine", id }],
    }),
    updateMedicine: builder.mutation({
      query: ({ id, ...updateMedicine }) => ({
        url: `/medicine/${id}`,
        method: "PUT",
        body: updateMedicine,
      }),
      deleteMedicine: builder.mutation({
      query: (id) => ({
        url: `/medicine/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Medicine", id },
        { type: "Medicine", id: "LIST" },
      ],
    }),
 
    }),
  }),
});

export const {
  useGetMedicineQuery,
  useUpdateMedicineMutation,
  useGetSingleMedicineQuery,
} = medicineApi;
