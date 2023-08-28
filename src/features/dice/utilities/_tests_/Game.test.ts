import { fa0, faDiceThree } from "@fortawesome/free-solid-svg-icons";
import { DiceType } from "../../types/Dice";
import { PlayerDetailsType } from "../../types/Game";
import { calculateTotalScore, getIconByValue, getWinner, rollDice } from "../Game";

describe('Game utilities', () => {
  describe('rollDice', () => {
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
  })

  describe('calculateTotalScore', () => {
    it('Should calculate the total score', () => {
      // Given
      const dices: DiceType[] = [ { value: 1, minValue: 1, maxValue: 6 }, { value: 4, minValue: 1, maxValue: 6 } ]
  
      // When
      const result = calculateTotalScore(dices)
  
      // Then
      expect(result).toBe(5);
    })
    it('should handle empty dices array', () => {
      // Given
      const dices: DiceType[] = [];

      // When
      const result = calculateTotalScore(dices);

      // Then
      expect(result).toBe(0);
    });
  })

  describe('getWinner', () => {
    it('should return the correct winner', () => {
      // Given
      const playerDetails: Record<number, PlayerDetailsType> = {
        0: { score: 12, leftGame: 0 },
        1: { score: 15, leftGame: 0 },
        2: { score: 10, leftGame: 0 },
      };

      // When
      const result = getWinner(playerDetails);

      // Then
      expect(result).toBe(1);
    });

    it('should return null if no winner (Multiple players have the same max score)', () => {
      // Given
      const playerDetails: Record<number, PlayerDetailsType> = {
        0: { score: 8, leftGame: 0 },
        1: { score: 8, leftGame: 0 },
        2: { score: 8, leftGame: 0 },
      };

      // When
      const result = getWinner(playerDetails);

      // Then
      expect(result).toBeNull();
    });
  });

  describe('getIconByValue', () => {
    it('should return the correct icon for the given value', () => {
      // Give
      const diceValue = 3
      const expectedIcon = faDiceThree

      // Then
      const result = getIconByValue(diceValue);
      expect(result).toBe(expectedIcon);
    });

    it('should return the default icon for an invalid value', () => {
      // Give
      const diceValue = 7
      const expectedIcon = fa0

      // Then
      const result = getIconByValue(diceValue);
      expect(result).toBe(expectedIcon);
    });
  });
})
