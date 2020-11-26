import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { APIResponse, Auth } from '../../api';
import { EMAIL_LABEL, HACKATHON_NAME } from '../../config';
import { H1, MaxWidthBox, Paragraph } from '../../shared/Elements';
import { BackgroundImage, LeftContainer } from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import { EmailInput, Form } from '../../shared/Form';
import validationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';
import PasswordResetEmailConfirmationContainer from '../../features/Login/PasswordForgotConfirmation';

import BackgroundLandscape from '../../assets/images/backgroundLandscape.svg';

/**
 * Container that renders form to log in.
 */
const ForgotPasswordContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [sentEmail, setSentEmail] = useState<boolean>(false);

  /**
   * Function that calls the login function once the form is submitted.
   */
  const handleSubmit = () => {
    Auth.forgotPassword(email)
      .then((value: AxiosResponse) => {
        // Good response
        if (value.status === 200) {
          console.log('reset password');
          // Log them out, in case they were already logged in.
          Auth.logout()
            .then(() => {
              // Redirect to confirmation page that we sent an email
              setSentEmail(true);
            })
            .catch((error) => {
              console.error('Could not log out', error);
            });
        } else {
          console.error(value);
        }
      })
      .catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
        if (response && response.data) {
          validationErrorGenerator(response.data);
        }
      });
  };

  // TODO: Move this to seprate component,
  const renderPassForgot = () => {
    return (
      <Flex
        flexWrap={'wrap'}
        justifyContent={'center'}
        alignItems={'left'}
        flexDirection={'column'}
        p={'5rem 0rem 0rem 6.4rem'}
      >
        <Box>
          <H1 fontSize={'24px'} marginLeft={'0px'} marginBottom={'0px'}>
            Reset Your Password
          </H1>
        </Box>
        <MaxWidthBox width={'60%'} fontSize={[2, 3, 4]}>
          <Paragraph textAlign={'left'} fontSize={'18px'}>
            Enter your email and we will send you a link to reset your password
          </Paragraph>
        </MaxWidthBox>
        <Box width={'100%'}>
          <Form onSubmit={(e: any) => e.preventDefault()}>
            <Flex
              justifyContent={'center'}
              alignItems={'left'}
              flexDirection={'column'}
            >
              <MaxWidthBox width={'60%'}>
                <EmailInput
                  label={EMAIL_LABEL}
                  required={true}
                  onEmailChanged={setEmail}
                  placeholder={'foo@bar.ca'}
                />
              </MaxWidthBox>
              <Box>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  variant={ButtonVariant.CallToAction}
                >
                  Submit
                </Button>
              </Box>
            </Flex>
          </Form>
        </Box>
      </Flex>
    );
  };

  if (sentEmail) {
    return <PasswordResetEmailConfirmationContainer />;
  } else {
    return (
      <>
        <Helmet>
          <title>Forgot your password | {HACKATHON_NAME}</title>
        </Helmet>
        <MediaQuery minWidth={1224}>
          {(matches) =>
            matches ? (
              <LeftContainer>
                {renderPassForgot()}
                <BackgroundImage
                  src={BackgroundLandscape}
                  top={'0px'}
                  left={'0px'}
                  imgWidth={'100%'}
                  imgHeight={'100%'}
                  minHeight={'600px'}
                  zIndex={-1}
                />
              </LeftContainer>
            ) : (
                <div>
                  {renderPassForgot()}
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
      </>
    );
  }
};

export default WithToasterContainer(ForgotPasswordContainer);
