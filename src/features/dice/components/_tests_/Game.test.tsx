import { act, fireEvent, render } from '@testing-library/react';
import Game from 'src/features/dice/components/Game';
import useDicesList from '../../hooks/useDicesList';

const mockUseDicesList = useDicesList as jest.MockedFunction<typeof useDicesList>;
jest.mock('../../hooks/useDicesList');

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
    const { container } = render(<Game setScore={() => {}} />);
    const dicesComponents = container.querySelectorAll('[data-test="dice-component"]');

    // Then
    expect(dicesComponents.length).toEqual(2);
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
    const { getByText } = render(<Game setScore={() => {}} />);
    const rollButton = getByText('Roll dices');
    act(() => {
      fireEvent.click(rollButton);
    });

    // Then
    expect(mockRollDice).toBeCalledTimes(1);
  });
  it('Should be able to see the sum of the dices values', () => {
    // Given
    const mockRollDice = jest.fn();
    mockUseDicesList.mockImplementation(() => ({
      dices: [
        { value: 2, minValue: 1, maxValue: 6 },
        { value: 4, minValue: 1, maxValue: 6 },
      ],
      initializeDices: jest.fn(),
      rollDices: mockRollDice,
    }));

    // When
    const { getByText } = render(<Game setScore={() => {}} />);

    // Then
    expect(getByText(`Total: 6`)).toBeInTheDocument();
  });
});
