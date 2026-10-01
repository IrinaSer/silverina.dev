import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { site } from '../data/site';

// Every test file gets its own mutable copy of the site data, so a test can
// change one value (for example an empty URL) and see how the UI reacts.
vi.mock(import('../data/site'), async (importOriginal) => {
  const original = await importOriginal();
  return { site: structuredClone(original.site) };
});

const initial = structuredClone(site);

afterEach(() => {
  cleanup();
  Object.assign(site, structuredClone(initial));
});
