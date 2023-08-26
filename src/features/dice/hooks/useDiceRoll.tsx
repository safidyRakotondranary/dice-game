import { useState } from "react";
import { DICE_DEFAULT_MIN_VALUE, DICE_DEFAULT_MAX_VALUE } from "../data/constants";

const useDiceRoll = (initialValue?: number): [number, () => void] => {
  const diceMinValue = Number(process.env.REACT_APP_DICE_MIN_VALUE || DICE_DEFAULT_MIN_VALUE)
  const diceMaxValue = Number(process.env.REACT_APP_DICE_MAX_VALUE || DICE_DEFAULT_MAX_VALUE)

  const [value, setValue] = useState<number>(initialValue || Number(process.env.REACT_APP_DICE_INITIAL_VALUE) || Number(diceMinValue))

  const rollDice = () => {
    const newValue = Math.floor(Math.random() * diceMaxValue) + diceMinValue; // Generate a random value between 1 and 6
    setValue(newValue);
  }

  return [value, rollDice]
}

export default useDiceRoll;
