import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalItems: 0, // Tracks total number of items in the cart
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalItems++; // Increment totalItems for every addition
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find(item => item.name === action.payload);
      if (itemToRemove) {
        state.totalItems -= itemToRemove.quantity; // Decrement totalItems by item's quantity
        state.items = state.items.filter(item => item.name !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        const difference = quantity - itemToUpdate.quantity;
        itemToUpdate.quantity = quantity;
        state.totalItems += difference; // Adjust totalItems based on quantity difference
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;