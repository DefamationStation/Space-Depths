import { RootState } from '../reducers';

export const selectInventoryItems = (state: RootState) => state.inventory.collection;
export const selectEquippedItems = (state: RootState) => state.inventory.equippedItems;