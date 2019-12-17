import * as React from 'react';
import { Account } from '../../api';
import Hacker from '../../api/hacker';
import { HackerStatus, IAccount } from '../../config';
import WithToasterContainer from '../../shared/HOC/withToaster';
import { isConfirmed } from '../../util';
import StatusPage from '../Status/StatusPage';

export interface IDashboardState {
  account: IAccount;
  status: HackerStatus;
  confirmed: boolean;
}

class HackerDashboardContainer extends React.Component<{}, IDashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      account: Object(),
      status: HackerStatus.HACKER_STATUS_NONE,
      confirmed: false,
    };
  }
  public async componentDidMount() {
    let status;
    let confirmed = false;
    let account;

    try {
      const res = await Account.getSelf();
      account = res.data.data;
      this.setState({ account });
    } catch (e) {
      // should not set the account if it doesn't exist.
    }
    // set hacker status and confirmed status
    try {
      const response = await Hacker.getSelf();
      status = response.data.data.status;
      this.setState({ status });
    } catch (e) {
      if (e.status === 401) {
        status = HackerStatus.HACKER_STATUS_NONE;
        this.setState({ status });
      }
    }
    try {
      confirmed = await isConfirmed();
      this.setState({ confirmed });
    } catch (e) {
      this.setState({ confirmed });
    }
  }
  public render() {
    return <StatusPage {...this.state} />;
  }
}

export default WithToasterContainer(HackerDashboardContainer);
