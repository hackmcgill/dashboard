import * as React from "react";
import { Redirect } from "react-router-dom";
import { IAccount } from 'src/config/userTypes';
import FrontendRoute from 'src/config/FrontendRoute';
import UserInfoController from 'src/config/UserInfoController';

enum authStates {
  authorized,
  unauthorized,
  undefined
}

export interface IAuthDirectOptions {
  requiredAuthState?: boolean;
  AuthVerification?: (acct: IAccount) => boolean;
  redirOnSuccess?: boolean;
  redirComponent?: React.Component;
}

const defaultOptions = {
  requiredAuthState: true,
  AuthVerification: (acct: IAccount) => true,
  redirOnSuccess: false
}

const withAuthRedirect = <P extends {}>(Component: React.ComponentType<P>, options: IAuthDirectOptions = defaultOptions) =>
  class extends React.Component<P, { authState: authStates }> {

    private verification: (acct: IAccount) => boolean;
    private redirOnSuccess: string;

    constructor(props: any) {
      super(props);
      this.state = {
        authState: authStates.undefined
      };
      this.verification = (options.AuthVerification) ? options.AuthVerification : defaultOptions.AuthVerification;
      this.redirOnSuccess = (options.redirOnSuccess) ? `?redir=${encodeURIComponent(window.location.pathname + window.location.search)}` : '';
    }

    public async componentDidMount() {
      try {
        const selfInfo = await UserInfoController.getUserInfo();
        if (selfInfo) {
          const verified = this.verification(selfInfo);
          this.setState({
            authState: (verified) ? authStates.authorized : authStates.unauthorized
          });
        } else {
          this.setState({
            authState: authStates.unauthorized
          });
        }
      } catch (e) {
        this.setState({
          authState: authStates.unauthorized
        });
      }
    }

    public render() {
      const { authState } = this.state;
      const redir = options.redirComponent ? <Redirect to={options.redirComponent} /> : <Redirect to={FrontendRoute.HOME_PAGE} />;
      switch (authState) {
        case authStates.authorized:
          return options.requiredAuthState ? <Component {...this.props} /> : redir;
        case authStates.unauthorized:
          return options.requiredAuthState ? (<Redirect to={`${FrontendRoute.LOGIN_PAGE + this.redirOnSuccess}`} />) : <Component {...this.props} />;
        default:
          return <div />;
      }
    }
  }

export default withAuthRedirect;
