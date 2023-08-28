import { type DicePropsType } from 'src/features/dice/types/Dice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'src/features/dice/components/Dice/Dice.module.scss';
import { useEffect, useState } from 'react';
import { getIconByValue } from '../../utilities/Game';

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
