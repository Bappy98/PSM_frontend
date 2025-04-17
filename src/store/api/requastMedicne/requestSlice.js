import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    requestM: []
};

export const requestMedicine = createSlice({
    name: 'request',
    initialState,
    reducers: {
        addMedicine: (state, action) => {
            state.requestM.push(action.payload);
        },
        removeMedicine: (state, action) => {
            state.requestM = state.requestM.filter(
                (req, index) => index !== action.payload
            );
        }
    }
});

export const { addMedicine, removeMedicine } = requestMedicine.actions;

export default requestMedicine.reducer;
