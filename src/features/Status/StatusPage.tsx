import * as React from 'react';
import Helmet from 'react-helmet';

import { Box, Flex } from '@rebass/grid';
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
              {this.props.status !== HackerStatus.HACKER_STATUS_NONE ? (
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
                    Your application has been submitted. Decisions will be sent
                    out in January so stay tuned!
                  </Paragraph>
                  <LinkDuo to={FrontendRoute.EDIT_APPLICATION_PAGE}>
                    <Button type="button">View/Edit Application</Button>
                  </LinkDuo>
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
                      You’re all set! Ready to start your application?
                  </Paragraph>
                    <LinkDuo to={FrontendRoute.CREATE_APPLICATION_PAGE}>
                      <Button type="button">Apply</Button>
                    </LinkDuo>
                  </Flex>
                )
              }
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
