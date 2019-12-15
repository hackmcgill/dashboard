import { Box, Flex } from '@rebass/grid';
import * as React from 'react';

import { slide as Menu } from 'react-burger-menu';
import Martlett from '../../assets/images/mchacks-martlet-tight.svg';
import { FrontendRoute } from '../../config/frontendRoutes';
import { Image } from '../../shared/Elements';
import { isLoggedIn } from '../../util/UserInfoHelperFunctions';
import MobileMenu from '../Sidebar/MobileMenu';
import LogoutBtn from './LogoutButton';
import Nav from './Nav';
// import SidebarItem from '../Sidebar/SidebarItem';
// import theme from '../../shared/Styles/theme';
import LoginBtn from './LoginButton';

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
    const tabs = this.getTabs();
    // need to have burgerBuns instead of logoutBtn now. logout will be inside burger
    // const logoutBtn = this.state.loggedIn ? <LogoutBtn /> : '';
    // const applicationBtn = (
    //   <LinkDuo
    //     to={FrontendRoute.EDIT_APPLICATION_PAGE}
    //     key={'Application'}
    //     style={{
    //       textDecoration: 'none',
    //       overflow: 'scroll',
    //     }}
    //   >
    //     <SidebarItem
    //       currentPage={true}
    //       title={'Application'}
    //       hidden={!this.state.loggedIn}
    //     >
    //       <H2 color={theme.colors.black80}>{'Application'}</H2>
    //     </SidebarItem>
    //   </LinkDuo>
    // );
    return (
      <Nav borderThickness={'1px'}>
        <Flex flexDirection={'row'} justifyContent={'space-between'} p={'1rem'}>
          <Box>
            <a href={FrontendRoute.HOME_PAGE}>
              <Image src={Martlett} padding={'0rem'} />
            </a>
          </Box>
          <Menu isOpen={true} styles={MobileMenu}>
            {tabs[0]}
          </Menu>
        </Flex>
      </Nav>
    );
  }

  private getTabs() {
    const tabs = [];
    if (this.state.loggedIn) {
      tabs.push(<LogoutBtn />);
      // tabs.push(<ApplicationBtn />);
      // tabs.push(<HomeBtn />);
      // tabs.push(<ProfileBtn />);
      // tabs.push(<TravelBtn/>);
      // ^Have to create these buttons! With proper redirects if they have
      // created/confirmed accounts and to created/edit their application, etc.
    } else {
      tabs.push(<LoginBtn />);
    }

    return tabs;
  }

  private checkLoggedIn() {
    isLoggedIn().then((result) => {
      this.setState({
        loggedIn: result,
      });
    });
  }
}
