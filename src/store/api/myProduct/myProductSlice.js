// src/store/api/myProduct/myProductSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // This should be an array
};

const myProductSlice = createSlice({
  name: 'myProduct',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // Avoid adding duplicates
      
        state.cartItems.push(action.payload);
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    // Optional: Add more reducers like clearCart, updateQuantity, etc.
  },
});

export const { addItem, removeItem } = myProductSlice.actions;
export default myProductSlice.reducer;
