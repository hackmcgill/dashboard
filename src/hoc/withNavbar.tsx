import * as React from "react";
import Navbar from 'src/components/Navbar';
import NavbarSisterContainer from 'src/shared/NavbarSisterContainer';

const withNavbar = <P extends {}>(Component: React.ComponentType<P>) =>
    class extends React.Component<P> {
        constructor(props: any) {
            super(props);
        }

        public render() {
            return (
                [
                    <Navbar key={0} />,
                    <NavbarSisterContainer key={1}>
                        <Component {...this.props} />
                    </NavbarSisterContainer>
                ]
            )
        }
    }

export default withNavbar;
