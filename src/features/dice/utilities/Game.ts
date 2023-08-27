import { type DiceType } from '../types/Dice';

export const rollDice = (minValue: number, maxValue: number): number => {
  return Math.floor(Math.random() * maxValue) + minValue;
};

export const calculateTotalScore = (dices: DiceType[]): number => {
  return dices.reduce((total, dice) => total + (dice.value ?? 0), 0);
};
