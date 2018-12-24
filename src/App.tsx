import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateAccount from './Account/AccountCreation';
import resetPassword from './Login/PasswordReset';

import NotFoundContainer from './404/404';
import EditAccountContainer from './Account/AccountEdition';
import ConfirmAccountContainer from './Account/EmailConfirmed';
import CreateApplicationContainer from './Application/ApplicationCreation';
import DashboardContainer from './Dashboard/Main';
import LoginContainer from './Login/Login';

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
import withHackerRedirect from './shared/HOC/withHackerRedirect';
import withNavbar from './shared/HOC/withNavbar';
import withThemeProvider from './shared/HOC/withThemeProvider';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact={true}
            path={FrontendRoute.HOME_PAGE}
            component={withNavbar(withAuthRedirect(DashboardContainer))}
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
                  AuthVerification: (hacker: IHacker) =>
                    hacker.status === HackerStatus.HACKER_STATUS_APPLIED,
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
          <Route path="*" component={withNavbar(NotFoundContainer)} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withThemeProvider(App);
