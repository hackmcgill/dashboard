import * as React from 'react';

import { FrontendRoute as routes, UserType, ISponsor } from '../config';

import WithToasterContainer from '../shared/HOC/withToaster';
import DashboardView, { IDashboardCard } from './View';

import AccountIcon from '../assets/images/dashboard-account.svg';
import SponsorIcon from '../assets/images/dashboard-sponsor.svg';
import { getSponsorInfo } from '../util/UserInfoHelperFunctions';
import SearchIcon from '../assets/images/dashboard-search.svg';

interface ISponsorDashboardProps {
  userType: UserType;
}

interface ISponsorDashboardState {
  hasSponsor: boolean;
}

class SponsorDashboard extends React.Component<
  ISponsorDashboardProps,
  ISponsorDashboardState
> {
  constructor(props: ISponsorDashboardProps) {
    super(props);
    this.state = {
      hasSponsor: false,
    };
  }

  public async componentDidMount() {
    const sponsorResponse = await getSponsorInfo();
    if (sponsorResponse !== null) {
      this.setState({ hasSponsor: true });
    }
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
      {
        title: 'Sponsor Profile',
        route: this.state.hasSponsor
          ? routes.EDIT_SPONSOR_PAGE
          : routes.CREATE_SPONSOR_PAGE,
        imageSrc: SponsorIcon,
      },
    ];
    return cards;
  }
}
export default WithToasterContainer(SponsorDashboard);
