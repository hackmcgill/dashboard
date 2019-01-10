import * as React from 'react';
import { Redirect } from 'react-router';
import { UserType } from '../config';
import { H1 } from '../shared/Elements';
import { getUserInfo } from '../util';
import HackerDashboardContainer from './HackerDashboard';
import StaffDashboardContainer from './StaffDashboard';
import SponsorDashboard from './SponsorDashboard';

interface IDashboardState {
  accountType: UserType;
  loading: boolean;
}

class Dashboard extends React.Component<{}, IDashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      accountType: UserType.UNKNOWN,
      loading: true,
    };
  }
  public async componentDidMount() {
    try {
      const userInfo = await getUserInfo();
      if (userInfo) {
        this.setState({
          accountType: userInfo.accountType,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }
  public render() {
    switch (this.state.accountType) {
      case UserType.HACKER:
        return <HackerDashboardContainer />;
      case UserType.STAFF:
        return <StaffDashboardContainer />;
      case UserType.SPONSOR_T1:
        return <SponsorDashboard />;
      case UserType.SPONSOR_T2:
        return <SponsorDashboard />;
      case UserType.SPONSOR_T3:
        return <SponsorDashboard />;
      case UserType.SPONSOR_T4:
        return <SponsorDashboard />;
      case UserType.SPONSOR_T5:
        return <SponsorDashboard />;
    }
    if (this.state.loading) {
      return <H1>Loading...</H1>;
    }
    return <Redirect to={'/404'} />;
  }
}

export default Dashboard;
