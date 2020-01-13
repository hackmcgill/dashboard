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
} from '../../config';
import theme from '../../shared/Styles/theme';
import ConfirmationEmailSentComponent from '../Account/ConfirmationEmailSentComponent';

import Background from '../../assets/images/statuspage-background.svg';

export interface IStatusPageProps {
  account?: IAccount;
  status: HackerStatus;
  confirmed: boolean;
}

class StatusPage extends React.Component<IStatusPageProps, {}> {
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
              {this.props.status === HackerStatus.HACKER_STATUS_APPLIED ? (
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
              ) : Date.now() < CONSTANTS.APPLICATION_CLOSE_TIME &&
                this.props.status === HackerStatus.HACKER_STATUS_NONE ? (
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
              ) : this.props.status === HackerStatus.HACKER_STATUS_ACCEPTED ? (
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
                    {CONSTANTS.ACCEPTED_STATUS_TEXT}
                  </Paragraph>
                </Flex>
              ) : this.props.status ===
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
              ) : this.props.status === HackerStatus.HACKER_STATUS_DECLINED ? (
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
              ) : this.props.status ===
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
                </Flex>
              ) : this.props.status === HackerStatus.HACKER_STATUS_CONFIRMED ? (
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
                </Flex>
              ) : this.props.status === HackerStatus.HACKER_STATUS_WITHDRAWN ? (
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
}

export default StatusPage;
