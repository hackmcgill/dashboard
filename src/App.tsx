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
  // HackerStatus,
  IAccount,
  // IHacker,
  UserType,
} from './config';
import ForgotPasswordContainer from './Login/PasswordForgot';
import withAuthRedirect from './shared/HOC/withAuthRedirect';
import withTokenRedirect from './shared/HOC/withTokenRedirect';

import EditApplicationContainer from './Application/ApplicationEdition';
// import ConfirmAttendanceContainer from './ConfirmAttendance/ConfirmAttendance';
import SearchContainer from './Search/Search';
import withHackerRedirect from './shared/HOC/withHackerRedirect';
import withNavAndFooter from './shared/HOC/withNavAndFooter';
import withSponsorRedirect from './shared/HOC/withSponsorRedirect';
import withThemeProvider from './shared/HOC/withThemeProvider';
import SingleHackerContainer from './SingleHacker/Main';
import CreateSponsorContainer from './Sponsor/SponsorCreation';
import EditSponsorContainer from './Sponsor/SponsorEdition';
import {
  canAccessApplication,
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
            component={withNavAndFooter(withAuthRedirect(Dashboard))}
          />
          <Route
            exact={true}
            path={FrontendRoute.CREATE_ACCOUNT_PAGE}
            component={withNavAndFooter(
              withAuthRedirect(CreateAccount, {
                requiredAuthState: false,
              })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.EDIT_ACCOUNT_PAGE}
            component={withNavAndFooter(
              withAuthRedirect(EditAccountContainer, {
                redirAfterLogin: true,
                requiredAuthState: true,
              })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.RESET_PASSWORD_PAGE}
            component={withNavAndFooter(withTokenRedirect(resetPassword))}
          />
          <Route
            exact={true}
            path={FrontendRoute.CONFIRM_ACCOUNT_PAGE}
            component={withNavAndFooter(
              withAuthRedirect(ConfirmAccountContainer, {
                requiredAuthState: true,
                redirAfterLogin: true,
              })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.FORGOT_PASSWORD_PAGE}
            component={withNavAndFooter(ForgotPasswordContainer)}
          />
          <Route
            exact={true}
            path={FrontendRoute.CREATE_APPLICATION_PAGE}
            component={withNavAndFooter(
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
            component={withNavAndFooter(
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
            component={withNavAndFooter(
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
            component={withNavAndFooter(
              withAuthRedirect(LoginContainer, {
                requiredAuthState: false,
              })
            )}
          />
          {/* <Route
            exact={true}
            path={FrontendRoute.CONFIRM_HACKER_PAGE}
            component={withNavAndFooter(
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
            component={withNavAndFooter(
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
            path={FrontendRoute.VIEW_HACKER_PAGE}
            component={withNavAndFooter(
              withAuthRedirect(SingleHackerContainer, {
                requiredAuthState: true,
                redirAfterLogin: true,
                AuthVerification: userCanAccessHackerPage,
              })
            )}
          />
          <Route
            exact={true}
            path={FrontendRoute.CREATE_SPONSOR_PAGE}
            component={withNavAndFooter(
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
            path={FrontendRoute.EDIT_SPONSOR_PAGE}
            component={withNavAndFooter(
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
          <Route path="*" component={withNavAndFooter(NotFoundContainer)} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withThemeProvider(App);
