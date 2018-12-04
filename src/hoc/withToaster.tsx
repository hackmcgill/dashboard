import * as React from "react";
import { ToastContainer } from 'react-toastify';
import { Box } from '@rebass/grid';

const WithToasterContainer = <P extends {}>(Component: React.ComponentType<P>) =>
    class extends React.Component<P> {
        constructor(props: any) {
            super(props);
        }

        public render() {
            return (
                <Box mt={'50px'}>
                    <Component {...this.props} />,
                    <ToastContainer />
                </Box>
            )
        }
    }

export default WithToasterContainer;
