import Home from 'src/pages/Home';
import Result from 'src/pages/Result';
import NotFound from 'src/pages/NotFound';
import Rules from 'src/pages/Rules';
import GameConfiguration from 'src/pages/GameConfiguration';
import Dice from 'src/pages/Dice';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/rules',
    element: <Rules />,
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
