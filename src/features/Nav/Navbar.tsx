// import { Box } from '@rebass/grid';
import * as React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Hacker } from '../../api';
import Martlet from '../../assets/images/mchacks-martlet-tight.svg';
import { FrontendRoute as routes, HackerStatus } from '../../config';
// import { Image } from '../../shared/Elements';
import { isLoggedIn } from '../../util/UserInfoHelperFunctions';
import { isConfirmed } from '../../util/UserInfoHelperFunctions';
import Burger from './Burger';
import Icon from './Icon';
import IconContainer from './IconContainer';
import Links from './Links';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Nav from './Nav';
import NavLink from './NavLink';

interface INavbarState {
  loggedIn: boolean;
  status: HackerStatus;
  confirmed: boolean;
  loaded: boolean;
}

export default class Navbar extends React.Component<{}, INavbarState> {
  constructor(props: INavbarState) {
    super(props);
    this.state = {
      loggedIn: false,
      status: HackerStatus.HACKER_STATUS_NONE,
      confirmed: true,
      loaded: false,
    };
    this.checkLoggedIn();
  }

  public async componentDidMount() {
    let hacker;

    // set hacker status
    try {
      const response = await Hacker.getSelf();
      hacker = response.data.data;
      this.setState({ status: hacker.status });
    } catch (e) {
      if (e.status === 401) {
        this.setState({ status: HackerStatus.HACKER_STATUS_NONE });
      }
    }

    // set confirmed account
    try {
      const confirmed = await isConfirmed();
      this.setState({ confirmed });
    } catch (e) {
      this.setState({ confirmed: false });
    }
    this.setState({ loaded: true });
  }

  public render() {
    const { loggedIn, status, confirmed } = this.state;

    const CTAButton = loggedIn ? <LogoutButton /> : <LoginButton />;

    let appRoute;
    if (status === HackerStatus.HACKER_STATUS_NONE && confirmed) {
      appRoute = routes.CREATE_APPLICATION_PAGE;
    } else {
      appRoute = routes.EDIT_APPLICATION_PAGE;
    }

    const route: any[] = [routes.HOME_PAGE, routes.EDIT_ACCOUNT_PAGE, appRoute];

    let NavItems = () => <></>;
    if (loggedIn === true) {
      NavItems = () => (
        <>
          <NavLink href={route[0]}>Home</NavLink>
          <NavLink href={route[1]}>Profile</NavLink>
          <NavLink href={route[2]}>Application</NavLink>
        </>
      );
    }

    return this.state.loaded ? (
      <Nav borderThickness={'2px'}>
        <IconContainer>
          <a href={routes.HOME_PAGE}>
            <Icon src={Martlet} />
          </a>
        </IconContainer>
        <Links>
          {NavItems()}
          {CTAButton}
        </Links>
        <Menu isOpen={window.innerWidth > 768} styles={Burger}>
          {NavItems()}
          {CTAButton}
        </Menu>
      </Nav>
    ) : null;
  }
  private checkLoggedIn() {
    isLoggedIn().then((result) => {
      this.setState({
        loggedIn: result,
      });
    });
  }
}
