import { clientConfig } from '@/constants/env';

export const showErrorMessage = (message) => {
  if (clientConfig.nodeEnv === 'development') {
    console.error('Error from custom handler: ', message);
  }
};
