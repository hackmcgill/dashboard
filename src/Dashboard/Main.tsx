import * as React from 'react';
import { Redirect } from 'react-router';
import { UserType } from '../config';
import { H1 } from '../shared/Elements';
import { getUserInfo } from '../util';
import HackerDashboardContainer from './HackerDashboard';
import StaffDashboardContainer from './StaffDashboard';

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
      this.setState({
        loading: false,
      });
    } catch (e) {
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
    }
    if (this.state.loading) {
      return <H1>Loading...</H1>;
    }
    return <Redirect to={'/404'} />;
  }
}

export default Dashboard;
