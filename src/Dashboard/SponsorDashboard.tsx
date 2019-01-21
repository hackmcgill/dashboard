import * as React from 'react';

import { FrontendRoute as routes, UserType } from '../config';

import WithToasterContainer from '../shared/HOC/withToaster';
import DashboardView, { IDashboardCard } from './View';

import AccountIcon from '../assets/images/dashboard-account.svg';
import SearchIcon from '../assets/images/dashboard-searc.svg';

interface ISponsorDashboardProps {
  userType: UserType;
}

class SponsorDashboard extends React.Component<ISponsorDashboardProps, {}> {
  constructor(props: ISponsorDashboardProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <DashboardView
        cards={this.generateCards()}
        title={`${this.props.userType} Dashboard`}
      />
    );
  }

  private generateCards() {
    const cards: IDashboardCard[] = [
      {
        title: 'Search',
        route: routes.SPONSOR_SEARCH_PAGE,
        imageSrc: SearchIcon,
      },
      {
        title: 'Account',
        route: routes.EDIT_ACCOUNT_PAGE,
        imageSrc: AccountIcon,
      },
    ];
    return cards;
  }
}
export default WithToasterContainer(SponsorDashboard);
