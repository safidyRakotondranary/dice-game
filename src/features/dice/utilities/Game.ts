import { type DiceType } from '../types/Dice';
import { type PlayerDetailsType } from '../types/Game';

export const rollDice = (minValue: number, maxValue: number): number => {
  return Math.floor(Math.random() * maxValue) + minValue;
};

export const calculateTotalScore = (dices: DiceType[]): number => {
  return dices.reduce((total, dice) => total + (dice.value ?? 0), 0);
};

export const getWinner = (playerDetails: Record<number, PlayerDetailsType>): number | null => {
  let maxScore = -1;
  let winner: number | null = null;

  for (const player in playerDetails) {
    const playerNumber = Number(player);
    if (playerDetails[playerNumber].score > maxScore) {
      maxScore = playerDetails[playerNumber].score;
      winner = playerNumber;
    }
  }

  return winner;
};
