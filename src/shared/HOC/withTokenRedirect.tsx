import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { FrontendRoute, getTokenFromQuery } from '../../config';

enum authStates {
  authorized,
  unauthorized,
  undefined,
}

const withTokenRedirect = <P extends {}>(Component: React.ComponentType<P>) =>
  class extends React.Component<P, { authState: authStates }> {
    constructor(props: any) {
      super(props);
      this.state = {
        authState: authStates.undefined,
      };
    }

    public async componentDidMount() {
      try {
        getTokenFromQuery();
        this.setState({
          authState: authStates.authorized,
        });
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
          return <Component {...this.props} />;
        case authStates.unauthorized:
          return <Redirect to={FrontendRoute.HOME_PAGE} />;
        default:
          return <div />;
      }
    }
  };

export default withTokenRedirect;
