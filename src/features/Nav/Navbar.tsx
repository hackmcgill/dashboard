// import { Box } from '@rebass/grid';
import * as React from 'react';
import * as CONSTANTS from '../../config/constants';

import { slide as Menu } from 'react-burger-menu';
import { Hacker, Account } from '../../api';
import Martlet from '../../assets/images/mchacks-martlet-tight.svg';
import { FrontendRoute as routes, HackerStatus, UserType } from '../../config';
// import { Image } from '../../shared/Elements';
import {
  isLoggedIn,
  canAccessTravel,
  // getSponsorInfo,
} from '../../util/UserInfoHelperFunctions';
import { isConfirmed } from '../../util/UserInfoHelperFunctions';
import Burger from './Burger';
import Icon from './Icon';
import IconContainer from './IconContainer';
import Links from './Links';
import Nav from './Nav';
import NavLink from './NavLink';

interface INavbarProps {
  activePage: string;
}

interface INavbarState {
  loggedIn: boolean;
  status: HackerStatus;
  confirmed: boolean;
  loaded: boolean;
  showTravelLink: boolean;
  userType: UserType;
  // hasSponsorInfo: boolean;
}

export default class Navbar extends React.Component<
  INavbarProps,
  INavbarState
  > {
  constructor(props: INavbarProps) {
    super(props);
    this.state = {
      loggedIn: false,
      status: HackerStatus.HACKER_STATUS_NONE,
      confirmed: true,
      loaded: false,
      showTravelLink: false,
      userType: UserType.UNKNOWN,
      // hasSponsorInfo: false,
    };
    this.checkLoggedIn();
  }

  public async componentDidMount() {
    let hacker;

    // set hacker status
    try {
      const response = await Hacker.getSelf();
      hacker = response.data.data;
      this.setState({
        status: hacker.status,
        showTravelLink: canAccessTravel(hacker),
      });
    } catch (e) {
      if (e === undefined || e.status === 401) {
        this.setState({
          status: HackerStatus.HACKER_STATUS_NONE,
          showTravelLink: false,
        });
      }
    }
    try {
      const response = await Account.getSelf();
      const account = response.data.data;
      this.setState({
        userType: account.accountType,
      });
    } catch (e) {
      // do nothing
    }

    // try {
    //   const response = await getSponsorInfo();
    //   if (response !== null) {
    //     this.setState({ hasSponsorInfo: true });
    //   }
    // } catch (e) {
    //   // do nothing
    // }

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


    // let sponsorRoute;
    // if (hasSponsorInfo) {
    //   sponsorRoute = routes.EDIT_SPONSOR_PAGE;
    // } else {
    //   sponsorRoute = routes.CREATE_SPONSOR_PAGE;
    // }


    let NavItems = () => <></>;
    NavItems = () => (
      <>
        <NavLink
          href={CONSTANTS.STATIC_SITE}
        >
          About
        </NavLink>
        <NavLink
          href={CONSTANTS.STATIC_SITE}
        >
          Sponsor
        </NavLink>
        <NavLink
          href={CONSTANTS.STATIC_SITE}
        >
          FAQ
        </NavLink>
        <NavLink
          href={CONSTANTS.STATIC_SITE}
        >
          2019
        </NavLink>
      </>
    );

    return this.state.loaded ? (
      <Nav borderThickness={'2px'}>
        <IconContainer>
          <a href={routes.HOME_PAGE}>
            <Icon src={Martlet} />
          </a>
        </IconContainer>
        <Links>
          {NavItems()}
        </Links>
        <Menu isOpen={window.innerWidth > 768} styles={Burger}>
          {NavItems()}
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
