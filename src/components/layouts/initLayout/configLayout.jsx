import MainLayout from '../mainLayout';
import MinimalLayout from '../minimalLayout';

export const LAYOUT_CONFIG = [
  {
    pathname: ['/'],
    Layout: MainLayout,
  },
  {
    // Match routes like /tests/[testSlug]/start
    pathname: [/^\/tests\/.+\/start$/],
    Layout: MinimalLayout,
  },
];
