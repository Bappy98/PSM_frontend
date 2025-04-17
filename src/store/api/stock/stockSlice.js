import fetchWrapper from "@/util/fetchWrapper";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const getStock = createAsyncThunk(
    'stock/fetchStock',
    async ({userId}) =>{
        try {
            const response = await fetchWrapper.get(`/stock/${userId}`);
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
  stock:[]
}

const stockSlice = createSlice({
  name:'stock',
  initialState,
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(getStock.pending,(state)=>{
      state.loading = true;
    })
    .addCase(getStock.fulfilled,(state,action)=>{
      state.loading = false,
      state.success = true,
      state.stock = action.payload
    })
    .addCase(getStock.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user data";
    })
  }
})
  
  export default stockSlice.reducer