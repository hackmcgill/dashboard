import * as React from 'react';
import { Image, H2, SideBar, SideBarMenuItem } from '../../shared/Elements';

import AppIcon from '../../assets/images/sidebar-app.svg';
import BusIcon from '../../assets/images/sidebar-bus.svg';
import HomeIcon from '../../assets/images/sidebar-home.svg';
import ProfileIcon from '../../assets/images/sidebar-profile.svg';
import TeamIcon from '../../assets/images/sidebar-team.svg';
import { PageType } from '../../config';

interface ISideBarProps {
  currentPage: PageType;
}

export const SideBarComponent: React.SFC<ISideBarProps> = (props) => {
  const PageTypeObj: any = {
    Home: HomeIcon,
    Profile: ProfileIcon,
    Application: AppIcon,
    Team: TeamIcon,
    Travel: BusIcon,
  };

  const whiteIcon = {
    filter:
      'invert(97%) sepia(100%) saturate(12%) hue-rotate(248deg) contrast(104%) brightness(100) saturate(100%)',
  };

  return (
    <SideBar>
      {Object.keys(PageTypeObj).map((type) => (
        <SideBarMenuItem
          currentPage={props.currentPage === type ? true : false}
        >
          <Image
            src={PageTypeObj[type]}
            style={props.currentPage === type ? whiteIcon : undefined}
          />
          <H2 color={props.currentPage === type ? 'white' : '#4d4d4d'}>
            {type}
          </H2>
        </SideBarMenuItem>
      ))}
    </SideBar>
  );
};

export default SideBarComponent;
