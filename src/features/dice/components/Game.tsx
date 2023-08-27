import { useEffect, useMemo } from 'react';
import { DICE_DEFAULT_MAX_VALUE, DICE_DEFAULT_MIN_VALUE } from '../data/constants';
import useDicesList from '../hooks/useDicesList';
import { type DiceType } from '../types/Dice';
import Dice from 'src/features/dice/components/Dice';
import { calculateTotalScore } from '../utilities/Game';
import { type GamePropsType } from '../types/Game';
import { numberOfDicesSubject } from '../data/gameConfig';

const Game = ({ setScore, alreadyPlayed, setAlreadyPlayed }: GamePropsType): JSX.Element => {
  const { dices, initializeDices, rollDices } = useDicesList();

  useEffect(() => {
    const diceDetails: DiceType = {
      minValue: Number(process.env.REACT_APP_DICE_MIN_VALUE) || DICE_DEFAULT_MIN_VALUE,
      maxValue: Number(process.env.REACT_APP_DICE_MAX_VALUE) || DICE_DEFAULT_MAX_VALUE,
    };

    const subscriptionNumberOfDices = numberOfDicesSubject.subscribe(dicesCount => {
      initializeDices({ dicesCount, diceDetails });
    });

    return () => {
      subscriptionNumberOfDices.unsubscribe();
    };
  }, []);

  const totalScore = useMemo(() => {
    const score = calculateTotalScore(dices);
    setScore(score);

    return score;
  }, [dices]);

  const play = (): void => {
    rollDices();
    if (setAlreadyPlayed) setAlreadyPlayed(true);
  };

  return (
    <div>
      {dices.map((dice, index) => (
        <>
          <p>Dice {index}</p>
          <Dice key={index} value={dice.value} />
        </>
      ))}
      <button disabled={alreadyPlayed} onClick={play}>
        Roll dices
      </button>

      <div>Total: {totalScore}</div>
    </div>
  );
};

export default Game;
