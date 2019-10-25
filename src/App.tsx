import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFoundContainer from './features/404/404';
import ConfirmAccountContainer from './features/Account/ConfirmAccountContainer';
import CreateAccountContainer from './features/Account/CreateAccountContainer';
import EditAccountContainer from './features/Account/EditAccountContainer';
import CreateApplicationContainer from './features/Application/CreateApplicationContainer';
import EditApplicationContainer from './features/Application/EditApplicationContainer';
import CheckinContainer from './features/Checkin/Main';
import Dashboard from './features/Dashboard/Main';
import HackPassContainer from './features/HackPass/Main';
import LoginContainer from './features/Login/Login';
import ForgotPasswordContainer from './features/Login/PasswordForgot';
import resetPassword from './features/Login/PasswordReset';
import SearchContainer from './features/Search/Search';
import SingleHackerContainer from './features/SingleHacker/Main';
import CreateSponsorContainer from './features/Sponsor/SponsorCreation';
import EditSponsorContainer from './features/Sponsor/SponsorEdition';
import TeamContainer from './features/Team/Main';

import {
  FrontendRoute,
  // HackerStatus,
  IAccount,
  // IHacker,
  UserType,
} from './config';

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
  isSponsor,
  userCanAccessHackerPage,
} from './util';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact={true}
            path={FrontendRoute.HOME_PAGE}
            component={withNavbar(withAuthRedirect(Dashboard))}
          />
          <Route
            exact={true}
            path={FrontendRoute.CREATE_ACCOUNT_PAGE}
            component={withNavbar(
              withAuthRedirect(CreateAccountContainer, {
                requiredAuthState: false,
              })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.EDIT_ACCOUNT_PAGE}
            component={withNavbar(
              withAuthRedirect(EditAccountContainer, {
                redirAfterLogin: true,
                requiredAuthState: true,
              })
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
              })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.FORGOT_PASSWORD_PAGE}
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
              )
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
              )
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
              )
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.LOGIN_PAGE}
            component={withNavbar(
              withAuthRedirect(LoginContainer, {
                requiredAuthState: false,
              })
            )}
          />
          {/* <Route
            exact={true}
            path={FrontendRoute.CONFIRM_HACKER_PAGE}
            component={withNavbar(
              withAuthRedirect(
                withHackerRedirect(ConfirmAttendanceContainer, {
                  requiredAuthState: true,
                  AuthVerification: (user: IHacker) =>
                    // user must have been accepted in order to confirm.
                    user.status === HackerStatus.HACKER_STATUS_ACCEPTED,
                }),
                {
                  redirAfterLogin: true,
                  AuthVerification: (user: IAccount) =>
                    user.confirmed && user.accountType === UserType.HACKER,
                }
              )
            )}
          /> */}
          <Route
            exact={true}
            path={FrontendRoute.ADMIN_SEARCH_PAGE}
            component={withNavbar(
              withAuthRedirect(SearchContainer, {
                requiredAuthState: true,
                redirAfterLogin: true,
                AuthVerification: (user: IAccount) =>
                  user.confirmed && user.accountType === UserType.STAFF,
              })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.SPONSOR_SEARCH_PAGE}
            component={withNavbar(
              withAuthRedirect(SearchContainer, {
                requiredAuthState: true,
                redirAfterLogin: true,
                AuthVerification: (user: IAccount) =>
                  user.confirmed && isSponsor(user),
              })
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
              )
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
              )
            )}
          />
          <Route path="*" component={withNavbar(NotFoundContainer)} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withThemeProvider(App);
