import * as React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFoundContainer from './pages/_error';
import ConfirmAccountContainer from './pages/Account/Confirm';
import CreateAccountContainer from './pages/Account/Create';
import EditAccountContainer from './pages/Account/Edit';
import CreateApplicationContainer from './pages/Application/Create';
import EditApplicationContainer from './pages/Application/Edit';
import CheckinContainer from './pages/Hacker/Checkin';
import ConfirmAttendanceContainer from './pages/Account/Confirm';
import Dashboard from './pages/index';
import HackPassContainer from './pages/Hacker/Pass';
import LoginContainer from './pages/Login/index';
import ForgotPasswordContainer from './pages/Password/Forgot';
import resetPassword from './pages/Password/Reset';
import AdminSearch from './pages/Admin/Search';
import SponsorSearch from './pages/Sponsor/Search';
import SingleHackerContainer from './pages/Application/View/[id]';
import CreateSponsorContainer from './pages/Sponsor/Create';
import EditSponsorContainer from './pages/Sponsor/Edit';
import TeamContainer from './pages/Team/index';
import TravelContainer from './pages/Travel/index';

import {
  FrontendRoute,
  HackerStatus,
  IAccount,
  IHacker,
  UserType,
} from './config';
import * as CONSTANTS from './config/constants';

import withAuthRedirect from './shared/HOC/withAuthRedirect';
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

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
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
              component={withNavbar(withAuthRedirect(Dashboard), {
                activePage: 'home',
              })}
            />
            <Route
              exact={true}
              path={FrontendRoute.CREATE_ACCOUNT_PAGE}
              component={withNavbar(
                withAuthRedirect(CreateAccountContainer, {
                  requiredAuthState: false,
                }),
                { activePage: 'profile' }
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.EDIT_ACCOUNT_PAGE}
              component={withNavbar(
                withAuthRedirect(EditAccountContainer, {
                  redirAfterLogin: true,
                  requiredAuthState: true,
                }),
                { activePage: 'profile' }
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.RESET_PASSWORD_PAGE}
              component={withNavbar(withTokenRedirect(resetPassword))}
            />
            <Route
              exact={true}
              path={FrontendRoute.CONFIRM_ACCOUNT_PAGE}
              component={withNavbar(
                withAuthRedirect(ConfirmAccountContainer, {
                  requiredAuthState: true,
                  redirAfterLogin: true,
                }),
                { activePage: 'home' }
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.FORGOT_PASSWORD_PAGE}
              component={withNavbar(ForgotPasswordContainer)}
            />
            <Route
              exact={true}
              path={FrontendRoute.WELL_KNOWN_PASSWORD_CHANGE}
              component={withNavbar(ForgotPasswordContainer)}
            />
            <Route
              exact={true}
              path={FrontendRoute.CREATE_APPLICATION_PAGE}
              component={withNavbar(
                withAuthRedirect(
                  withHackerRedirect(CreateApplicationContainer, {
                    requiredAuthState: false,
                  }),
                  {
                    redirAfterLogin: true,
                    AuthVerification: (user: IAccount) =>
                      user.confirmed && user.accountType === UserType.HACKER,
                  }
                ),
                { activePage: 'application' }
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.EDIT_APPLICATION_PAGE}
              component={withNavbar(
                withAuthRedirect(
                  withHackerRedirect(EditApplicationContainer, {
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
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.TEAM_PAGE}
              component={withNavbar(
                withAuthRedirect(
                  withHackerRedirect(TeamContainer, {
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
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.TRAVEL_PAGE}
              component={withNavbar(
                withAuthRedirect(
                  withHackerRedirect(TravelContainer, {
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
              component={withNavbar(
                withAuthRedirect(LoginContainer, {
                  requiredAuthState: false,
                }),
                { activePage: 'login' }
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.CONFIRM_HACKER_PAGE}
              component={withNavbar(
                withAuthRedirect(
                  withHackerRedirect(ConfirmAttendanceContainer, {
                    requiredAuthState: true,
                    AuthVerification: (user: IHacker) =>
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
              component={withNavbar(
                withAuthRedirect(AdminSearch, {
                  requiredAuthState: true,
                  redirAfterLogin: true,
                  AuthVerification: (user: IAccount) =>
                    user.confirmed && user.accountType === UserType.STAFF,
                }),
                { activePage: 'search' }
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.SPONSOR_SEARCH_PAGE}
              component={withNavbar(
                withAuthRedirect(SponsorSearch, {
                  requiredAuthState: true,
                  redirAfterLogin: true,
                  AuthVerification: (user: IAccount) =>
                    user.confirmed && isSponsor(user),
                }),
                { activePage: 'search' }
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.VIEW_HACKER_PAGE}
              component={withNavbar(
                withAuthRedirect(SingleHackerContainer, {
                  requiredAuthState: true,
                  redirAfterLogin: true,
                  AuthVerification: userCanAccessHackerPage,
                })
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.CHECKIN_HACKER_PAGE}
              component={withNavbar(
                withAuthRedirect(CheckinContainer, {
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
              component={withNavbar(
                withAuthRedirect(
                  withSponsorRedirect(CreateSponsorContainer, {
                    requiredAuthState: false,
                  }),
                  {
                    redirAfterLogin: true,
                    AuthVerification: (user: IAccount) =>
                      user.confirmed && isSponsor(user),
                  }
                ),
                { activePage: 'sponsor' }
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.PASS_HACKER_PAGE}
              component={withNavbar(
                withAuthRedirect(
                  withHackerRedirect(HackPassContainer, {
                    requiredAuthState: true,
                    AuthVerification: canAccessHackerPass,
                  }),
                  {
                    redirAfterLogin: true,
                    requiredAuthState: true,
                    AuthVerification: (user: IAccount) =>
                      user.confirmed && user.accountType === UserType.HACKER,
                  }
                )
              )}
            />
            <Route
              exact={true}
              path={FrontendRoute.EDIT_SPONSOR_PAGE}
              component={withNavbar(
                withAuthRedirect(
                  withSponsorRedirect(EditSponsorContainer, {
                    requiredAuthState: true,
                  }),
                  {
                    redirAfterLogin: true,
                    AuthVerification: (user: IAccount) =>
                      user.confirmed && isSponsor(user),
                  }
                ),
                { activePage: 'sponsor' }
              )}
            />
            <Route path="*" component={withNavbar(NotFoundContainer)} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default withThemeProvider(App);
