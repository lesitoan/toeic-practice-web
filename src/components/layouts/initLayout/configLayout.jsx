import AuthLayout from '../authLayout';
import MainLayout from '../mainLayout';

export const LAYOUT_CONFIG = [
  {
    pathname: ['/'],
    Layout: MainLayout,
  },
  {
    pathname: ['/login', '/sign-up'],
    Layout: AuthLayout,
  },
];
