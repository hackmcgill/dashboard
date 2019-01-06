import * as React from 'react';

import { FrontendRoute as routes, HackerStatus } from '../config';

import { Hacker } from '../api';
import WithToasterContainer from '../shared/HOC/withToaster';
import { isConfirmed } from '../util/UserInfoHelperFunctions';
import DashboardView, { IDashboardCard } from './View';

import AccountIcon from '../assets/images/dashboard-account.svg';

export interface IDashboardState {
  status: HackerStatus;
  confirmed: boolean;
}

/**
 * Container that renders form to log in.
 */
class HackerDashboardContainer extends React.Component<{}, IDashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      status: HackerStatus.HACKER_STATUS_NONE,
      confirmed: true,
    };
  }

  public async componentDidMount() {
    try {
      const response = await Hacker.getSelf();
      this.setState({ status: response.data.data.status });
    } catch (e) {
      if (e.status === 401) {
        this.setState({ status: HackerStatus.HACKER_STATUS_NONE });
      }
    }
    try {
      const confirmed = await isConfirmed();
      this.setState({ confirmed });
    } catch (e) {
      this.setState({ confirmed: false });
    }
  }

  public render() {
    const { status, confirmed } = this.state;
    return (
      <DashboardView
        cards={this.generateCards(status, confirmed)}
        title={`status: ${status.toLowerCase()}`}
      />
    );
  }

  private generateCards(status: HackerStatus, confirmed: boolean) {
    const cards: IDashboardCard[] = [
      {
        title: 'Account',
        route: routes.EDIT_ACCOUNT_PAGE,
        imageSrc: AccountIcon,
      },
    ];

    return cards;
  }
}
export default WithToasterContainer(HackerDashboardContainer);
