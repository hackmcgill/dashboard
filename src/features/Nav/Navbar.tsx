import { Box, Flex } from '@rebass/grid';
import * as React from 'react';

import Martlett from '../../assets/images/mchacks-martlet-tight.svg';
import { FrontendRoute } from '../../config/frontendRoutes';
import { Image } from '../../shared/Elements';
import { isLoggedIn } from '../../util/UserInfoHelperFunctions';
import LogoutBtn from './LogoutButton';
import Nav from './Nav';

interface INavbarState {
  loggedIn: boolean;
}

export default class Navbar extends React.Component<{}, INavbarState> {
  constructor(props: INavbarState) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.checkLoggedIn();
  }
  public render() {
    const logoutBtn = this.state.loggedIn ? <LogoutBtn /> : '';
    return (
      <Nav borderThickness={'1px'}>
        <Flex flexDirection={'row'} justifyContent={'space-between'} p={'1rem'}>
          <Box>
            <a href={FrontendRoute.HOME_PAGE}>
              <Image src={Martlett} padding={'0rem'} />
            </a>
          </Box>
          <Box alignSelf={'center'}>{logoutBtn}</Box>
        </Flex>
      </Nav>
    );
  }
  private checkLoggedIn() {
    isLoggedIn().then((result) => {
      this.setState({
        loggedIn: result,
      });
    });
  }
}
