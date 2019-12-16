import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { BrowserRouter, Link } from 'react-router-dom';

import { FrontendRoute } from '../../config';
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
              <Flex
                justifyContent={'center'}
                alignItems={'left'}
                flexDirection={'column'}
              >
                <Helmet>
                  <title>Password Sent | McHacks 7</title>
                </Helmet>
                <Flex alignItems={'center'}>
                  <Box>
                    <H1 fontSize={'24px'}>Reset Your Password</H1>
                  </Box>
                </Flex>
                <MaxWidthBox width={1} fontSize={[2, 3, 4]}>
                  <Paragraph paddingBottom={'20px'} textAlign={'left'}>
                    We've sent you a link to reset your password. Check your
                    inbox and follow the instructions there.
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
              <Flex
                justifyContent={'center'}
                alignItems={'left'}
                flexDirection={'column'}
              >
                <Helmet>
                  <title>Password Sent | McHacks 7</title>
                </Helmet>
                <Flex alignItems={'center'}>
                  <Box>
                    <H1 paddingTop={'8rem'} text-align={'left'}>
                      Password reset
                    </H1>
                  </Box>
                </Flex>
                <MaxWidthBox width={1} fontSize={[2, 3, 4]}>
                  <Paragraph paddingBottom={'20px'} textAlign={'center'}>
                    We've sent you a link to reset your password. Check your
                    inbox and follow the instructions there.
                  </Paragraph>
                </MaxWidthBox>
                <Box>
                  <Link to={FrontendRoute.FORGOT_PASSWORD_PAGE}>
                    <Button type="button" variant={ButtonVariant.Primary}>
                      Resend Email
                    </Button>
                  </Link>
                </Box>
              </Flex>
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
}
export default PasswordResetEmailConfirmationContainer;
