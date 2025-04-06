import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeEnemies: [],
  behaviors: {},
};

const enemySlice = createSlice({
  name: 'enemy',
  initialState,
  reducers: {
    addEnemy(state, action) {
      state.activeEnemies.push(action.payload);
    },
    removeEnemy(state, action) {
      state.activeEnemies = state.activeEnemies.filter(enemy => enemy.id !== action.payload);
    },
    updateBehavior(state, action) {
      state.behaviors[action.payload.id] = action.payload.behavior;
    },
  },
});

export const { addEnemy, removeEnemy, updateBehavior } = enemySlice.actions;
export default enemySlice.reducer;