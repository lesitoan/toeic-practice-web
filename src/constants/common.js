export const DEFAULT_ERROR_MESSAGE = 'Server error! Please try again later.';

export const WEB_APP_NAME = 'TOEIC PRACTICE';

export const USER_ACCESS_TOKEN = 'user_access_token';
export const USER_REFRESH_TOKEN = 'user_refresh_token';

export const ROLE = {
  USER_FREE: 'user_free',
  USER_PRO: 'user_pro',
};

export const PROTECTED_ROUTES = [
  { pathRegex: /^\/tests\/.+$/, roles: [ROLE.USER_FREE, ROLE.USER_PRO] },
  { pathRegex: /^\/profile(\/.*)?$/, roles: [ROLE.USER_FREE, ROLE.USER_PRO] },
  { pathRegex: /^\/vocabulary(\/.*)?$/, roles: [ROLE.USER_FREE, ROLE.USER_PRO] },
  { pathRegex: /^\/flashcards(\/.*)?$/, roles: [ROLE.USER_FREE, ROLE.USER_PRO] },
  { pathRegex: /^\/collections(\/.*)?$/, roles: [ROLE.USER_FREE, ROLE.USER_PRO] },
  { pathRegex: /^\/word-quiz(\/.*)?$/, roles: [ROLE.USER_FREE, ROLE.USER_PRO] },
  { pathRegex: /^\/class(\/.*)?$/, roles: [ROLE.USER_FREE, ROLE.USER_PRO] },
  { pathRegex: /^\/pricing(\/.*)?$/, roles: [ROLE.USER_FREE] },
];
