import { useNavigate } from 'react-router-dom';
import MultiplayerGameConfiguration from 'src/features/dice/components/MultiplayerGameConfiguration';

const GameConfiguration = (): JSX.Element => {
  const navigate = useNavigate();

  const navigateToGame = (): void => {
    navigate('/game');
  };
  return <MultiplayerGameConfiguration onStartGame={navigateToGame}></MultiplayerGameConfiguration>;
};

export default GameConfiguration;
