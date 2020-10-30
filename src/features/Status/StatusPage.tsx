import React from 'react';

import { H1 } from '../../shared/Elements';

import { HackerStatus, IAccount, ISetting } from '../../config';
import theme from '../../shared/Styles/theme';
import ConfirmationEmailSentComponent from '../Account/ConfirmationEmailSentComponent';

import { Hacker, Settings } from '../../api';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import StatusHeader from './StatusHeader';

export interface IStatusPageProps {
  account?: IAccount;
  status: HackerStatus;
  confirmed: boolean;
}

export interface IStatusPageState {
  status: HackerStatus;
  settings: ISetting;
}

class StatusPage extends React.Component<IStatusPageProps, IStatusPageState> {
  constructor(props: IStatusPageProps) {
    super(props);
    this.state = {
      status: this.props.status,
      settings: {
        openTime: new Date().toString(),
        closeTime: new Date().toString(),
        confirmTime: new Date().toString(),
      },
    };
  }
  public confirmStatus = async (e: any) => {
    if (this.props.account) {
      const hacker = (await Hacker.getByEmail(this.props.account.email)).data
        .data;
      if (hacker) {
        await Hacker.confirm(hacker.id, true);
        this.setState({ status: HackerStatus.HACKER_STATUS_CONFIRMED });
      }
    }
  };

  public withdrawStatus = async (e: any) => {
    if (this.props.account) {
      const hacker = (await Hacker.getByEmail(this.props.account.email)).data
        .data;
      if (hacker) {
        await Hacker.confirm(hacker.id, false);
        this.setState({ status: HackerStatus.HACKER_STATUS_WITHDRAWN });
      }
    }
  };

  public render() {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '6px 30px 96px 30px' }}>
        {this.props.confirmed && this.props.account ? (
          <div>
            <H1
              color={theme.colors.red}
              display={'absolute'}
              textAlign={'center'}
              marginLeft={'0'}
            >
              Hey {this.props.account.firstName},
            </H1>
            <StatusHeader
              status={this.state.status}
              settings={this.state.settings}
              onClickConfirm={this.confirmStatus}
              onClickWithdraw={this.withdrawStatus}
            />
          </div>
        ) : (
            <ConfirmationEmailSentComponent />
          )}
      </div>
    );
  }

  public async componentDidMount() {
    await this.getSettings();
  }

  private async getSettings() {
    try {
      const result = await Settings.get();
      const settings = result.data.data;
      this.setState({ settings });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e);
      }
    }
  }
}

export default StatusPage;
