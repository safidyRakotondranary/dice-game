import { act, renderHook, waitFor } from "@testing-library/react";
import useDiceRoll from "../useDiceRoll";

describe("useDiceRoll", () => {
  it('Should have an initial dice value of 1', () => {
    const { result } = renderHook(() => useDiceRoll(1, 6));

    const [initialValue] = result.current
    expect(initialValue).toBe(1);
  });

  it('Should roll the dice with value between 1 and 6', () => {
    const { result } = renderHook(() => useDiceRoll(1, 6));

    const [, rollDice] = result.current
    act(() => {
      rollDice();
    });
    const [currentValue] = result.current

    expect(currentValue).toBeGreaterThanOrEqual(1);
    expect(currentValue).toBeLessThanOrEqual(6);
  })
})
