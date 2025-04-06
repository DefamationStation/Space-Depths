import { updateHealth, updateEnergy, updateOxygen } from '../reducers/playerReducer';
import { incrementLevel, incrementRoomsExplored } from '../reducers/gameWorldReducer';

export const playerTakeDamage = (amount: number) => (dispatch: any, getState: any) => {
  const { player } = getState();
  const newHealth = Math.max(0, player.health - amount);
  dispatch(updateHealth(newHealth));
};

export const playerUseEnergy = (amount: number) => (dispatch: any, getState: any) => {
  const { player } = getState();
  const newEnergy = Math.max(0, player.energy - amount);
  dispatch(updateEnergy(newEnergy));
};

export const playerConsumeOxygen = (amount: number) => (dispatch: any, getState: any) => {
  const { player } = getState();
  const newOxygen = Math.max(0, player.oxygen - amount);
  dispatch(updateOxygen(newOxygen));
};

export const exploreRoom = () => (dispatch: any) => {
  dispatch(incrementRoomsExplored());
};

export const levelUp = () => (dispatch: any) => {
  dispatch(incrementLevel());
};