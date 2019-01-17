export enum FrontendRoute {
  ADMIN_SEARCH_PAGE = '/admin/search',
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
  HOME_PAGE = '/',
  LOGIN_PAGE = '/login',
  RESET_PASSWORD_PAGE = '/password/reset',
  SPONSOR_SEARCH_PAGE = '/sponsor/search',
  TEAM_PAGE = '/team',
}

export default FrontendRoute;
