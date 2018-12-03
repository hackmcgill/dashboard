import * as React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateAccount from './containers/createAccount';
import resetPassword from './containers/resetPassword';
import HomeComponent from './components/HomeComponent';
import LoginContainer from 'src/containers/login';
import ConfirmAccountContainer from 'src/containers/confirmAccount';
import withAuthRedirect from 'src/hoc/withAuthRedirect';
import withTokenRedirect from 'src/hoc/withTokenRedirect';
import ForgotPasswordContainer from 'src/containers/forgotPassword';
import NotFoundContainer from 'src/containers/notFound';
import { ThemeProvider } from 'styled-components';
import theme from 'src/theme';
import FrontendRoute from './config/FrontendRoute';


class App extends React.Component {

  public render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={withAuthRedirect(HomeComponent)} />
            <Route exact={true} path={FrontendRoute.CREATE_ACCOUNT_PAGE} component={withAuthRedirect(CreateAccount, false)} />
            <Route exact={true} path={FrontendRoute.RESET_PASSWORD_PAGE} component={withTokenRedirect(resetPassword)} />
            <Route exact={true} path={FrontendRoute.CONFIRM_ACCOUNT_PAGE} component={withAuthRedirect(ConfirmAccountContainer, true)} />
            <Route exact={true} path={FrontendRoute.FORGOT_PASSWORD_PAGE} component={ForgotPasswordContainer} />
            <Route exact={true} path={FrontendRoute.LOGIN_PAGE} component={withAuthRedirect(LoginContainer, false)} />
            <Route path="*" component={NotFoundContainer} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );

  }
}

export default App;
