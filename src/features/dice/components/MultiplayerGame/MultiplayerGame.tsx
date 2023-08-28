import { Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { NUMBER_OF_PLAYER } from '../../data/constants';
import {
  numberOfPlayersSubject,
  numberOfRollsSubject,
  playersDetailsSubject,
  playerTurnSubject,
} from '../../data/gameConfig';
import { type PlayerDetailsType, type MultiplayerGamePropsType } from '../../types/Game';
import Game from '../Game/Game';

import styles from 'src/features/dice/components/MultiplayerGame/MultiplayerGame.module.scss';

const MultiplayerGame = ({ onGameOver }: MultiplayerGamePropsType): JSX.Element => {
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(
    Number(process.env.REACT_APP_GAME_NUMBER_OF_PLAYER ?? NUMBER_OF_PLAYER),
  );

  const [isNewGame, setIsNewGame] = useState<boolean>(true);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [playersDetails, setPlayersDetails] = useState<Record<number, PlayerDetailsType>>({});

  useEffect(() => {
    const subscriptionNumberOfPlayer = numberOfPlayersSubject.subscribe(newNumberOfPlayers => {
      setNumberOfPlayers(newNumberOfPlayers);
    });
    const subscriptionPlayerTurn = playerTurnSubject.subscribe(newPlayerTurn => {
      setCurrentPlayer(newPlayerTurn);
    });
    const subscriptionPlayersDetails = playersDetailsSubject.subscribe(newPlayerDetails => {
      setPlayersDetails(newPlayerDetails);
    });

    return () => {
      subscriptionNumberOfPlayer.unsubscribe();
      subscriptionPlayerTurn.unsubscribe();
      subscriptionPlayersDetails.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const initialLeftGame = Number(numberOfRollsSubject.value ?? 0);

    const initialPlayerDetails = Array.from({ length: numberOfPlayers }, (_, index) => ({
      score: 0,
      leftGame: initialLeftGame,
    }));

    console.log(initialPlayerDetails);
    playersDetailsSubject.next(initialPlayerDetails);
  }, [numberOfPlayers]);

  useEffect(() => {
    setIsNewGame(true);
  }, [currentPlayer]);

  const handleEndTurn = (): void => {
    const nextPlayerTurn = (currentPlayer + 1) % numberOfPlayers;
    playerTurnSubject.next(nextPlayerTurn);

    // Go to result page when the game is over
    if (isGameOver()) onGameOver();
  };

  const handleRollDices = (score: number): void => {
    setIsNewGame(false);

    const subjectDetails = { ...playersDetails };
    if (subjectDetails[currentPlayer]) {
      subjectDetails[currentPlayer] = {
        score: score + Number(subjectDetails[currentPlayer]?.score ?? 0),
        leftGame:
          subjectDetails[currentPlayer]?.leftGame > 0
            ? subjectDetails[currentPlayer]?.leftGame - 1
            : 0,
      };
    }
    console.log(score, subjectDetails);
    playersDetailsSubject.next(subjectDetails);
  };

  const isGameOver = (): boolean => {
    return Array.from(Array(numberOfPlayers).keys()).reduce(
      (_, playerIndex) => playersDetails[playerIndex]?.leftGame <= 0,
      false,
    );
  };

  return (
    <div className={styles['multiplayerGame-component']}>
      <Typography variant="h1">{numberOfPlayers} Players Dice game</Typography>
      <Typography sx={{ mt: 8 }} variant="h2">
        Player {currentPlayer + 1} turn
      </Typography>
      <Typography variant="h2">Score: {playersDetails[currentPlayer]?.score ?? 0}</Typography>
      <Typography variant="h2">Roll left: {playersDetails[currentPlayer]?.leftGame}</Typography>
      <div className={styles['game-box']}>
        <Game onRollDices={handleRollDices} isNewGame={isNewGame} />

        {!isNewGame && (
          <Button className={styles['end-turn']} variant="contained" onClick={handleEndTurn}>
            End Turn
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiplayerGame;
