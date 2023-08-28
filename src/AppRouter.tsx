import Home from 'src/pages/Home/Home';
import Result from 'src/pages/Result/Result';
import NotFound from 'src/pages/NotFound/NotFound';
import GameConfiguration from 'src/pages/GameConfiguration/GameConfiguration';
import Dice from 'src/pages/Dice/Dice';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/gameConfiguration',
    element: <GameConfiguration />,
  },
  {
    path: '/game',
    element: <Dice />,
  },
  {
    path: '/result',
    element: <Result />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
