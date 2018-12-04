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
  // True, if user must be authorized, or False if user must not be authorized
  requiredAuthState?: boolean;
  // Function that is called when user is authorized. This is used for further state verifications
  AuthVerification?: (acct: IAccount) => boolean;
  // True, if user should be redirected to original component if the user failed authentication.
  redirAfterLogin?: boolean;
  // If user must be authorized, but AuthVerifcation is failed, and we do not want to navigate to Home page, specify another link to redirect to.
  redirLinkIfAuthStateFail?: string;
}

const defaultOptions = {
  requiredAuthState: true,
  AuthVerification: (acct: IAccount) => true,
  redirAfterLogin: false,
  redirLinkIfAuthStateFail: FrontendRoute.HOME_PAGE
}

/**
 * 
 * @param Component The component to navigate to if options succeeds
 * @param options Options for specifying what sort of authentication redirect you want.
 */
const withAuthRedirect = <P extends {}>(Component: React.ComponentType<P>, options: IAuthDirectOptions = defaultOptions) =>
  class extends React.Component<P, { authState: authStates }> {

    private verification: (acct: IAccount) => boolean;
    private redirLinkAfterLogin: string;
    private redirLinkIfAuthStateFail: string;

    constructor(props: any) {
      super(props);
      this.state = {
        authState: authStates.undefined
      };
      this.verification = (options.AuthVerification) ? options.AuthVerification : defaultOptions.AuthVerification;
      this.redirLinkAfterLogin = (options.redirAfterLogin) ? `?redir=${encodeURIComponent(window.location.pathname + window.location.search)}` : '';
      this.redirLinkIfAuthStateFail = (options.redirLinkIfAuthStateFail) ? options.redirLinkIfAuthStateFail : defaultOptions.redirLinkIfAuthStateFail;
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
      const redirComponent = <Redirect to={this.redirLinkIfAuthStateFail} />;
      switch (authState) {
        case authStates.authorized:
          return options.requiredAuthState ? <Component {...this.props} /> : redirComponent;
        case authStates.unauthorized:
          return options.requiredAuthState ? (<Redirect to={`${FrontendRoute.LOGIN_PAGE + this.redirLinkAfterLogin}`} />) : <Component {...this.props} />;
        default:
          return <div />;
      }
    }
  }

export default withAuthRedirect;
