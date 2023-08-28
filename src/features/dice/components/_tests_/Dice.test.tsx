import { render } from '@testing-library/react';
import Dice from '../Dice/Dice';

// Mocking FontAwesomeIcon since it doesn't render well in tests
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) => <div data-testid="mocked-icon">{icon.iconName}</div>,
}));

describe('Dice component', () => {
  it('should render the correct dice icon', () => {
    // Given
    const diceValue = 4
    const diceIconName = 'dice-four'

    // When
    const { getByTestId } = render(<Dice value={diceValue} />);
    const diceIcon = getByTestId('mocked-icon');

    // Then
    expect(diceIcon.textContent).toBe(diceIconName);
  });

  it('should not render anything when value is not a number > 0', () => {
    // Given
    const diceValue = 0

    // When
    const { queryByTestId } = render(<Dice value={diceValue} />);
    const diceIcon = queryByTestId('mocked-icon')
  
    // Then
    expect(diceIcon).toBeNull();
  });
});
