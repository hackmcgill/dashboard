import * as React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateAccount from './containers/createAccount';
import resetPassword from './containers/resetPassword';
import LoginContainer from 'src/containers/login';
import withAuthRedirect from 'src/hoc/withAuthRedirect';
import withTokenRedirect from 'src/hoc/withTokenRedirect';
import withThemeProvider from 'src/hoc/withThemeProvider';
import ForgotPasswordContainer from 'src/containers/forgotPassword';
import FrontendRoute from './config/FrontendRoute';
import DashboardContainer from './containers/dashboard';

class App extends React.Component {

  public render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={withAuthRedirect(DashboardContainer)} />
            <Route exact={true} path={FrontendRoute.CREATE_ACCOUNT_PAGE} component={withAuthRedirect(CreateAccount, false)} />
            <Route exact={true} path={FrontendRoute.RESET_PASSWORD_PAGE} component={withTokenRedirect(resetPassword)} />
            <Route exact={true} path={FrontendRoute.FORGOT_PASSWORD_PAGE} component={ForgotPasswordContainer} />
            <Route exact={true} path={FrontendRoute.LOGIN_PAGE} component={withAuthRedirect(LoginContainer, false)} />
          </Switch>
        </BrowserRouter>
    );

  }
}

export default withThemeProvider(App);
