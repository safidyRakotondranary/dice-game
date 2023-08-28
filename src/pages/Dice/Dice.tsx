import { useNavigate } from 'react-router-dom';
import MultiplayerGame from 'src/features/dice/components/MultiplayerGame/MultiplayerGame';

const Dice = (): JSX.Element => {
  const navigate = useNavigate();

  const navigateToResult = (): void => {
    navigate('/result');
  };

  return <MultiplayerGame onGameOver={navigateToResult}></MultiplayerGame>;
};

export default Dice;
