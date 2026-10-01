import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { site } from '../../data/site';
import { Header } from './Header';

test('links to GitHub when its URL is set', () => {
  render(<Header />);

  expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', site.links.github);
});

test('does not render the GitHub link while its URL is empty', () => {
  site.links.github = '';
  render(<Header />);

  expect(screen.queryByText(/github/i)).not.toBeInTheDocument();
});

test('the wordmark links to the top of the page', () => {
  render(<Header />);

  expect(screen.getByRole('link', { name: 'Silverina' })).toHaveAttribute('href', '#top');
});
