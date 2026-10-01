import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Footer } from './Footer';

test('shows the wordmark', () => {
  render(<Footer />);

  expect(screen.getByRole('contentinfo')).toHaveTextContent('Silverina');
});
