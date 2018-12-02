import * as React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateAccount from './containers/createAccount';
import resetPassword from './containers/resetPassword';
import HomeComponent from './components/HomeComponent';
import LoginContainer from 'src/containers/login';
import ConfirmAccountContainer from 'src/containers/confirmAccount';
import withAuthRedirect from 'src/hoc/withAuthRedirect';
import { ThemeProvider } from 'styled-components';
import theme from 'src/theme';

class App extends React.Component {

  public render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={withAuthRedirect(HomeComponent)} />
            <Route path="/account/create/" component={withAuthRedirect(CreateAccount, false)} />
            <Route path="/password/reset" component={withAuthRedirect(resetPassword, false)} />
            <Route path="/account/confirm" component={withAuthRedirect(ConfirmAccountContainer, true)} />
            <Route path='/login/' component={withAuthRedirect(LoginContainer, false)} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );

  }


}

export default App;
