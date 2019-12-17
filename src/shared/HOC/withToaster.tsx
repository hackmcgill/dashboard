import * as React from 'react';
import { ToastContainer } from 'react-toastify';

const WithToaster = <P extends {}>(Component: React.ComponentType<P>) =>
  class extends React.Component<P> {
    public render() {
      return (
        <React.Fragment>
          <Component {...this.props} />
          <ToastContainer toastClassName="toast-notification" />
        </React.Fragment>
      );
    }
  };

export default WithToaster;
