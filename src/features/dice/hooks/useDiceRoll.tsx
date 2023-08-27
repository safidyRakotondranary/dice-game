import { useState } from "react";

const useDiceRoll = (minValue: number, maxValue: number): [number, () => void] => {
  const [value, setValue] = useState<number>(minValue)

  const rollDice = () => {
    const newValue = Math.floor(Math.random() * maxValue) + minValue;
    setValue(newValue);
  }

  return [value, rollDice]
}

export default useDiceRoll;
