import { RootState } from '../reducers';

export const selectCurrentLevel = (state: RootState) => state.gameWorld.currentLevel;
export const selectRoomsExplored = (state: RootState) => state.gameWorld.roomsExplored;