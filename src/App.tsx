import * as React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateAccount from './containers/createAccount';
import resetPassword from './containers/resetPassword';
import LoginContainer from 'src/containers/login';
import ConfirmAccountContainer from 'src/containers/confirmAccount';
import withAuthRedirect from 'src/hoc/withAuthRedirect';
import withTokenRedirect from 'src/hoc/withTokenRedirect';
import ForgotPasswordContainer from 'src/containers/forgotPassword';
import FrontendRoute from './config/FrontendRoute';
import DashboardContainer from './containers/dashboard';
import NotFoundContainer from 'src/containers/notFound';
import CreateApplicationContainer from './containers/createApplication';
import withNavbar from './hoc/withNavbar';
import withThemeProvider from './hoc/withThemeProvider';
import { IAccount, UserType } from './config/userTypes';


class App extends React.Component {

  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path={FrontendRoute.HOME_PAGE} component={withNavbar(withAuthRedirect(DashboardContainer))} />
          <Route exact={true} path={FrontendRoute.CREATE_ACCOUNT_PAGE} component={withNavbar(withAuthRedirect(CreateAccount, { requiredAuthState: false }))} />
          <Route exact={true} path={FrontendRoute.RESET_PASSWORD_PAGE} component={withTokenRedirect(resetPassword)} />
          <Route exact={true} path={FrontendRoute.CONFIRM_ACCOUNT_PAGE} component={withNavbar(withAuthRedirect(ConfirmAccountContainer, { requiredAuthState: true, redirAfterLogin: true }))} />
          <Route exact={true} path={FrontendRoute.FORGOT_PASSWORD_PAGE} component={withNavbar(ForgotPasswordContainer)} />
          <Route exact={true} path={FrontendRoute.CREATE_APPLICATION_PAGE}
            component={
              withNavbar(withAuthRedirect(
                CreateApplicationContainer,
                {
                  requiredAuthState: true,
                  redirAfterLogin: true,
                  AuthVerification:
                    (user: IAccount) => user.confirmed && user.accountType === UserType.HACKER
                }))} />
          <Route exact={true} path={FrontendRoute.LOGIN_PAGE} component={withNavbar(withAuthRedirect(LoginContainer, { requiredAuthState: false }))} />
          <Route path="*" component={NotFoundContainer} />
        </Switch>
      </BrowserRouter>
    );

  }
}

export default withThemeProvider(App);
