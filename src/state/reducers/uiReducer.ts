import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menus: {},
  dialogs: {},
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openMenu(state, action) {
      state.menus[action.payload] = true;
    },
    closeMenu(state, action) {
      state.menus[action.payload] = false;
    },
    showDialog(state, action) {
      state.dialogs[action.payload] = true;
    },
    hideDialog(state, action) {
      state.dialogs[action.payload] = false;
    },
    addNotification(state, action) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter((_, index) => index !== action.payload);
    },
  },
});

export const { openMenu, closeMenu, showDialog, hideDialog, addNotification, removeNotification } = uiSlice.actions;
export default uiSlice.reducer;