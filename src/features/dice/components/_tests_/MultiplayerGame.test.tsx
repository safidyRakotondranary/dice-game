import * as React from 'react';
import { render } from '@testing-library/react';
import MultiplayerGame from '../MultiplayerGame/MultiplayerGame';

describe('MultiplayerGame Component', () => {
  it('Should display player details', () => {
    // Given
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [2, jest.fn()]) // Mock numberOfPlayers state
      .mockImplementationOnce(() => [false, jest.fn()]) // Mock isNewGame state
      .mockImplementationOnce(() => [0, jest.fn()]) // Mock currentPlayer state
      .mockImplementationOnce(() => [ // Mock playersDetails state
        {
          0: {
            score: 10,
            leftGame: 2
          },
          1: {
            score: 15,
            leftGame: 0,
          },
        },
        jest.fn()
      ]) // Mock playersDetails state

    // When
    const { getByText } = render(<MultiplayerGame onGameOver={jest.fn()} />);

    // Then
    expect(getByText('Player 1 turn')).toBeInTheDocument();
    expect(getByText('Score: 10')).toBeInTheDocument();
    expect(getByText('Roll left: 2')).toBeInTheDocument();
  });
});
