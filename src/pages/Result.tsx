import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  playersDetailsSubject,
  resetConfiguration,
  resetplayersDetails,
} from 'src/features/dice/data/gameConfig';
import { type PlayerDetailsType } from 'src/features/dice/types/Game';
import { getWinner } from 'src/features/dice/utilities/Game';

const Result = (): JSX.Element => {
  const navigate = useNavigate();

  const [playersDetails, setPlayersDetails] = useState<Record<number, PlayerDetailsType>>({});

  useEffect(() => {
    const subscriptionPlayersDetails = playersDetailsSubject.subscribe(newPlayersDetails => {
      setPlayersDetails(newPlayersDetails);
    });

    return () => {
      subscriptionPlayersDetails.unsubscribe();
    };
  }, []);

  const getWinnerDetails = (): number | null => {
    return getWinner(playersDetails);
  };

  const restartGame = (newConfig: boolean): void => {
    if (newConfig) {
      resetConfiguration();
      resetplayersDetails();
      navigate('/gameConfiguration');
    } else {
      resetplayersDetails();
      navigate('/multiplayerGame');
    }
  };

  return (
    <div>
      <h1>Welcome to the Dice Game!</h1>
      <p>This is the result page of the game. Congratulation!</p>
      <div>Players details: {JSON.stringify(playersDetails)}</div>
      <div>The winner is: {getWinnerDetails()}</div>

      <button
        onClick={() => {
          restartGame(false);
        }}>
        Start a new Game with the same configuration
      </button>
      <button
        onClick={() => {
          restartGame(true);
        }}>
        Start a new Game with a new configuration
      </button>
    </div>
  );
};

export default Result;
