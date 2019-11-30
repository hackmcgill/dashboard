import * as React from 'react';
import { H2, Image } from '../../shared/Elements';
import SidebarContainer from './SidebarContainer';
import SidebarItem from './SidebarItem';

import AppIcon from '../../assets/images/sidebar-app.svg';
import HomeIcon from '../../assets/images/sidebar-home.svg';
import ProfileIcon from '../../assets/images/sidebar-profile.svg';
import { PageType } from '../../config';

interface ISidebarProps {
  currentPage: PageType;
}

export const Sidebar: React.SFC<ISidebarProps> = (props) => {
  const PageTypeObj: any = {
    Home: HomeIcon,
    Profile: ProfileIcon,
    Application: AppIcon,
  };

  const whiteIcon = {
    filter:
      'invert(97%) sepia(100%) saturate(12%) hue-rotate(248deg) contrast(104%) brightness(100) saturate(100%)',
  };

  return (
    <SidebarContainer>
      {Object.keys(PageTypeObj).map((type) => (
        <SidebarItem currentPage={props.currentPage === type ? true : false}>
          <Image
            src={PageTypeObj[type]}
            style={props.currentPage === type ? whiteIcon : undefined}
          />
          <H2 color={props.currentPage === type ? 'white' : '#4d4d4d'}>
            {type}
          </H2>
        </SidebarItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
