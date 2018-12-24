export enum APIRoute {
  // Auth routes
  AUTH_LOGIN = 'auth/login',
  AUTH_LOGOUT = 'auth/logout',
  AUTH_FORGOT_PASS = 'auth/password/forgot',
  AUTH_RESET_PASS = 'auth/password/reset',
  AUTH_CONFIRM_ACCT = 'auth/confirm',
  AUTH_RESEND_CONF_EMAIL = 'auth/confirm/resend',
  AUTH_CHANGE_PASS = 'auth/password/change',

  // Account routes
  ACCOUNT = 'account',
  ACCOUNT_SELF = 'account/self',
  ACCOUNT_INVITE = 'account/invite',
  // Hacker routes
  HACKER = 'hacker',
  HACKER_SELF = 'hacker/self',
  HACKER_RESUME = 'hacker/resume',
  HACKER_STATUS = 'hacker/status',
  HACKER_CHECKIN = 'hacker/checkin',
  HACKER_STATS = 'hacker/stats',
  // Search routes
  SEARCH = 'search',
  // Sponsor routes
  SPONSOR = 'sponsor',
}
export default APIRoute;
