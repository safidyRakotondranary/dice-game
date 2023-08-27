import { render, screen, fireEvent } from '@testing-library/react';
import { BehaviorSubject } from 'rxjs';
import MultiplayerGameConfiguration from '../MultiplayerGameConfiguration';
import { numberOfPlayersSubject } from '../../data/gameConfig';

jest.mock('../../data/gameConfig', () => {
  const originalModule = jest.requireActual('.../../data/gameConfig');
  return {
    ...originalModule,
    numberOfPlayersSubject: new BehaviorSubject(2),
    playerTurnSubject: {
      next: jest.fn(),
    },
  };
});

describe('MultiplayerGameConfiguration', () => {
  it('should update the numberOfPlayersSubject when input value changes', () => {
    // Given
    render(<MultiplayerGameConfiguration onStartGame={() => {}} />);

    // When
    const inputField = screen.getByLabelText('Number of Players:');
    fireEvent.change(inputField, { target: { value: '4' } });

    // Then
    expect(numberOfPlayersSubject.next).toHaveBeenCalledWith(4);
  });
  it('Should be able to define the number of turn of each players', () => {
    // Given
    // When
    // Then
  });
});
