import { clientConfig } from '@/constants/env';

export const showErrorMessage = (message) => {
  if (clientConfig.nodeEnv === 'development') {
    console.log('Error from custom handler: ', message);
  }
};

export const getAvartarUrl = (avatarUrl) => {
  const regex = /^(https?:\/\/[^\s]+|\/[^\s]+)/i;
  if (!avatarUrl || regex.test(avatarUrl) === false) {
    avatarUrl = '/images/default-avatar.jpg';
  }
  return avatarUrl;
};
