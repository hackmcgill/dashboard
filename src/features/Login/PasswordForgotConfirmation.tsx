import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { BrowserRouter, Link } from 'react-router-dom';

import { FrontendRoute, HACKATHON_NAME } from '../../config';
import {
  BackgroundImage,
  H1,
  LeftContainer,
  MaxWidthBox,
  Paragraph,
} from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';

import BackgroundLandscape from '../../assets/images/backgroundLandscape.svg';

class PasswordResetEmailConfirmationContainer extends React.Component<{}, {}> {
  public render() {
    return (
      <MediaQuery minWidth={1224}>
        {(matches) =>
          matches ? (
            <LeftContainer>
              {this.renderPassForgotConfirmation()}
              <BackgroundImage
                src={BackgroundLandscape}
                top={'0px'}
                left={'0px'}
                imgWidth={'100%'}
                imgHeight={'100%'}
                minHeight={'600px'}
              />
            </LeftContainer>
          ) : (
            <div>
              {this.renderPassForgotConfirmation()}
              <BackgroundImage
                src={BackgroundLandscape}
                top={'0px'}
                left={'0px'}
                imgHeight={'100%'}
              />
            </div>
          )
        }
      </MediaQuery>
    );
  }

  private renderPassForgotConfirmation() {
    return (
      <Flex
        justifyContent={'center'}
        alignItems={'left'}
        flexDirection={'column'}
        p={'5rem 0rem 0rem 6.4rem'}
      >
        <Helmet>
          <title>Password Sent | {HACKATHON_NAME}</title>
        </Helmet>
        <Flex alignItems={'center'}>
          <Box>
            <H1 fontSize={'24px'} marginLeft={'0px'}>
              Reset Your Password
            </H1>
          </Box>
        </Flex>
        <MaxWidthBox width={'60%'} fontSize={[2, 3, 4]}>
          <Paragraph
            paddingBottom={'20px'}
            textAlign={'left'}
            fontSize={'18px'}
          >
            We've sent you a link to reset your password. Check your inbox and
            follow the instructions there.
          </Paragraph>
        </MaxWidthBox>
        <Box>
          <BrowserRouter forceRefresh={true}>
            <Link to={FrontendRoute.FORGOT_PASSWORD_PAGE}>
              <Button type="button" variant={ButtonVariant.Primary}>
                Resend Email
              </Button>
            </Link>
          </BrowserRouter>
        </Box>
      </Flex>
    );
  }
}
export default PasswordResetEmailConfirmationContainer;
