import fetchWrapper from "@/util/fetchWrapper";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const getRequest = createAsyncThunk(
    'stock/request',
    async () =>{
        try {
            const response = await fetchWrapper.get(`/all-request`);
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
  request:[]
}

const stockSlice = createSlice({
  name:'requestMedicine',
  initialState,
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(getRequest.pending,(state)=>{
      state.loading = true;
    })
    .addCase(getRequest.fulfilled,(state,action)=>{
      state.loading = false,
      state.success = true,
      state.request = action.payload
    })
    .addCase(getRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user data";
    })
  }
})
  
  export default stockSlice.reducer