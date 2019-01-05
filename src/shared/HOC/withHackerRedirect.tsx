import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { FrontendRoute, IHacker } from '../../config';
import { getHackerInfo } from '../../util/UserInfoHelperFunctions';

enum authStates {
  authorized,
  unauthorized,
  undefined,
}

export interface IHackerDirectOptions {
  // True, if user must be a hacker, or False if user must not be hacker
  requiredAuthState?: boolean;
  // Function that is called when user is a hacker. This is used for further state verifications
  AuthVerification?: (hacker: IHacker) => boolean;
  // True, if user should be redirected to original component if the user failed authentication.
  redirAfterLogin?: boolean;
}

const defaultOptions = {
  requiredAuthState: true,
  AuthVerification: (hacker: IHacker) => true,
  redirOnSuccess: false,
};

const withHackerRedirect = <P extends {}>(
  Component: React.ComponentType<P>,
  options: IHackerDirectOptions = defaultOptions
) =>
  class extends React.Component<P, { authState: authStates }> {
    private verification: (hacker: IHacker) => boolean;

    constructor(props: any) {
      super(props);
      this.state = {
        authState: authStates.undefined,
      };
      this.verification =
        options.AuthVerification || defaultOptions.AuthVerification;
      options.requiredAuthState =
        options.requiredAuthState !== undefined
          ? options.requiredAuthState
          : defaultOptions.requiredAuthState;
    }

    public async componentDidMount() {
      const selfInfo = await getHackerInfo();
      if (selfInfo) {
        const verified = this.verification(selfInfo);
        this.setState({
          authState: verified ? authStates.authorized : authStates.unauthorized,
        });
      } else {
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
            <Redirect to={FrontendRoute.HOME_PAGE} />
          ) : (
            <Component {...this.props} />
          );
        default:
          return <div />;
      }
    }
  };

export default withHackerRedirect;
