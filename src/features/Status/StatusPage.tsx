import * as React from 'react';
import Helmet from 'react-helmet';

import { Box, Flex } from '@rebass/grid';
import { BackgroundImage, H1 } from '../../shared/Elements';

import { HACKATHON_NAME, HackerStatus, IAccount, ISetting } from '../../config';
import theme from '../../shared/Styles/theme';
import ConfirmationEmailSentComponent from '../Account/ConfirmationEmailSentComponent';

import { Hacker, Settings } from '../../api';
import Background from '../../assets/images/statuspage-background.svg';
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
      <Flex flexDirection={'column'} alignItems={'center'}>
        <Helmet>
          <title>Home | {HACKATHON_NAME}</title>
        </Helmet>
        <Box style={{ marginTop: '6rem' }}>
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
              <BackgroundImage
                right={'0px'}
                bottom={'0px'}
                src={Background}
                imgHeight={'87%'}
              />
            </div>
          ) : (
              <ConfirmationEmailSentComponent />
            )}
        </Box>
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

export default StatusPage;
