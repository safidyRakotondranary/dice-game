import { type DiceType } from '../types/Dice';
import { type PlayerDetailsType } from '../types/Game';
import {
  fa0,
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export const rollDice = (minValue: number, maxValue: number): number => {
  return Math.floor(Math.random() * maxValue) + minValue;
};

export const calculateTotalScore = (dices: DiceType[]): number => {
  return dices.reduce((total, dice) => total + (dice.value ?? 0), 0);
};

export const getWinner = (playerDetails: Record<number, PlayerDetailsType>): number | null => {
  let maxScore = 0;
  let winner: number | null = null;

  for (const player in playerDetails) {
    const playerNumber = Number(player);
    if (playerDetails[playerNumber].score > maxScore) {
      maxScore = playerDetails[playerNumber].score;
      winner = playerNumber;
    } else if (playerDetails[playerNumber].score === maxScore) {
      // Multiple players have the same max score, so no clear winner
      winner = null;
    }
  }

  return winner;
};

export const getIconByValue = (val: number): IconDefinition => {
  switch (val) {
    case 1:
      return faDiceOne;
    case 2:
      return faDiceTwo;
    case 3:
      return faDiceThree;
    case 4:
      return faDiceFour;
    case 5:
      return faDiceFive;
    case 6:
      return faDiceSix;
    default:
      return fa0;
  }
};
