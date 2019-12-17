import * as React from 'react';
import Helmet from 'react-helmet';

import { Flex } from '@rebass/grid';
import {
  BackgroundImage,
  Button,
  H1,
  LinkDuo,
  Paragraph,
} from '../../shared/Elements';
// import Sidebar from '../Sidebar/Sidebar';

import Background from '../../assets/images/statuspage-background.svg';
import {
  FrontendRoute,
  HACKATHON_NAME,
  HackerStatus,
  IAccount,
} from '../../config';
import theme from '../../shared/Styles/theme';
import ConfirmationEmailSentComponent from '../Account/ConfirmationEmailSentComponent';

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
        {this.props.confirmed && this.props.account ? (
          <div>
            <h1 style={{ color: theme.colors.red, textAlign: 'center' }}>
              Hey {this.props.account.firstName},
            </h1>
            {this.props.status !== HackerStatus.HACKER_STATUS_NONE ? (
              <Flex flexDirection={'rows'} style={{ marginTop: '1em' }}>
                <H1 textAlign={'center'} display={'inline'}>
                  Your application status is:
                </H1>
                <H1
                  textAlign={'center'}
                  color={theme.colors.black80}
                  display={'inline'}
                >
                  {this.props.status}
                </H1>
              </Flex>
            ) : (
              <Flex
                flexDirection={'column'}
                style={{ marginTop: '1em' }}
                alignItems={'center'}
              >
                <Paragraph color={theme.colors.black80} textAlign={'center'}>
                  Don't forget to submit your application before Saturday
                  December 31st{' '}
                </Paragraph>
                <LinkDuo to={FrontendRoute.CREATE_APPLICATION_PAGE}>
                  <Button type="button">Apply</Button>
                </LinkDuo>
              </Flex>
            )}
          </div>
        ) : (
          <ConfirmationEmailSentComponent />
        )}
        <BackgroundImage
          right={'0px'}
          bottom={'0px'}
          src={Background}
          imgHeight={'87%'}
        />
      </Flex>
    );
  }
}

export default StatusPage;
