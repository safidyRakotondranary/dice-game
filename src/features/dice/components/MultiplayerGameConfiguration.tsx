import { type ChangeEvent, useState } from 'react';
import {
  numberOfDicesSubject,
  numberOfPlayersSubject,
  numberOfRollsSubject,
  playerTurnSubject,
} from '../data/gameConfig';
import { type MultiplayerGameConfigurationPropsType } from '../types/Game';

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
    <div>
      <label>
        Number of Players:
        <input type="number" value={numberOfPlayers} onChange={handleNumberOfPlayersChange} />
      </label>
      <label>
        Number of Dices:
        <input type="number" value={numberOfDices} onChange={handleNumberOfDicesChange} />
      </label>
      <label>
        Number of Rolls:
        <input type="number" value={numberOfRolls} onChange={handleNumberOfRollsChange} />
      </label>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default MultiplayerGameConfiguration;
