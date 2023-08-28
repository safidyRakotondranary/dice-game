import { Typography } from '@mui/material';

import styles from 'src/pages/NotFound/NotFound.module.scss';

const NotFound = (): JSX.Element => {
  return (
    <div className={styles['notFound-component']}>
      <Typography variant="h1" color="error">
        404 - Page Not Found
      </Typography>
      <Typography variant="h2" color="white">
        Oops! The page you're looking for does not exist.
      </Typography>
    </div>
  );
};

export default NotFound;
