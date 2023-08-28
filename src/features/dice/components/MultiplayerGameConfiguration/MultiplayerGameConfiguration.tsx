import { type ChangeEvent, useState } from 'react';
import {
  numberOfDicesSubject,
  numberOfPlayersSubject,
  numberOfRollsSubject,
  playerTurnSubject,
} from '../../data/gameConfig';
import { type MultiplayerGameConfigurationPropsType } from '../../types/Game';

import styles from 'src/features/dice/components/MultiplayerGameConfiguration/MultiplayerGameConfiguration.module.scss';
import { FormControl, TextField, Button, FormLabel, Typography } from '@mui/material';

const MultiplayerGameConfiguration = ({
  onStartGame,
}: MultiplayerGameConfigurationPropsType): JSX.Element => {
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(
    Number(process.env.REACT_APP_GAME_NUMBER_OF_PLAYER),
  );
  const [numberOfDices, setNumberOfDices] = useState<number>(
    Number(process.env.REACT_APP_GAME_NUMBER_OF_DICES),
  );
  const [numberOfRolls, setNumberOfRolls] = useState<number>(
    Number(process.env.REACT_APP_GAME_NUMBER_OF_ROLLS_PER_PLAYER),
  );

  const handleNumberOfPlayersChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newNumberOfPlayers = Number(event.target.value);
    setNumberOfPlayers(newNumberOfPlayers);
    numberOfPlayersSubject.next(newNumberOfPlayers);
  };
  const handleNumberOfDicesChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newNumberOfDices = Number(event.target.value);
    setNumberOfDices(newNumberOfDices);
    numberOfDicesSubject.next(newNumberOfDices);
  };
  const handleNumberOfRollsChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newNumberOfRolls = Number(event.target.value);
    setNumberOfRolls(newNumberOfRolls);
    numberOfRollsSubject.next(newNumberOfRolls);
  };

  const handleStartGame = (): void => {
    numberOfPlayersSubject.next(numberOfPlayers);
    playerTurnSubject.next(0);
    onStartGame();
  };

  return (
    <div className={styles['MultiplayerGameConfiguration-component']}>
      <Typography variant="h1">Game configuration</Typography>
      <Typography textAlign="center" variant="h2">
        Please configure your game fo a better experience
      </Typography>
      <FormControl sx={{ mt: 8 }}>
        <FormLabel htmlFor="numberOfPlayers">Number of Players</FormLabel>
        <TextField
          id="numberOfPlayers"
          variant="filled"
          type="number"
          value={numberOfPlayers}
          onChange={handleNumberOfPlayersChange}
        />
        <FormLabel htmlFor="numberOfDices">Number of Dices</FormLabel>
        <TextField
          id="numberOfDices"
          variant="filled"
          type="number"
          value={numberOfDices}
          onChange={handleNumberOfDicesChange}
        />
        <FormLabel htmlFor="numberOfRolls">Number of Rolls</FormLabel>
        <TextField
          id="numberOfRolls"
          variant="filled"
          type="number"
          value={numberOfRolls}
          onChange={handleNumberOfRollsChange}
        />
        <Button sx={{ mt: 8 }} variant="contained" onClick={handleStartGame}>
          Start Game
        </Button>
      </FormControl>
    </div>
  );
};

export default MultiplayerGameConfiguration;
