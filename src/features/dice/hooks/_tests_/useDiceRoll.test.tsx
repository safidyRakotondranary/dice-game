import { act, renderHook, waitFor } from "@testing-library/react";
import useDiceRoll from "../useDiceRoll";

describe("useDice", () => {
  const env = process.env

// Mock the .env value
  beforeEach(() => {
      jest.resetModules()
      process.env = {
        ...env,
        REACT_APP_DICE_INITIAL_VALUE: '1',
        REACT_APP_DICE_MIN_VALUE: '1',
        REACT_APP_DICE_MAX_VALUE: '6'
      }
  })

  afterEach(() => {
      process.env = env
  })

  it('Should have an initial dice value of 1', () => {
    const { result } = renderHook(useDiceRoll);

    const [initialValue] = result.current
    expect(initialValue).toBe(1);
  });
  it('Should have the props value (10) as initial value', () => {
    const { result } = renderHook(useDiceRoll, {
      initialProps: 10,
    });

    const [initialValue] = result.current
    expect(initialValue).toBe(10);
  });
  it('Should roll the dice with values between 1 and 6', () => {
    const { result } = renderHook(() => useDiceRoll());

    const [, rollDice] = result.current
    act(() => {
      rollDice();
    });
    const [currentValue] = result.current

    expect(currentValue).toBeGreaterThanOrEqual(1);
    expect(currentValue).toBeLessThanOrEqual(6);
  })
})
