import * as React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ErrorPage from './pages/_error';
import ConfirmAccountPage from './pages/Account/Confirm';
import CreateAccountPage from './pages/Account/Create';
import EditAccountPage from './pages/Account/Edit';
import AdminSearchPage from './pages/Admin/Search';
import SettingsPage from './pages/Admin/Settings';
import ConfirmAttendancePage from './pages/Application/Confirm';
import CreateApplicationPage from './pages/Application/Create';
import EditApplicationPage from './pages/Application/Edit';
import SingleHackerPage from './pages/Application/View/[id]';
import CheckinPage from './pages/Hacker/Checkin';
import HackPassPage from './pages/Hacker/Pass';
import DashboardPage from './pages/index';
import LoginPage from './pages/Login/index';
import ForgotPasswordPage from './pages/Password/Forgot';
import ResetPasswordPage from './pages/Password/Reset';
import CreateSponsorPage from './pages/Sponsor/Create';
import EditSponsorPage from './pages/Sponsor/Edit';
import SponsorSearchPage from './pages/Sponsor/Search';
import SponsorOnboardingPage from './pages/Sponsor/Onboarding';
import TeamPage from './pages/Team/index';
import TravelPage from './pages/Travel/index';

import {
  FrontendRoute,
  HackerStatus,
  IAccount,
  IHacker,
  UserType,
} from './config';
import * as CONSTANTS from './config/constants';

import withAuthRedirect from './shared/HOC/withAuthRedirect';
import withBackground from './shared/HOC/withBackground';
import withHackerRedirect from './shared/HOC/withHackerRedirect';
import withNavbar from './shared/HOC/withNavbar';
import withSponsorRedirect from './shared/HOC/withSponsorRedirect';
import withThemeProvider from './shared/HOC/withThemeProvider';
import withTokenRedirect from './shared/HOC/withTokenRedirect';

import {
  canAccessApplication,
  canAccessHackerPass,
  canAccessTeam,
  canAccessTravel,
  isSponsor,
  userCanAccessHackerPage,
} from './util';
import InvitePage from './pages/Admin/Invite';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <>
          <Helmet>
            <title>{CONSTANTS.HACKATHON_NAME}</title>
            <meta property="og:title" content={CONSTANTS.HACKATHON_NAME} />
            <meta property="og:url" content={CONSTANTS.STATIC_SITE} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={CONSTANTS.HACKATHON_NAME} />
            <meta
              property="og:description"
              content={CONSTANTS.HACKATHON_DESCRIPTION}
            />
            <meta property="og:image" content={CONSTANTS.RICH_PREVIEW_IMAGE} />

            <meta name="twitter:card" content=" " />
            <meta name="twitter:title" content={CONSTANTS.HACKATHON_NAME} />
            <meta
              name="twitter:description"
              content={CONSTANTS.HACKATHON_DESCRIPTION}
            />
            <meta name="twitter:creator" content={CONSTANTS.TWITTER} />
            <meta name="twitter:image" content={CONSTANTS.RICH_PREVIEW_IMAGE} />
            <meta name="twitter:domain" content={CONSTANTS.HACKATHON_NAME} />
            <meta name="twitter:site" content={CONSTANTS.TWITTER} />
          </Helmet>
          <Switch>
            <Route
              exact={true}
              path={FrontendRoute.HOME_PAGE}
              component={withBackground(
                withNavbar(withAuthRedirect(DashboardPage), {
                  activePage: 'home',
                })
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.CREATE_ACCOUNT_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(CreateAccountPage, {
                    requiredAuthState: false,
                  }),
                  { activePage: 'profile' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.EDIT_ACCOUNT_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(EditAccountPage, {
                    redirAfterLogin: true,
                    requiredAuthState: true,
                  }),
                  { activePage: 'profile' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.RESET_PASSWORD_PAGE}
              component={withNavbar(withTokenRedirect(ResetPasswordPage))}
            />
            <Route
              exact={true}
              path={FrontendRoute.CONFIRM_ACCOUNT_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(ConfirmAccountPage, {
                    requiredAuthState: true,
                    redirAfterLogin: true,
                  }),
                  { activePage: 'home' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.FORGOT_PASSWORD_PAGE}
              component={withNavbar(ForgotPasswordPage)}
            />
            <Route
              exact={true}
              path={FrontendRoute.WELL_KNOWN_PASSWORD_CHANGE}
              component={withNavbar(ForgotPasswordPage)}
            />
            <Route
              exact={true}
              path={FrontendRoute.CREATE_APPLICATION_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(
                    withHackerRedirect(CreateApplicationPage, {
                      AuthVerification: canAccessApplication,
                    }),
                    {
                      redirAfterLogin: true,
                      AuthVerification: (user: IAccount) =>
                        user.confirmed && user.accountType === UserType.HACKER,
                    }
                  ),
                  { activePage: 'application' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.EDIT_APPLICATION_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(
                    withHackerRedirect(EditApplicationPage, {
                      AuthVerification: canAccessApplication,
                    }),
                    {
                      requiredAuthState: true,
                      redirAfterLogin: true,
                      AuthVerification: (user: IAccount) =>
                        user.confirmed && user.accountType === UserType.HACKER,
                    }
                  ),
                  { activePage: 'application' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.TEAM_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(
                    withHackerRedirect(TeamPage, {
                      AuthVerification: canAccessTeam,
                    }),
                    {
                      requiredAuthState: true,
                      redirAfterLogin: true,
                      AuthVerification: (user: IAccount) =>
                        user.confirmed && user.accountType === UserType.HACKER,
                    }
                  ),
                  { activePage: 'team' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.TRAVEL_PAGE}
              component={withNavbar(
                withAuthRedirect(
                  withHackerRedirect(TravelPage, {
                    AuthVerification: canAccessTravel,
                  }),
                  {
                    requiredAuthState: true,
                    redirAfterLogin: true,
                    AuthVerification: (user: IAccount) =>
                      user.confirmed && user.accountType === UserType.HACKER,
                  }
                ),
                { activePage: 'travel' }
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.LOGIN_PAGE}
              component={withBackground(
                withAuthRedirect(LoginPage, {
                  requiredAuthState: false,
                })
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.CONFIRM_HACKER_PAGE}
              component={withNavbar(
                withAuthRedirect(
                  withHackerRedirect(ConfirmAttendancePage, {
                    requiredAuthState: true,
                    AuthVerification: (user: IHacker) =>
                      user.confirmed &&
                      user.status === HackerStatus.HACKER_STATUS_ACCEPTED,
                  }),
                  {
                    redirAfterLogin: true,
                    AuthVerification: (user: IAccount) =>
                      user.confirmed && user.accountType === UserType.HACKER,
                  }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.ADMIN_SEARCH_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(AdminSearchPage, {
                    requiredAuthState: true,
                    redirAfterLogin: true,
                    AuthVerification: (user: IAccount) =>
                      user.confirmed && user.accountType === UserType.STAFF,
                  }),
                  { activePage: 'search' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.SETTINGS_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(SettingsPage, {
                    requiredAuthState: true,
                    redirAfterLogin: true,
                    AuthVerification: (user: IAccount) =>
                      user.confirmed && user.accountType === UserType.STAFF,
                  }),
                  { activePage: 'settings' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.INVITE_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(InvitePage, {
                    requiredAuthState: true,
                    redirAfterLogin: true,
                    AuthVerification: (user: IAccount) =>
                      user.confirmed && user.accountType === UserType.STAFF,
                  }),
                  { activePage: 'invite' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.SPONSOR_SEARCH_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(SponsorSearchPage, {
                    requiredAuthState: true,
                    redirAfterLogin: true,
                    AuthVerification: (user: IAccount) =>
                      user.confirmed && isSponsor(user),
                  }),
                  { activePage: 'search' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.SPONSOR_ONBOARDING_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(SponsorOnboardingPage, {
                    requiredAuthState: true,
                    redirAfterLogin: true,
                    AuthVerification: (user: IAccount) =>
                      user.confirmed && isSponsor(user),
                  }),
                  { activePage: 'onboarding' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.VIEW_HACKER_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(SingleHackerPage, {
                    requiredAuthState: true,
                    redirAfterLogin: true,
                    AuthVerification: userCanAccessHackerPage,
                  })
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.CHECKIN_HACKER_PAGE}
              component={withNavbar(
                withAuthRedirect(CheckinPage, {
                  requiredAuthState: true,
                  AuthVerification: (user: IAccount) =>
                    user.confirmed &&
                    (user.accountType === UserType.STAFF ||
                      user.accountType === UserType.VOLUNTEER),
                })
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.CREATE_SPONSOR_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(
                    withSponsorRedirect(CreateSponsorPage, {
                      requiredAuthState: false,
                    }),
                    {
                      redirAfterLogin: true,
                      AuthVerification: (user: IAccount) =>
                        user.confirmed && isSponsor(user),
                    }
                  ),
                  { activePage: 'sponsor' }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.PASS_HACKER_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(
                    withHackerRedirect(HackPassPage, {
                      requiredAuthState: true,
                      AuthVerification: canAccessHackerPass,
                    }),
                    {
                      redirAfterLogin: true,
                      requiredAuthState: true,
                      AuthVerification: (user: IAccount) =>
                        user.accountType === UserType.HACKER,
                    }
                  )
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.EDIT_SPONSOR_PAGE}
              component={withBackground(
                withNavbar(
                  withAuthRedirect(
                    withSponsorRedirect(EditSponsorPage, {
                      requiredAuthState: true,
                    }),
                    {
                      redirAfterLogin: true,
                      AuthVerification: (user: IAccount) =>
                        user.confirmed && isSponsor(user),
                    }
                  ),
                  { activePage: 'sponsor' }
                )
              )}
            />
            <Route path="*" component={withBackground(withNavbar(ErrorPage))} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default withThemeProvider(App);
