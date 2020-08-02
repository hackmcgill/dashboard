import * as React from 'react';
import Helmet from 'react-helmet';

import { Box, Flex } from '@rebass/grid';
import * as CONSTANTS from '../../config/constants';
import {
  BackgroundImage,
  Button,
  H1,
  LinkDuo,
  Paragraph,
} from '../../shared/Elements';

import {
  FrontendRoute,
  HACKATHON_NAME,
  HackerStatus,
  IAccount,
  ISetting,
} from '../../config';
import theme from '../../shared/Styles/theme';
import ConfirmationEmailSentComponent from '../Account/ConfirmationEmailSentComponent';

import { Hacker, Settings } from '../../api';
import Background from '../../assets/images/statuspage-background.svg';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import { date2human } from '../../util';

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
              {this.state.status === HackerStatus.HACKER_STATUS_APPLIED ? (
                <Flex
                  flexDirection={'column'}
                  style={{ marginTop: '1em' }}
                  alignItems={'center'}
                >
                  <Paragraph
                    color={theme.colors.black80}
                    textAlign={'center'}
                    marginBottom={'3rem'}
                  >
                    {CONSTANTS.APPLIED_STATUS_TEXT}
                  </Paragraph>
                  <LinkDuo to={FrontendRoute.EDIT_APPLICATION_PAGE}>
                    <Button type="button">View/Edit Application</Button>
                  </LinkDuo>
                </Flex>
              ) : new Date() < new Date(this.state.settings.closeTime) &&
                this.state.status === HackerStatus.HACKER_STATUS_NONE ? (
                <Flex
                  flexDirection={'column'}
                  style={{ marginTop: '1em' }}
                  alignItems={'center'}
                >
                  <Paragraph
                    color={theme.colors.black80}
                    textAlign={'center'}
                    marginBottom={'3rem'}
                  >
                    {CONSTANTS.NONE_STATUS_TEXT}
                  </Paragraph>
                  <LinkDuo to={FrontendRoute.CREATE_APPLICATION_PAGE}>
                    <Button type="button">Apply</Button>
                  </LinkDuo>
                </Flex>
              ) : new Date() < new Date(this.state.settings.confirmTime) &&
                this.state.status === HackerStatus.HACKER_STATUS_ACCEPTED ? (
                <Flex
                  flexDirection={'column'}
                  style={{ marginTop: '1em' }}
                  alignItems={'center'}
                >
                  <Paragraph
                    color={theme.colors.black80}
                    textAlign={'center'}
                    marginBottom={'3rem'}
                  >
                    {CONSTANTS.ACCEPTED_STATUS_TEXT}{' '}
                    {CONSTANTS.RSVP_DEADLINE_TEXT_START}
                    {date2human(this.state.settings.confirmTime)}
                    {CONSTANTS.RSVP_DEADLINE_TEXT_END}
                  </Paragraph>
                  <Flex flexDirection={'row'} justifyContent={'space-around'}>
                    <Button
                      type="button"
                      style={{ marginRight: '20px' }}
                      onClick={this.confirmStatus}
                    >
                      Confirm
                    </Button>
                    <Button type="button" onClick={this.withdrawStatus}>
                      Withdraw
                    </Button>
                  </Flex>
                </Flex>
              ) : new Date() > new Date(this.state.settings.confirmTime) &&
                this.state.status === HackerStatus.HACKER_STATUS_ACCEPTED ? (
                <Flex
                  flexDirection={'column'}
                  style={{ marginTop: '1em' }}
                  alignItems={'center'}
                >
                  <Paragraph
                    color={theme.colors.black80}
                    textAlign={'center'}
                    marginBottom={'3rem'}
                  >
                    {CONSTANTS.DECISION_DEADLINE_PASSED_LABEL}
                  </Paragraph>
                </Flex>
              ) : this.state.status ===
                HackerStatus.HACKER_STATUS_WAITLISTED ? (
                <Flex
                  flexDirection={'column'}
                  style={{ marginTop: '1em' }}
                  alignItems={'center'}
                >
                  <Paragraph
                    color={theme.colors.black80}
                    textAlign={'center'}
                    marginBottom={'3rem'}
                  >
                    {CONSTANTS.WAITLISTED_STATUS_TEXT}
                  </Paragraph>
                </Flex>
              ) : this.state.status === HackerStatus.HACKER_STATUS_DECLINED ? (
                <Flex
                  flexDirection={'column'}
                  style={{ marginTop: '1em' }}
                  alignItems={'center'}
                >
                  <Paragraph
                    color={theme.colors.black80}
                    textAlign={'center'}
                    marginBottom={'3rem'}
                  >
                    {CONSTANTS.DECLINED_STATUS_TEXT}
                  </Paragraph>
                </Flex>
              ) : this.state.status ===
                HackerStatus.HACKER_STATUS_CHECKED_IN ? (
                <Flex
                  flexDirection={'column'}
                  style={{ marginTop: '1em' }}
                  alignItems={'center'}
                >
                  <Paragraph
                    color={theme.colors.black80}
                    textAlign={'center'}
                    marginBottom={'3rem'}
                  >
                    {CONSTANTS.CHECKED_IN_STATUS_TEXT}
                  </Paragraph>
                  <LinkDuo
                    to={
                      FrontendRoute.CREATE_APPLICATION_PAGE
                    } /* link not made yet */
                  >
                    <Button type="button">Live Site</Button>
                  </LinkDuo>
                </Flex>
              ) : this.state.status === HackerStatus.HACKER_STATUS_CONFIRMED ? (
                <Flex
                  flexDirection={'column'}
                  style={{ marginTop: '1em' }}
                  alignItems={'center'}
                >
                  <Paragraph
                    color={theme.colors.black80}
                    textAlign={'center'}
                    marginBottom={'3rem'}
                  >
                    {CONSTANTS.CONFIRMED_STATUS_TEXT}
                  </Paragraph>
                  <Flex flexDirection={'row'} justifyContent={'space-around'}>
                    <LinkDuo to={FrontendRoute.PASS_HACKER_PAGE}>
                      <Button type="button" style={{ marginRight: '20px' }}>
                        Hack Pass
                      </Button>
                    </LinkDuo>
                    <LinkDuo to={FrontendRoute.TRAVEL_PAGE}>
                      <Button type="button" style={{ marginRight: '20px' }}>
                        Travel Page
                      </Button>
                    </LinkDuo>
                    <Button
                      type="button"
                      onClick={this.withdrawStatus}
                      style={{ marginRight: '20px' }}
                    >
                      Withdraw
                    </Button>
                  </Flex>
                </Flex>
              ) : this.state.status === HackerStatus.HACKER_STATUS_WITHDRAWN ? (
                <Flex
                  flexDirection={'column'}
                  style={{ marginTop: '1em' }}
                  alignItems={'center'}
                >
                  <Paragraph
                    color={theme.colors.black80}
                    textAlign={'center'}
                    marginBottom={'3rem'}
                  >
                    {CONSTANTS.WITHDRAWN_STATUS_TEXT}
                  </Paragraph>
                </Flex>
              ) : (
                <Flex
                  flexDirection={'column'}
                  style={{ marginTop: '1em' }}
                  alignItems={'center'}
                >
                  <Paragraph
                    color={theme.colors.black80}
                    textAlign={'center'}
                    marginBottom={'3rem'}
                  >
                    {CONSTANTS.DEADLINE_PASSED_LABEL}
                  </Paragraph>
                </Flex>
              )}
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
