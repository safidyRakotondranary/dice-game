import { useState } from 'react';
import { type useDicesListType, type DiceType, type InitializeDicesPropsType } from '../types/Dice';
import { rollDice } from '../utilities/Game';

export default function useDicesList(): useDicesListType {
  const [dices, setDices] = useState<DiceType[]>([]);

  const initializeDices = ({ dicesCount, diceDetails }: InitializeDicesPropsType): void => {
    const initialDices = Array.from(Array(dicesCount).keys()).map(() => ({
      minValue: diceDetails.minValue,
      maxValue: diceDetails.maxValue,
    }));
    setDices(initialDices);
  };

  const rollDices = (): void => {
    setDices(oldDicesVal => {
      return oldDicesVal.map(dice => ({
        ...dice,
        value: rollDice(dice.minValue, dice.maxValue),
      }));
    });
  };

  return {
    dices,
    initializeDices,
    rollDices,
  };
}
