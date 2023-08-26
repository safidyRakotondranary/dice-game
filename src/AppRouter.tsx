import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'src/pages/Home';
import Game from 'src/pages/Game';
import Result from 'src/pages/Result';
import NotFound from 'src/pages/NotFound';
import Rules from 'src/pages/Rules';

const AppRouter = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
