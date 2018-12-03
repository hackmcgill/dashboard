import * as React from "react";
import { ToastContainer } from 'react-toastify';
import { CSSProperties } from 'react';

const WithToasterContainer = <P extends {}>(Component: React.ComponentType<P>) =>
    class extends React.Component<P> {
        constructor(props: any) {
            super(props);
        }

        public render() {
            const containerProperty: CSSProperties = {
                height: '0px'
            }
            return (
                [
                    <Component key={0} {...this.props} />,
                    <div style={containerProperty} key={1}><ToastContainer /></div>
                ]
            )
        }
    }

export default WithToasterContainer;
