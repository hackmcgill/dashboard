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


const withAuthRedirect = <P extends {}>(Component: React.ComponentType<P>, requiredAuthState: boolean = true, AuthVerification?: (acct: IAccount) => boolean) =>
  class extends React.Component<P, { authState: authStates }> {
    private verification: (acct: IAccount) => boolean;
    constructor(props: any) {
      super(props);
      this.state = {
        authState: authStates.undefined
      };
      this.verification = (AuthVerification) ? AuthVerification : (acct: IAccount) => true;
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
      switch (authState) {
        case authStates.authorized:
          return requiredAuthState ? <Component {...this.props} /> : (<Redirect to="/" />);
        case authStates.unauthorized:
          return requiredAuthState ? (<Redirect to={FrontendRoute.LOGIN_PAGE} />) : <Component {...this.props} />;
        default:
          return <div />;
      }
    }
  }

export default withAuthRedirect;
