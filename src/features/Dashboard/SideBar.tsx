import * as React from 'react';
import { Image, H2, SideBar, SideBarMenuItem } from '../../shared/Elements';

import AppIcon from '../../assets/images/sidebar-app.svg';
import BusIcon from '../../assets/images/sidebar-bus.svg';
import HomeIcon from '../../assets/images/sidebar-home.svg';
import Profile from '../../assets/images/sidebar-profile.svg';
import Team from '../../assets/images/sidebar-team.svg';

class SideBarComponent extends React.Component<{}, {}> {
  public render() {
    return (
      <SideBar>
        <SideBarMenuItem>
          <Image src={HomeIcon} />
          <H2>Home</H2>
        </SideBarMenuItem>

        <SideBarMenuItem>
          <Image src={Profile} />
          <H2>Profile</H2>
        </SideBarMenuItem>

        <SideBarMenuItem>
          <Image src={AppIcon} />
          <H2>Application</H2>
        </SideBarMenuItem>

        <SideBarMenuItem>
          <Image src={Team} />
          <H2>Team</H2>
        </SideBarMenuItem>

        <SideBarMenuItem>
          <Image src={BusIcon} />
          <H2>Travel</H2>
        </SideBarMenuItem>
      </SideBar>
    );
  }
}

export default SideBarComponent;
