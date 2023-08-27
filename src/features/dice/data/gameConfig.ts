import { BehaviorSubject } from 'rxjs';
import { type PlayerDetailsType } from '../types/Game';

// Initial configuration values
const initialNumberOfPlayers = 2;
const initialNumberOfDices = 2;
const initialPlayerTurn = 0;
const initialPlayersDetails: Record<number, PlayerDetailsType> = {};

// Create BehaviorSubject instances
export const numberOfPlayersSubject = new BehaviorSubject(initialNumberOfPlayers);
export const numberOfDicesSubject = new BehaviorSubject(initialNumberOfDices);
export const playerTurnSubject = new BehaviorSubject(initialPlayerTurn);
export const playersDetailsSubject = new BehaviorSubject(initialPlayersDetails);

export const resetSubjects = (): void => {
  resetConfiguration();
  resetplayersDetails();
};

export const resetConfiguration = (): void => {
  numberOfPlayersSubject.next(initialNumberOfPlayers);
  numberOfDicesSubject.next(initialNumberOfDices);
};

export const resetplayersDetails = (): void => {
  playersDetailsSubject.next(initialPlayersDetails);
  playerTurnSubject.next(initialPlayerTurn);
};
