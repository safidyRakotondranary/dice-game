import { act, fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import Game from 'src/features/dice/components/Game/Game';
import useDicesList from '../../hooks/useDicesList';

const mockUseDicesList = useDicesList as jest.MockedFunction<typeof useDicesList>;
jest.mock('../../hooks/useDicesList');

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) => <div data-testid="mocked-icon">{icon.iconName}</div>,
}));

describe('Game', () => {
  const env = process.env;

  // Mock the .env value
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...env,
      REACT_APP_GAME_NUMBER_OF_DICES: '2',
      REACT_APP_DICE_MIN_VALUE: '1',
      REACT_APP_DICE_MAX_VALUE: '6',
    };
  });

  afterEach(() => {
    process.env = env;
  });
  it('Should display the list of the dices based on REACT_APP_GAME_NUMBER_OF_DICES', () => {
    // Given
    mockUseDicesList.mockImplementation(() => ({
      dices: [
        { minValue: 1, maxValue: 6 },
        { minValue: 1, maxValue: 6 },
      ],
      initializeDices: jest.fn(),
      rollDices: jest.fn(),
    }));
    const { container } = render(<Game />);
    const dicesComponents = container.querySelectorAll('.dice-component');

    // Then
    expect(dicesComponents.length).toEqual(2);
  });
  it('Should renders the dices when isNewGame is true', () => {
    mockUseDicesList.mockReturnValue({
      dices: [
        { value: 1, minValue: 1, maxValue: 6 },
        { value: 2, minValue: 1, maxValue: 6 },
        { value: 3, minValue: 1, maxValue: 6 },
      ],
      initializeDices: jest.fn(),
      rollDices: jest.fn(),
    });

    const { getAllByTestId } = render(<Game isNewGame={true} />);
    const diceIcons = getAllByTestId('mocked-icon');
    const firstDiceIcon = diceIcons[0];
    const secondDiceIcon = diceIcons[1];
    const thirdDiceIcon = diceIcons[2];
    
    expect(firstDiceIcon).toBeInTheDocument();
    expect(secondDiceIcon).toBeInTheDocument();
    expect(thirdDiceIcon).toBeInTheDocument();
  });
  it('Should be able to roll dices', () => {
    // Given
    const mockRollDice = jest.fn();
    mockUseDicesList.mockImplementation(() => ({
      dices: [
        { minValue: 1, maxValue: 6 },
        { minValue: 1, maxValue: 6 },
      ],
      initializeDices: jest.fn(),
      rollDices: mockRollDice,
    }));

    // When
    const { getByText } = render(<Game isNewGame={true} />);
    const rollButton = getByText('Roll dices');
    act(() => {
      fireEvent.click(rollButton);
    });

    // Then
    expect(mockRollDice).toBeCalledTimes(1);
  });
  it('Should be able to see the sum of the value of the dices', () => {
    // Given
    mockUseDicesList.mockImplementation(() => ({
      dices: [
        { value: 6, minValue: 1, maxValue: 6 },
        { value: 4, minValue: 1, maxValue: 6 },
      ],
      initializeDices: jest.fn(),
      rollDices: jest.fn(),
    }));
    // Mock the shouldEmitEvent state value
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [true, jest.fn()]) // Mock shouldEmitEvent state
      .mockImplementationOnce(() => [10, jest.fn()]); // Mock the total state

    // jest.spyOn(React, 'useEffect')
    //   .mockImplementation((f) => f())

    // When
    const { getByText } = render(<Game isNewGame={false} />);

    // Then
    expect(getByText(/10/)).toBeInTheDocument();

    // Restore all mock
    jest.restoreAllMocks();
  });
});
