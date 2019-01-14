import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateAccount from './Account/AccountCreation';
import resetPassword from './Login/PasswordReset';

import NotFoundContainer from './404/404';
import EditAccountContainer from './Account/AccountEdition';
import ConfirmAccountContainer from './Account/EmailConfirmed';
import CreateApplicationContainer from './Application/ApplicationCreation';
import Dashboard from './Dashboard/Main';
import LoginContainer from './Login/Login';
import TeamContainer from './Team/Main';

import {
  FrontendRoute,
  HackerStatus,
  IAccount,
  IHacker,
  UserType,
} from './config';
import ForgotPasswordContainer from './Login/PasswordForgot';
import withAuthRedirect from './shared/HOC/withAuthRedirect';
import withTokenRedirect from './shared/HOC/withTokenRedirect';

import EditApplicationContainer from './Application/ApplicationEdition';
import CheckinContainer from './Checkin/Main';
import ConfirmAttendanceContainer from './ConfirmAttendance/ConfirmAttendance';
import HackPassContainer from './HackPass/Main';
import SearchContainer from './Search/Search';
import withHackerRedirect from './shared/HOC/withHackerRedirect';
import withNavbar from './shared/HOC/withNavbar';
import withThemeProvider from './shared/HOC/withThemeProvider';
import { canAccessHackerPass } from './util';
import {
  canAccessApplication,
  canAccessHackerPass,
  canAccessTeam,
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
              withAuthRedirect(CreateAccount, {
                requiredAuthState: false,
              })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.EDIT_ACCOUNT_PAGE}
            component={withNavbar(
              withAuthRedirect(EditAccountContainer, {
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
          <Route
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
          />
          <Route
            exact={true}
            path={FrontendRoute.ADMIN_SEARCH_PAGE}
            component={withNavbar(
              withAuthRedirect(SearchContainer, {
                requiredAuthState: true,
                AuthVerification: (user: IAccount) =>
                  user.confirmed &&
                  (user.accountType === UserType.STAFF ||
                    user.accountType === UserType.SPONSOR),
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
            path={FrontendRoute.PASS_HACKER_PAGE}
            component={withNavbar(
              withAuthRedirect(
                withHackerRedirect(HackPassContainer, {
                  requiredAuthState: true,
                  AuthVerification: canAccessHackerPass,
                }),
                {
                  requiredAuthState: true,
                  AuthVerification: (user: IAccount) =>
                    user.confirmed && user.accountType === UserType.HACKER,
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
