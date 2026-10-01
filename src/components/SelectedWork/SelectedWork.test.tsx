import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { site } from '../../data/site';
import { SelectedWork } from './SelectedWork';

test('a project without a URL is not a link and has no call to action', () => {
  site.projects[0].url = '';
  render(<SelectedWork />);

  expect(screen.getByRole('heading', { name: site.projects[0].name })).toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
  expect(screen.queryByText(/view project/i)).not.toBeInTheDocument();
});

test('a project with a URL is one link with a call to action', () => {
  site.projects[0].url = 'https://example.com/hushfeed';
  render(<SelectedWork />);

  const link = screen.getByRole('link');

  expect(link).toHaveAttribute('href', 'https://example.com/hushfeed');
  expect(link).toContainElement(screen.getByRole('heading', { name: site.projects[0].name }));
  expect(screen.getByText(/view project/i)).toBeInTheDocument();
});

test('shows the project status when it is set', () => {
  site.projects[0].status = 'In development';
  render(<SelectedWork />);

  expect(screen.getByText('In development')).toBeInTheDocument();
});

test('hides the project status when it is empty', () => {
  site.projects[0].status = '';
  render(<SelectedWork />);

  expect(screen.queryByText('In development')).not.toBeInTheDocument();
});
