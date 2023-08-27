import { DiceType } from "../../types/Dice";
import { calculateTotalScore, rollDice } from "../Game";

describe('Game', () => {
  it('Should roll the dice with value between 1 and 6', () => {
    // Given
    const minValue = 1;
    const maxValue = 6;

    // When
    const result = rollDice(minValue, maxValue)

    // Then
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  })

  it('Should roll the dice with value between 1 and 6', () => {
    // Given
    const dices: DiceType[] = [ { value: 1, minValue: 1, maxValue: 6 }, { value: 4, minValue: 1, maxValue: 6 } ]

    // When
    const result = calculateTotalScore(dices)

    // Then
    expect(result).toBe(5);
  })
})
