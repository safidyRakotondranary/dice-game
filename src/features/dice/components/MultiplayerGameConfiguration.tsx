import { type ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  numberOfDicesSubject,
  numberOfPlayersSubject,
  playerTurnSubject,
} from '../data/gameConfig';
import { type MultiplayerGameConfigurationPropsType } from '../types/Game';

const MultiplayerGameConfiguration = (
  props: MultiplayerGameConfigurationPropsType,
): JSX.Element => {
  const navigate = useNavigate();

  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(
    Number(process.env.REACT_APP_GAME_NUMBER_OF_PLAYER),
  );
  const [numberOfDices, setNumberOfDices] = useState<number>(
    Number(process.env.REACT_APP_GAME_NUMBER_OF_DICES),
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

  const handleStartGame = (): void => {
    numberOfPlayersSubject.next(numberOfPlayers);
    playerTurnSubject.next(0);
    navigate('/multiplayerGame');
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
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default MultiplayerGameConfiguration;
