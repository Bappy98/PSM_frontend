import fetchWrapper from "@/util/fetchWrapper";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const getBranchRequest = createAsyncThunk(
    'branch/request',
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

const getBranchSlice = createSlice({
  name:'branchRequestMedicine',
  initialState,
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(getBranchRequest.pending,(state)=>{
      state.loading = true;
    })
    .addCase(getBranchRequest.fulfilled,(state,action)=>{
      state.loading = false,
      state.success = true,
      state.request = action.payload
    })
    .addCase(getBranchRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user data";
    })
  }
})
  
  export default getBranchSlice.reducer