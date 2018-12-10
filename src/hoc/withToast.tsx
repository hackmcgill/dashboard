import * as React from "react";
import { ToastContainer } from 'react-toastify';

const withToast = <P extends {}>(Component: React.ComponentType<P>) =>
    class extends React.Component<P> {
        constructor(props: any) {
            super(props);
        }

        public render() {
            return (
                <div>
                    <Component {...this.props} />,
                    <ToastContainer
                        toastClassName='toast-notification'
                    />
                </div>
            )
        }
    }

export default withToast;
