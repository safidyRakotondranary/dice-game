import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from 'src/pages/Home/Home.module.scss';

const Home = (): JSX.Element => {
  return (
    <div className={styles['home-component']}>
      <Typography variant="h1">Welcome to the Dice Game!</Typography>
      <Typography variant="h2">Get ready to roll the dice!</Typography>
      <Box sx={{ mt: 8 }}>
        <Link to="/gameConfiguration">
          <Button variant="contained">Play game</Button>
        </Link>
      </Box>
    </div>
  );
};

export default Home;
