import { act, fireEvent, render, waitFor } from '@testing-library/react';
import useDiceRoll from '../../hooks/useDiceRoll';
import Dice from '../Dice';

const mockUseDiceRoll = useDiceRoll as jest.MockedFunction<typeof useDiceRoll>
jest.mock('../../hooks/useDiceRoll')

describe('Dice', () => {
  const env = process.env

  // Mock the .env value
  beforeEach(() => {
      jest.resetModules()
      process.env = {
        ...env,
        REACT_APP_DICE_MIN_VALUE: '1',
        REACT_APP_DICE_MAX_VALUE: '6'
      }
  })

  afterEach(() => {
      process.env = env
  })

  it('Should render the roll value (2)', () => {
    mockUseDiceRoll.mockReturnValue([2, jest.fn()])
    const { getByText } = render(<Dice />);
    expect(getByText(`Current value: 2`)).toBeInTheDocument();
  })

  it('Should initialize the userRollDice with min and max values', () => {
    mockUseDiceRoll.mockImplementation((minValue, maxValue) => ([1, jest.fn()]))
    render(<Dice />);

    expect(mockUseDiceRoll).toHaveBeenCalledWith(1, 6)
  })

  it('Should call the rollDice  when rolled', async () => {
    const mockRollDice = jest.fn()
    mockUseDiceRoll.mockImplementation(() => ([1, mockRollDice]))

    const { getByText } = render(<Dice />);
    const rollButton = getByText('Roll the Dice');
    fireEvent.click(rollButton);

    expect(mockRollDice).toBeCalledTimes(1);
  })
})
