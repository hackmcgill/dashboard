import React from 'react';

import { HackerStatus, IAccount, ISetting } from '../../config';
import ConfirmationEmailSentComponent from '../Account/ConfirmationEmailSentComponent';

import { Hacker, Settings } from '../../api';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import StatusCTA from './StatusCTA';
import { Flex } from '@rebass/grid';

export interface IStatusCTAContainerProps {
  account?: IAccount;
  status: HackerStatus;
  confirmed: boolean;
}

export interface IStatusCTAContainerState {
  status: HackerStatus;
  settings: ISetting;
}

class StatusCTAContainer extends React.Component<IStatusCTAContainerProps, IStatusCTAContainerState> {
  constructor(props: IStatusCTAContainerProps) {
    super(props);
    this.state = {
      status: this.props.status,
      settings: {
        openTime: new Date().toString(),
        closeTime: new Date().toString(),
        confirmTime: new Date().toString(),
        isRemote: false,
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
      <Flex flex={1} flexDirection="column" justifyContent="center" alignItems="center" p="6px 30px 96px 30px">
        {this.props.confirmed && this.props.account ? (
          <StatusCTA
            status={this.state.status}
            firstName={this.props.account.firstName}
            settings={this.state.settings}
            onClickConfirm={this.confirmStatus}
            onClickWithdraw={this.withdrawStatus}
          />
        ) : (
            <ConfirmationEmailSentComponent />
          )}
      </Flex>
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

export default StatusCTAContainer;
