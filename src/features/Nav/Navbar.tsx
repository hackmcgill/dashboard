// import { Box } from '@rebass/grid';
import * as React from 'react';

import Martlet from '../../assets/images/mchacks-martlet-tight.svg';
import { FrontendRoute as routes } from '../../config/frontendRoutes';
// import { Image } from '../../shared/Elements';
import { isLoggedIn } from '../../util/UserInfoHelperFunctions';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
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
    const CTAButton = this.state.loggedIn ? <LogoutButton /> : <LoginButton />;
    return (
      <Nav borderThickness={'2px'}>
        <IconContainer>
          <a href={routes.HOME_PAGE}>
            <Icon src={Martlet} />
          </a>
        </IconContainer>
        <Links>
          <NavLink href={routes.HOME_PAGE}>Home</NavLink>
          <NavLink href={routes.EDIT_ACCOUNT_PAGE}>Profile</NavLink>
          <NavLink href={routes.EDIT_APPLICATION_PAGE}>Application</NavLink>
          {CTAButton}
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
