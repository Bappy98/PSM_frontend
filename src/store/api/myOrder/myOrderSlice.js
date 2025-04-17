import fetchWrapper from "@/util/fetchWrapper";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const getMyOrder = createAsyncThunk(
    '/my-order',
    async ({userId}) =>{
        try {
            const response = await fetchWrapper.get(`/my-order/${userId}`);
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
  myOrder:[]
}

const myOrderSlice = createSlice({
  name:'myOrderMedicine',
  initialState,
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(getMyOrder.pending,(state)=>{
      state.loading = true;
    })
    .addCase(getMyOrder.fulfilled,(state,action)=>{
      state.loading = false,
      state.success = true,
      state.myOrder = action.payload
    })
    .addCase(getMyOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user data";
    })
  }
})
  
  export default myOrderSlice.reducer