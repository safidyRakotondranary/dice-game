import { type DicePropsType } from 'src/features/dice/types/Dice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fa0,
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import styles from 'src/features/dice/components/Dice/Dice.module.scss';
import { useEffect, useState } from 'react';

const Dice = ({ value }: DicePropsType): JSX.Element => {
  const [isRolling, setIsRolling] = useState<boolean>(false);

  useEffect(() => {
    setIsRolling(true);
    const timer = setTimeout(() => {
      setIsRolling(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  const getIconByValue = (val: number): IconDefinition => {
    switch (val) {
      case 1:
        return faDiceOne;
      case 2:
        return faDiceTwo;
      case 3:
        return faDiceThree;
      case 4:
        return faDiceFour;
      case 5:
        return faDiceFive;
      case 6:
        return faDiceSix;
      default:
        return fa0;
    }
  };

  return (
    <div className={styles['dice-component']}>
      {value && (
        <FontAwesomeIcon
          icon={getIconByValue(value)}
          className={`${styles.dice} ${isRolling ? styles['dice-shaking'] : ''}`}
        />
      )}
    </div>
  );
};

export default Dice;
