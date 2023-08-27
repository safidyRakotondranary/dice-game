import { RouterProvider } from 'react-router-dom';
import router from './AppRouter';

import { ThemeProvider } from '@emotion/react';
import theme from './theme';

import styles from 'src/App.module.scss';

const App = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
};

export default App;
