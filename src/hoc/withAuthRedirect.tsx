import * as React from "react";
import account from "src/api/account";
import { Redirect } from "react-router-dom";
import { IAccount } from 'src/config/userTypes';
import FrontendRoute from 'src/config/FrontendRoute';

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
        if (!window.localStorage.getItem('data')) {
          const selfInfo: IAccount = (await account.getSelf()).data.data;
          window.localStorage.setItem('data', JSON.stringify(selfInfo));
          const verified = this.verification(selfInfo);
          this.setState({
            authState: (verified) ? authStates.authorized : authStates.unauthorized
          });
        } else {
          let strInfo: string;
          const data = window.localStorage.getItem('data');
          switch (data) {
            case null:
              strInfo = ''
              break;
            default:
              strInfo = data;
              break;
          }
          const selfInfo = JSON.parse(strInfo);
          const verified = this.verification(selfInfo);
          this.setState({
            authState: (verified) ? authStates.authorized : authStates.unauthorized
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
