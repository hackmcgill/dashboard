import * as React from "react";
import account from "src/api/account";
import { AxiosResponse } from "axios";
import { Redirect } from "react-router-dom";

enum authStates {
  authorized,
  unauthorized,
  undefined
}

const withAuthRedirect = <P extends {}>(Component: React.ComponentType<P>, requiresAuth:boolean = true) =>
  class extends React.Component<P, { authState: authStates }> {
    constructor(props: any) {
      super(props);
      this.state = {
        authState: authStates.undefined
      };
    }
  
    public async componentDidMount() {
      try {
        if (!window.localStorage.getItem('data')) {
          const selfInfo: AxiosResponse<any> = (await account.getSelf()).data.data;
          window.localStorage.setItem('data', JSON.stringify(selfInfo));
        } else {
          this.setState({
            authState: authStates.authorized
          });
        }
      } catch(e) {
        this.setState({
          authState: authStates.unauthorized
        });
      }
    }
  
    public render() {
      const { authState } = this.state;
      switch(authState) {
        case authStates.authorized:
          return requiresAuth ? <Component {...this.props} /> : (<Redirect to="/"/>);
        case authStates.unauthorized:
          return requiresAuth ? (<Redirect to="/login/"/>) : <Component {...this.props} />;
        default:
          return <div/>;
      }
    }
  }

export default withAuthRedirect;
