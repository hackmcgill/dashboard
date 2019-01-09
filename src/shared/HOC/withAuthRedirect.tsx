import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { FrontendRoute, IAccount } from '../../config';
import { getUserInfo } from '../../util/UserInfoHelperFunctions';

enum authStates {
  authorized,
  unauthorized,
  undefined,
}

export interface IAuthDirectOptions {
  // True, if user must be authorized, or False if user must not be authorized
  requiredAuthState?: boolean;
  // Function that is called when user is authorized. This is used for further state verifications
  AuthVerification?: (acct: IAccount) => boolean;
  // True, if user should be redirected to original component if the user failed authentication.
  redirAfterLogin?: boolean;
}

const defaultOptions = {
  requiredAuthState: true,
  AuthVerification: (acct: IAccount) => true,
  redirOnSuccess: false,
};

const withAuthRedirect = <P extends {}>(
  Component: React.ComponentType<P>,
  options: IAuthDirectOptions = defaultOptions
) =>
  class extends React.Component<P, { authState: authStates }> {
    private verification: (acct: IAccount) => boolean;
    private redirOnSuccess: string;

    constructor(props: any) {
      super(props);
      this.state = {
        authState: authStates.undefined,
      };
      this.verification = options.AuthVerification
        ? options.AuthVerification
        : defaultOptions.AuthVerification;
      this.redirOnSuccess = options.redirAfterLogin
        ? `?redir=${encodeURIComponent(
            window.location.pathname + window.location.search
          )}`
        : '';
      options.requiredAuthState =
        options.requiredAuthState !== undefined
          ? options.requiredAuthState
          : defaultOptions.requiredAuthState;
    }

    public async componentDidMount() {
      try {
        const selfInfo = await getUserInfo();
        if (selfInfo) {
          const verified = this.verification(selfInfo);
          this.setState({
            authState: verified
              ? authStates.authorized
              : authStates.unauthorized,
          });
        } else {
          this.setState({
            authState: authStates.unauthorized,
          });
        }
      } catch (e) {
        this.setState({
          authState: authStates.unauthorized,
        });
      }
    }

    public render() {
      const { authState } = this.state;
      switch (authState) {
        case authStates.authorized:
          return options.requiredAuthState ? (
            <Component {...this.props} />
          ) : (
            <Redirect to={FrontendRoute.HOME_PAGE} />
          );
        case authStates.unauthorized:
          return options.requiredAuthState ? (
            <Redirect
              to={`${FrontendRoute.LOGIN_PAGE + this.redirOnSuccess}`}
            />
          ) : (
            <Component {...this.props} />
          );
        default:
          return <div />;
      }
    }
  };

export default withAuthRedirect;
