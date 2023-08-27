import { render } from '@testing-library/react';
import Dice from '../Dice';

describe('Dice', () => {
  it('Should render the roll value (2)', () => {
    // Given
    const { getByText } = render(<Dice value={2} />);

    // Then
    expect(getByText(`Current value: 2`)).toBeInTheDocument();
  });
});
