export enum FrontendRoute {
  ADMIN_SEARCH_PAGE = '/admin/search',
  ADMIN_STATS_PAGE = '/admin/stats',
  CHECKIN_HACKER_PAGE = '/hacker/checkin',
  PASS_HACKER_PAGE = '/hacker/pass',
  CONFIRM_ACCOUNT_PAGE = '/account/confirm',
  CREATE_ACCOUNT_PAGE = '/account/create',
  CREATE_APPLICATION_PAGE = '/application/create',
  CONFIRM_HACKER_PAGE = '/application/confirm',
  VIEW_HACKER_PAGE = '/application/view/:id',
  EDIT_ACCOUNT_PAGE = '/account/edit',
  EDIT_APPLICATION_PAGE = '/application/edit',
  FORGOT_PASSWORD_PAGE = '/password/forgot',
  WELL_KNOWN_PASSWORD_CHANGE = '/.well-known/change-password',
  INVITE_PAGE = '/invite',
  HOME_PAGE = '/',
  LOGIN_PAGE = '/login',
  RESET_PASSWORD_PAGE = '/password/reset',
  SETTINGS_PAGE = '/settings',
  SPONSOR_SEARCH_PAGE = '/sponsor/search',
  SPONSOR_ONBOARDING_PAGE = '/sponsor/onboarding',
  TEAM_PAGE = '/team',
  TRAVEL_PAGE = '/travel',

  CREATE_SPONSOR_PAGE = '/sponsor/create',
  EDIT_SPONSOR_PAGE = '/sponsor/edit',
}

export default FrontendRoute;
