import * as React from 'react';
import AppIcon from '../../assets/images/sidebar-app.svg';
import HomeIcon from '../../assets/images/sidebar-home.svg';
import ProfileIcon from '../../assets/images/sidebar-profile.svg';
import TeamIcon from '../../assets/images/sidebar-team.svg';
import { FrontendRoute as routes, HackerStatus } from '../../config';
import { H2, Image, LinkDuo } from '../../shared/Elements';
import SidebarContainer from './SidebarContainer';
import SidebarItem from './SidebarItem';
import theme from '../../shared/Styles/theme';
// import BusIcon from '../../assets/images/sidebar-bus.svg';
// import { PageType } from '../../config';

interface ISidebarProps {
  currentPage: string;
  confirmed: boolean;
  status: HackerStatus;
  created?: boolean;
}

export const Sidebar: React.SFC<ISidebarProps> = (props) => {
  Sidebar.defaultProps = {
    created: true,
  };
  // add 'Team'
  const TabItems: string[] = ['Home', 'Profile', 'Application'];
  const appRoute =
    props.status === HackerStatus.HACKER_STATUS_NONE && props.confirmed
      ? routes.CREATE_APPLICATION_PAGE
      : routes.EDIT_APPLICATION_PAGE;
  const route: any[] = [
    routes.HOME_PAGE,
    routes.EDIT_ACCOUNT_PAGE,
    appRoute,
    routes.TEAM_PAGE,
  ];

  const PageTypeObj: any[] = [HomeIcon, ProfileIcon, AppIcon, TeamIcon];

  const whiteIcon = {
    filter:
      'invert(97%) sepia(100%) saturate(12%) hue-rotate(248deg) contrast(104%) brightness(100) saturate(100%)',
  };

  function hiddenTab(name: string): boolean {
    switch (name) {
      case 'Home':
        return !props.created;
      case 'Profile':
        return false;
      case 'Application':
        return !props.confirmed;
      case 'Team':
        return !(
          props.confirmed &&
          (props.status === HackerStatus.HACKER_STATUS_CONFIRMED ||
            props.status === HackerStatus.HACKER_STATUS_ACCEPTED ||
            props.status === HackerStatus.HACKER_STATUS_CHECKED_IN)
        );
      default:
        return true;
    }
  }

  return (
    <SidebarContainer>
      {TabItems.map((name, index) =>
        hiddenTab(name) ? (
          undefined
        ) : (
          <LinkDuo
            to={route[index]}
            key={name}
            style={{ textDecoration: 'none' }}
          >
            <SidebarItem
              currentPage={props.currentPage === name ? true : false}
              title={name}
              hidden={hiddenTab(name)}
            >
              <Image
                src={PageTypeObj[index]}
                style={props.currentPage === name ? whiteIcon : undefined}
              />
              <H2
                color={
                  props.currentPage === name
                    ? theme.colors.white
                    : theme.colors.black80
                }
              >
                {name}
              </H2>
            </SidebarItem>
          </LinkDuo>
        )
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
