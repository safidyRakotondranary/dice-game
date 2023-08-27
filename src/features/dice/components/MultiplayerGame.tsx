import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NUMBER_OF_PLAYER } from '../data/constants';
import {
  numberOfPlayersSubject,
  playersDetailsSubject,
  playerTurnSubject,
} from '../data/gameConfig';

import Game from './Game';

const MultiplayerGame = (): JSX.Element => {
  const navigate = useNavigate();

  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(
    Number(process.env.REACT_APP_GAME_NUMBER_OF_PLAYER ?? NUMBER_OF_PLAYER),
  );

  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [score, setScore] = useState<Record<string, number>>({});
  const [hasAlreadyPlayed, setHasAlreadyPlayed] = useState<boolean>(false);

  useEffect(() => {
    const subscriptionNumberOfPlayer = numberOfPlayersSubject.subscribe(newNumberOfPlayers => {
      setNumberOfPlayers(newNumberOfPlayers);
    });
    const subscriptionPlayerTurn = playerTurnSubject.subscribe(newPlayerTurn => {
      setCurrentPlayer(newPlayerTurn);
    });

    return () => {
      subscriptionNumberOfPlayer.unsubscribe();
      subscriptionPlayerTurn.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const initialLeftGame = Number(process.env.REACT_APP_GAME_NUMBER_OF_ROLLS_PER_PLAYER ?? 0);

    const initialPlayerDetails = Array.from({ length: numberOfPlayers }, (_, index) => ({
      score: 0,
      leftGame: initialLeftGame,
    }));

    playersDetailsSubject.next(initialPlayerDetails);
  }, [numberOfPlayers]);

  const handleEndTurn = (): void => {
    const nextPlayerTurn = (currentPlayer + 1) % numberOfPlayers;
    playerTurnSubject.next(nextPlayerTurn);

    const subjectDetails = { ...playersDetailsSubject.value };
    subjectDetails[currentPlayer] = {
      score: Number(score[currentPlayer]) + Number(subjectDetails[currentPlayer]?.score ?? 0),
      leftGame:
        subjectDetails[currentPlayer]?.leftGame > 0
          ? subjectDetails[currentPlayer].leftGame - 1
          : 0,
    };

    playersDetailsSubject.next(subjectDetails);

    // Next player play
    setHasAlreadyPlayed(false);

    // Go to result page when the game is over
    if (isGameOver()) navigate('/result');
  };

  const play = (score: number): void => {
    setScore(oldScore => {
      const newScore = {
        ...oldScore,
        [currentPlayer]: score,
      };

      return newScore;
    });
  };

  const isGameOver = (): boolean => {
    return Array.from(Array(numberOfPlayers).keys()).reduce(
      (_, playerIndex) => playersDetailsSubject.value[playerIndex]?.leftGame <= 0,
      false,
    );
  };

  return (
    <div>
      <p>Number of players: {numberOfPlayers}</p>
      <p>Current Player: {currentPlayer}</p>
      <p>Details: {JSON.stringify(playersDetailsSubject.value)}</p>
      <Game
        alreadyPlayed={hasAlreadyPlayed}
        setAlreadyPlayed={setHasAlreadyPlayed}
        setScore={play}
      />

      <button onClick={handleEndTurn}>End Turn</button>
    </div>
  );
};

export default MultiplayerGame;
