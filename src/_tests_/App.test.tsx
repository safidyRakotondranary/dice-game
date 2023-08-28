import { render } from '@testing-library/react';
import { it, describe } from '@jest/globals';
import App from 'src/App';

describe('App', () => {
  it('renders the App component', () => {
    // Given
    const homeText = /Play game/i

    // When
    const { getByText } = render(<App />);

    // Then
    expect(getByText(homeText)).toBeInTheDocument();
  });
})

