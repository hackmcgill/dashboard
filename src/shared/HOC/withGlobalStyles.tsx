import * as React from 'react';
// import theme from '../Styles/theme';

const withGlobalStyles = <P extends {}>(Component: React.ComponentType<P>) =>
    class extends React.Component<P> {
        public render() {
            return (
                <>
                    <Component {...this.props} />

                    <style jsx global>{`
                        .background-image {
                            position: absolute;
                            z-index: -1000;
                            user-select: none;
                            width: auto;
                            height: auto;
                        }
                    `}</style>
                </>
            );
        }
    };

export default withGlobalStyles;
