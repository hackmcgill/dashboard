import * as React from 'react';
import FrontendRoute from 'src/config/FrontendRoute';
import { Image, Nav } from 'src/shared';
import Martlett from 'src/assets/images/mchacks-martlet-tight.svg';
import { isLoggedIn } from 'src/util/UserInfoHelperFunctions';
import LogoutBtn from 'src/components/logoutButton';
import { Flex, Box } from '@rebass/grid';

interface INavbarState {
    loggedIn: boolean
}
interface INavbarProps {
    showDivider?: boolean;
}

export default class Navbar extends React.Component<INavbarProps, INavbarState> {
    constructor(props: INavbarProps) {
        super(props);
        this.state = {
            loggedIn: false
        }
        this.checkLoggedIn();
    }
    public render() {
        const logoutBtn = this.state.loggedIn ? (<LogoutBtn />) : '';
        return (
            <Nav borderThickness={this.props.showDivider ? '1px' : '0px'}>
                <Flex flexDirection={'row'} justifyContent={'space-between'} p={'1rem'} >
                    <Box>
                        <a href={FrontendRoute.HOME_PAGE}>
                            <Image src={Martlett} padding={'0rem'} />
                        </a>
                    </Box>
                    <Box alignSelf={'center'}>
                        {logoutBtn}
                    </Box>
                </Flex>
            </Nav>
        );
    }
    private checkLoggedIn() {
        isLoggedIn().then((result) => {
            this.setState({
                loggedIn: result
            });
        });
    }
}
