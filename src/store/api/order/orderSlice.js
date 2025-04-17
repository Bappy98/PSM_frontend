import fetchWrapper from "@/util/fetchWrapper";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const orderRequest = createAsyncThunk(
    '/order-request',
    async () =>{
        try {
            const response = await fetchWrapper.get(`/all-order`);
      return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    }
)

const initialState = {
  loading:false,
  error:null,
  success:false,
  order:[]
}

const orderSlice = createSlice({
  name:'orderMedicine',
  initialState,
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(orderRequest.pending,(state)=>{
      state.loading = true;
    })
    .addCase(orderRequest.fulfilled,(state,action)=>{
      state.loading = false,
      state.success = true,
      state.order = action.payload
    })
    .addCase(orderRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user data";
    })
  }
})
  
  export default orderSlice.reducer