// import { Box } from '@rebass/grid';
import * as React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Account, Hacker, Settings } from '../../api';
import Martlet from '../../assets/images/mchacks-martlet-tight.svg';
import {
  defaultSettings,
  FrontendRoute as routes,
  HackerStatus,
  ISetting,
  UserType,
} from '../../config';
// import { Image } from '../../shared/Elements';
import {
  canAccessApplication,
  canAccessTeam,
  canAccessTravel,
  isLoggedIn,
  // getSponsorInfo,
} from '../../util/UserInfoHelperFunctions';
import SocialMediaBar from '../../features/Sponsor/SocialMediaBar';
import Burger from './Burger';
import Icon from './Icon';
import IconContainer from './IconContainer';
import Links from './Links';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
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
  showTeamLink: boolean;
  showTravelLink: boolean;
  userType: UserType;
  settings: ISetting;
  hasBorder: boolean;
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
      showTeamLink: false,
      showTravelLink: false,
      userType: UserType.UNKNOWN,
      settings: defaultSettings,
      // hasSponsorInfo: false,
      hasBorder: false,
    };
    this.checkLoggedIn();
  }

  public calculateScrollDistance = (): void => {
    this.setState({ hasBorder: window.pageYOffset !== 0 });
  };

  public async componentWillUnmount() {
    document.removeEventListener('scroll', () => {
      requestAnimationFrame(() => {
        this.calculateScrollDistance();
      });
    });
  }

  public async componentDidMount() {
    document.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        this.calculateScrollDistance();
      });
    });

    try {
      const response = await Settings.get();
      const settings = response.data.data;
      this.setState({ settings });
    } catch (e) {
      // do nothing
    }

    let hacker;
    // set hacker status
    try {
      const response = await Hacker.getSelf();
      hacker = response.data.data;
      this.setState({
        status: hacker.status,
        showTeamLink: canAccessTeam(hacker),
        showTravelLink:
          canAccessTravel(hacker) && !this.state.settings.IS_REMOTE,
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
      const confirmed = true; //await isConfirmed();
      this.setState({ confirmed });
    } catch (e) {
      this.setState({ confirmed: false });
    }
    this.setState({ loaded: true });
  }

  public render() {
    const {
      loggedIn,
      status,
      confirmed,
      userType,
      settings,
      // hasSponsorInfo,
    } = this.state;

    const CTAButton = loggedIn ? <LogoutButton /> : <LoginButton />;

    let appRoute = routes.EDIT_APPLICATION_PAGE;
    if (status === HackerStatus.HACKER_STATUS_NONE && confirmed) {
      appRoute = routes.CREATE_APPLICATION_PAGE;
    }
    // let sponsorRoute;
    // if (hasSponsorInfo) {
    //   sponsorRoute = routes.EDIT_SPONSOR_PAGE;
    // } else {
    //   sponsorRoute = routes.CREATE_SPONSOR_PAGE;
    // }

    let NavItems = () => <></>;
    if (loggedIn === true) {
      NavItems = () => (
        <>
          <NavLink
            href={routes.HOME_PAGE}
            className={this.props.activePage === 'home' ? 'active' : ''}
          >
            Home
          </NavLink>
          <NavLink
            href={routes.EDIT_ACCOUNT_PAGE}
            className={this.props.activePage === 'profile' ? 'active' : ''}
          >
            Profile
          </NavLink>
          {userType === UserType.HACKER &&
          canAccessApplication({ status }, settings) ? (
            <NavLink
              href={appRoute}
              className={
                this.props.activePage === 'application' ? 'active' : ''
              }
            >
              Application
            </NavLink>
          ) : null}
          {this.state.showTeamLink ? (
            <NavLink
              href={routes.TEAM_PAGE}
              className={this.props.activePage === 'team' ? 'active' : ''}
            >
              Team
            </NavLink>
          ) : null}
          {this.state.showTravelLink ? (
            <NavLink
              href={routes.TRAVEL_PAGE}
              className={this.props.activePage === 'travel' ? 'active' : ''}
            >
              Travel
            </NavLink>
          ) : null}
          {userType === UserType.SPONSOR_T1 ||
          userType === UserType.SPONSOR_T2 ||
          userType === UserType.SPONSOR_T3 ||
          userType === UserType.SPONSOR_T4 ||
          userType === UserType.SPONSOR_T5 ? (
            <>
              <NavLink
                href={routes.SPONSOR_SEARCH_PAGE}
                className={this.props.activePage === 'search' ? 'active' : ''}
              >
                Search
              </NavLink>
              <NavLink
                href={routes.SPONSOR_ONBOARDING_PAGE}
                className={
                  this.props.activePage === 'onboarding' ? 'active' : ''
                }
              >
                Onboarding
              </NavLink>
              {/* <NavLink href={'https://mchacks.ca/sponsor-info'} className={''}>
                  Info
              </NavLink> */}
            </>
          ) : null}
          {userType === UserType.STAFF ? (
            <>
              <NavLink
                href={routes.ADMIN_SEARCH_PAGE}
                className={this.props.activePage === 'search' ? 'active' : ''}
              >
                Search
              </NavLink>
              <NavLink
                href={routes.INVITE_PAGE}
                className={this.props.activePage === 'invite' ? 'active' : ''}
              >
                Invite
              </NavLink>
              <NavLink
                href={routes.SETTINGS_PAGE}
                className={this.props.activePage === 'settings' ? 'active' : ''}
              >
                Settings
              </NavLink>
            </>
          ) : (
            <div />
          )}
        </>
      );
    }

    return this.state.loaded ? (
      <Nav hasBorder={this.state.hasBorder}>
        <IconContainer>
          <a href={routes.HOME_PAGE}>
            <Icon src={Martlet} />
          </a>
        </IconContainer>
        <Links>
          {loggedIn && confirmed && NavItems()}
          {(!loggedIn || !confirmed) && <SocialMediaBar />}
          {CTAButton}
        </Links>
        <Menu isOpen={true} styles={Burger}>
          {loggedIn && confirmed && NavItems()}
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
