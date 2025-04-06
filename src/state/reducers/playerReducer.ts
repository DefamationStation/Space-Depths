import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  health: 100,
  energy: 100,
  oxygen: 100,
  position: { x: 0, y: 0 },
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updateHealth(state, action) {
      state.health = action.payload;
    },
    updateEnergy(state, action) {
      state.energy = action.payload;
    },
    updateOxygen(state, action) {
      state.oxygen = action.payload;
    },
    updatePosition(state, action) {
      state.position = action.payload;
    },
  },
});

export const { updateHealth, updateEnergy, updateOxygen, updatePosition } = playerSlice.actions;
export default playerSlice.reducer;