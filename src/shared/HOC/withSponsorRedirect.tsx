import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { FrontendRoute, ISponsor } from '../../config';
import { getSponsorInfo } from '../../util/UserInfoHelperFunctions';

enum authStates {
  authorized,
  unauthorized,
  undefined,
}

export interface ISponsorDirectOptions {
  // True, if user must be a sponsor, or False if user must not be sponsor
  requiredAuthState?: boolean;
  // Function that is called when user is a sponsor. This is used for further state verifications
  AuthVerification?: (hacker: ISponsor) => boolean;
}

const defaultOptions = {
  requiredAuthState: true,
  AuthVerification: (sponsor: ISponsor) => true,
  redirOnSuccess: false,
};

const withSponsorRedirect = <P extends {}>(
  Component: React.ComponentType<P>,
  options: ISponsorDirectOptions = defaultOptions
) =>
  class extends React.Component<P, { authState: authStates }> {
    private verification: (sponsor: ISponsor) => boolean;

    constructor(props: P) {
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
      const selfInfo = await getSponsorInfo();
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

export default withSponsorRedirect;
