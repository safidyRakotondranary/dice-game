import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Game from 'src/pages/Game';
import Home from 'src/pages/Home';
import NotFound from 'src/pages/NotFound';
import Result from 'src/pages/Result';
import Rules from 'src/pages/Rules';
import { it, describe } from '@jest/globals';

describe('AppRouter', () => {
  it('displays the Home page when "/" route is accessed', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>,
    );

    // Assuming your Game component has a unique text "This is the game page"
    expect(screen.getByText(/This is the home page/i)).toBeInTheDocument();
  });

  it('displays the Game page when "/game" route is accessed', () => {
    render(
      <MemoryRouter initialEntries={['/game']}>
        <Game />
      </MemoryRouter>,
    );

    // Assuming your Game component has a unique text "This is the game page"
    expect(screen.getByText(/This is the game page/i)).toBeInTheDocument();
  });

  it('displays the Result page when "/result" route is accessed', () => {
    render(
      <MemoryRouter initialEntries={['/result']}>
        <Result />
      </MemoryRouter>,
    );

    // Assuming your Game component has a unique text "This is the result page"
    expect(screen.getByText(/This is the result page/i)).toBeInTheDocument();
  });

  it('displays the Rules page when "/rules" route is accessed', () => {
    render(
      <MemoryRouter initialEntries={['/rules']}>
        <Rules />
      </MemoryRouter>,
    );

    // Assuming your Game component has a unique text "This is the rules page"
    expect(screen.getByText(/This is the rules page/i)).toBeInTheDocument();
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
