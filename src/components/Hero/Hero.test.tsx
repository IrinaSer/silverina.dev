import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { site } from '../../data/site';
import { Hero } from './Hero';

test('keeps the call to action and drops GitHub while its URL is empty', () => {
  site.links.github = '';
  render(<Hero />);

  expect(screen.getByRole('link', { name: /explore work/i })).toHaveAttribute('href', '#work');
  expect(screen.queryByText(/github/i)).not.toBeInTheDocument();
});

test('links to GitHub when its URL is set', () => {
  render(<Hero />);

  expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', site.links.github);
});
