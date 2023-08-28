import { render, fireEvent } from '@testing-library/react';
import MultiplayerGameConfiguration from '../MultiplayerGameConfiguration/MultiplayerGameConfiguration';
import { numberOfPlayersSubject, numberOfDicesSubject, numberOfRollsSubject } from '../../data/gameConfig';

describe('MultiplayerGameConfiguration', () => {
  it('Should update the state and subjects on input change', () => {
    const { getByLabelText } = render(<MultiplayerGameConfiguration onStartGame={() => {}} />);

    fireEvent.change(getByLabelText('Number of Players'), { target: { value: '4' } });
    fireEvent.change(getByLabelText('Number of Dices'), { target: { value: '3' } });
    fireEvent.change(getByLabelText('Number of Rolls'), { target: { value: '5' } });

    expect(numberOfPlayersSubject.getValue()).toBe(4);
    expect(numberOfDicesSubject.getValue()).toBe(3);
    expect(numberOfRollsSubject.getValue()).toBe(5);
  });
  it('Should trigger the correct actions when Start Game button is clicked', () => {
    const onStartGameMock = jest.fn();

    const { getByText } = render(<MultiplayerGameConfiguration onStartGame={onStartGameMock} />);

    fireEvent.click(getByText('Start Game'));

    expect(onStartGameMock).toHaveBeenCalled();
  });
});
