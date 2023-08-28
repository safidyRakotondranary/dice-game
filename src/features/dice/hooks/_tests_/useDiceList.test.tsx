import { act, renderHook } from '@testing-library/react';
import { type DiceType } from '../../types/Dice';
import useDicesList from '../useDicesList';
import { rollDice } from '../../utilities/Game';

// Mock the dices list
const mockRollDice = rollDice as jest.MockedFunction<typeof rollDice>;
jest.mock('../../utilities/Game');

describe('useDiceList', () => {
  it('Should return empty dice list', () => {
    // Given
    const { result } = renderHook(() => useDicesList());

    // When

    // Then
    expect(result.current.dices).toEqual([]);
  });

  it('Should return expected result after initializeDices is called', () => {
    // Given
    const { result } = renderHook(() => useDicesList());
    const expectedResult: DiceType[] = [
      { minValue: 1, maxValue: 6 },
      { minValue: 1, maxValue: 6 },
    ];

    // When
    act(() => {
      result.current.initializeDices({ dicesCount: 2, diceDetails: { minValue: 1, maxValue: 6 } });
    });

    // Then
    expect(result.current.dices).toStrictEqual(expectedResult);
  });

  it('Should be able to roll dices', () => {
    // Given
    const { result } = renderHook(() => useDicesList());
    const expectedResult: DiceType[] = [
      { value: 2, minValue: 1, maxValue: 6 },
      { value: 3, minValue: 1, maxValue: 6 },
    ];
    mockRollDice.mockReturnValueOnce(2).mockReturnValueOnce(3);

    // When
    act(() => {
      result.current.initializeDices({ dicesCount: 2, diceDetails: { minValue: 1, maxValue: 6 } });
      result.current.rollDices();
    });

    // Then
    expect(result.current.dices).toStrictEqual(expectedResult);
  });
});
