// import { Box } from '@rebass/grid';
import * as React from 'react';

import Martlet from '../../assets/images/mchacks-martlet-tight.svg';
import { FrontendRoute } from '../../config/frontendRoutes';
// import { Image } from '../../shared/Elements';
import { isLoggedIn } from '../../util/UserInfoHelperFunctions';
import LogoutBtn from './LogoutButton';
import Nav from './Nav';
import NavLink from './NavLink';

import Icon from './Icon';
import IconContainer from './IconContainer';
import Links from './Links';

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
      <Nav borderThickness={'2px'}>
        <IconContainer>
          <a href={FrontendRoute.HOME_PAGE}>
            <Icon src={Martlet} />
          </a>
        </IconContainer>
        <Links>
          <NavLink href={FrontendRoute.HOME_PAGE}>Home</NavLink>
          <NavLink href={FrontendRoute.EDIT_ACCOUNT_PAGE}>Profile</NavLink>
          {logoutBtn}
        </Links>
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
