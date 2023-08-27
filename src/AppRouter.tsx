import Home from 'src/pages/Home';
import Result from 'src/pages/Result';
import NotFound from 'src/pages/NotFound';
import Rules from 'src/pages/Rules';
import MultiplayerGameConfiguration from './features/dice/components/MultiplayerGameConfiguration';

import { createBrowserRouter } from 'react-router-dom';
import MultiplayerGame from './features/dice/components/MultiplayerGame';

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
    element: <MultiplayerGameConfiguration />,
  },
  {
    path: '/multiplayerGame',
    element: <MultiplayerGame />,
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
