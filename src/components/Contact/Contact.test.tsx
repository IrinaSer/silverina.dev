import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { site } from '../../data/site';
import { Contact } from './Contact';

test('links the email address with mailto', () => {
  render(<Contact />);

  expect(screen.getByRole('link', { name: site.email })).toHaveAttribute(
    'href',
    `mailto:${site.email}`,
  );
});

test('does not render the CV link while its URL is empty', () => {
  site.links.cv = '';
  render(<Contact />);

  expect(screen.queryByText(/CV/)).not.toBeInTheDocument();
});

test('renders the CV link once a URL is set', () => {
  site.links.cv = 'https://example.com/cv.pdf';
  render(<Contact />);

  expect(screen.getByRole('link', { name: /cv/i })).toHaveAttribute(
    'href',
    'https://example.com/cv.pdf',
  );
});

test('renders no link list when every URL is empty', () => {
  site.links = { github: '', linkedin: '', cv: '' };
  render(<Contact />);

  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});
