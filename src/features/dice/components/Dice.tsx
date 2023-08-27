import { DICE_DEFAULT_MIN_VALUE, DICE_DEFAULT_MAX_VALUE } from "../data/constants";
import useDiceRoll from "../hooks/useDiceRoll";

const Dice = () => {
  const diceMinValue = Number(process.env.REACT_APP_DICE_MIN_VALUE || DICE_DEFAULT_MIN_VALUE)
  const diceMaxValue = Number(process.env.REACT_APP_DICE_MAX_VALUE || DICE_DEFAULT_MAX_VALUE)

  const [value, rollDice] = useDiceRoll(diceMinValue, diceMaxValue)

  return (
    <div>
      <p>Current value: {value}</p>
      <button onClick={rollDice}>Roll the Dice</button>
    </div>
  )
}


export default Dice;
