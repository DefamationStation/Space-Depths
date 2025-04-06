import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  equippedItems: [],
  collection: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem(state, action) {
      state.collection.push(action.payload);
    },
    removeItem(state, action) {
      state.collection = state.collection.filter(item => item.id !== action.payload);
    },
    equipItem(state, action) {
      state.equippedItems.push(action.payload);
    },
    unequipItem(state, action) {
      state.equippedItems = state.equippedItems.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem, equipItem, unequipItem } = inventorySlice.actions;
export default inventorySlice.reducer;