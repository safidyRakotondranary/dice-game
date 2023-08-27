import { useEffect, useMemo } from 'react';
import { DICE_DEFAULT_MAX_VALUE, DICE_DEFAULT_MIN_VALUE, GAME_DICE_COUNT } from '../data/constants';
import useDicesList from '../hooks/useDicesList';
import { type DiceType } from '../types/Dice';
import Dice from 'src/features/dice/components/Dice';
import { calculateTotalScore } from '../utilities/Game';

const Game = (): JSX.Element => {
  const { dices, initializeDices, rollDices } = useDicesList();

  useEffect(() => {
    const diceCount: number = Number(process.env.REACT_APP_GAME_DICE_COUNT) || GAME_DICE_COUNT;
    const diceDetails: DiceType = {
      minValue: Number(process.env.REACT_APP_DICE_MIN_VALUE) || DICE_DEFAULT_MIN_VALUE,
      maxValue: Number(process.env.REACT_APP_DICE_MAX_VALUE) || DICE_DEFAULT_MAX_VALUE,
    };

    initializeDices({ diceCount, diceDetails });
  }, []);

  const totalScore = useMemo(() => {
    return calculateTotalScore(dices);
  }, [dices]);

  return (
    <div>
      {dices.map((dice, index) => (
        <Dice key={index} value={dice.value}></Dice>
      ))}
      <button onClick={rollDices}>Roll dices</button>

      <div>Total: {totalScore}</div>
    </div>
  );
};

export default Game;
