import { useEffect } from 'react';
import { DICE_DEFAULT_MAX_VALUE, DICE_DEFAULT_MIN_VALUE } from '../../data/constants';
import useDicesList from '../../hooks/useDicesList';
import { type DiceType } from '../../types/Dice';
import Dice from 'src/features/dice/components/Dice/Dice';
import { calculateTotalScore } from '../../utilities/Game';
import { type GamePropsType } from '../../types/Game';
import { numberOfDicesSubject } from '../../data/gameConfig';
import { Typography, Button } from '@mui/material';

import styles from 'src/features/dice/components/Game/Game.module.scss';
import * as React from 'react';

const Game = ({ isNewGame, onRollDices }: GamePropsType): JSX.Element => {
  const [shouldEmitEvent, setShouldEmitEvent] = React.useState<boolean>(false);
  const [totalScore, setTotalScore] = React.useState<number>();
  const { dices, initializeDices, rollDices } = useDicesList();

  useEffect(() => {
    if (isNewGame) {
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
    }
  }, [isNewGame]);

  useEffect(() => {
    if (shouldEmitEvent) {
      const score = calculateTotalScore(dices);

      setTotalScore(score);
      if (onRollDices) onRollDices(score);

      setShouldEmitEvent(false);
    }
  }, [dices]);

  const play = (): void => {
    setShouldEmitEvent(true);
    rollDices();
  };

  return (
    <div className={styles['game-component']}>
      <div className={styles.dices}>
        {dices.map((dice, index) => (
          <Dice key={index} value={dice.value} />
        ))}
      </div>

      {!isNewGame && <Typography variant="h2">{totalScore}</Typography>}
      {isNewGame && (
        <Button className={styles['roll-dices']} variant="contained" onClick={play}>
          Roll dices
        </Button>
      )}
    </div>
  );
};

export default Game;
