import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GameConfiguration from 'src/pages/GameConfiguration/GameConfiguration';
import Game from 'src/pages/Dice/Dice';
import Home from 'src/pages/Home/Home';
import NotFound from 'src/pages/NotFound/NotFound';
import Result from 'src/pages/Result/Result';
import { it, describe } from '@jest/globals';

describe('AppRouter', () => {
  it('displays the Home page when "/" route is accessed', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>,
    );

    // Assuming your Game component has a unique text "This is the game page"
    expect(screen.getByText(/play/i)).toBeInTheDocument();
  });

  it('displays the Game page when "/game" route is accessed', () => {
    render(
      <MemoryRouter initialEntries={['/game']}>
        <Game />
      </MemoryRouter>,
    );

    // Assuming your Game component has a unique text "This is the game page"
    expect(screen.getByText(/score/i)).toBeInTheDocument();
  });

  it('displays the Result page when "/result" route is accessed', () => {
    render(
      <MemoryRouter initialEntries={['/result']}>
        <Result />
      </MemoryRouter>,
    );

    // Assuming your Game component has a unique text "This is the result page"
    expect(screen.getByText(/details/i)).toBeInTheDocument();
  });

  it('displays the 404 page when "/unknown-route" route is accessed', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <NotFound />
      </MemoryRouter>,
    );

    // Assuming your Game component has a unique text "404"
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
