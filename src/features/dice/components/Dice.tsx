import { type DicePropsType } from '../types/Dice';

const Dice = ({ value }: DicePropsType): JSX.Element => {
  return (
    <div data-test="dice-component">
      <p>Value: {value}</p>
    </div>
  );
};

export default Dice;
