import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLevel: 1,
  roomsExplored: 0,
};

const gameWorldSlice = createSlice({
  name: 'gameWorld',
  initialState,
  reducers: {
    incrementLevel(state) {
      state.currentLevel += 1;
    },
    incrementRoomsExplored(state) {
      state.roomsExplored += 1;
    },
  },
});

export const { incrementLevel, incrementRoomsExplored } = gameWorldSlice.actions;
export default gameWorldSlice.reducer;