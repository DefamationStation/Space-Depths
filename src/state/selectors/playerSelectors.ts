import { RootState } from '../reducers';

export const selectPlayerHealth = (state: RootState) => state.player.health;
export const selectPlayerEnergy = (state: RootState) => state.player.energy;
export const selectPlayerOxygen = (state: RootState) => state.player.oxygen;
export const selectPlayerPosition = (state: RootState) => state.player.position;