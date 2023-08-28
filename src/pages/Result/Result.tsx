import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  playersDetailsSubject,
  resetConfiguration,
  resetplayersDetails,
} from 'src/features/dice/data/gameConfig';
import { type PlayerDetailsType } from 'src/features/dice/types/Game';
import { getWinner } from 'src/features/dice/utilities/Game';
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import styles from 'src/pages/Result/Result.module.scss';

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

  const getWinnerDetails = (): number => {
    return getWinner(playersDetails) ?? 0;
  };

  const restartGame = (newConfig: boolean): void => {
    if (newConfig) {
      resetConfiguration();
      resetplayersDetails();
      navigate('/gameConfiguration');
    } else {
      resetplayersDetails();
      navigate('/game');
    }
  };

  return (
    <div className={styles['result-component']}>
      <Typography variant="h1">Dice Game</Typography>
      <Typography variant="h2">Congratulations :) Player {getWinnerDetails() + 1} wins</Typography>

      <Typography sx={{ mt: 4 }} variant="h3">
        Game details:
      </Typography>
      <List
        sx={{ width: '100%', maxWidth: 360, borderRadius: 5, bgcolor: 'background.paper' }}
        aria-label="contacts">
        {Object.entries(playersDetails).map(([playerIndex, playerDetails]) => (
          <ListItem key={playerIndex} disablePadding>
            <ListItemButton>
              {getWinnerDetails() === Number(playerIndex) && (
                <ListItemIcon>
                  <StarIcon color="primary" />
                </ListItemIcon>
              )}
              <ListItemText
                primaryTypographyProps={{
                  color: '#08f',
                  fontSize: 20,
                  fontWeight: '800',
                  letterSpacing: 0,
                }}
                inset={getWinnerDetails() !== Number(playerIndex)}>
                <Box sx={{ textShadow: 'none' }}>Player {Number(playerIndex) + 1}</Box>
              </ListItemText>
              <ListItemText
                primaryTypographyProps={{
                  color: '#08f',
                  fontSize: 20,
                  fontWeight: '800',
                  letterSpacing: 0,
                }}>
                <Box sx={{ textShadow: 'none' }}>Score {playerDetails.score}</Box>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Button
        sx={{ mt: 8 }}
        variant="contained"
        onClick={() => {
          restartGame(false);
        }}>
        Start a new Game with the same configuration
      </Button>
      <Button
        sx={{ mt: 4 }}
        variant="contained"
        onClick={() => {
          restartGame(true);
        }}>
        Start a new Game with a new configuration
      </Button>
    </div>
  );
};

export default Result;
