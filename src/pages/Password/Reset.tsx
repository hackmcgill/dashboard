import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';

import { APIResponse, Auth } from '../../api';

import { FrontendRoute, getTokenFromQuery, HACKATHON_NAME } from '../../config';
import {
  BackgroundImage,
  H1,
  LeftContainer,
  MaxWidthBox,
} from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import { Form, PasswordInput } from '../../shared/Form';

import BackgroundLandscape from '../../assets/images/backgroundLandscape.svg';

import WithToasterContainer from '../../shared/HOC/withToaster';

export interface IResetPasswordContainerState {
  isValid: boolean;
  isSubmitted: boolean;
  password: string;
}

/**
 * Container that renders form to reset a person's password. The auth token must be present in the URL for this to work.
 */
const ResetPasswordContainer: React.FC<RouteComponentProps> = (props) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const renderPassReset = () => {
    return (
      <Flex
        justifyContent={'center'}
        alignItems={'left'}
        flexDirection={'column'}
        p={'5rem 0rem 0rem 6.4rem'}
      >
        <Helmet>
          <title>Reset Password | {HACKATHON_NAME}</title>
        </Helmet>
        <MaxWidthBox maxWidth={'500px'} width={1}>
          <H1 fontSize={'24px'} marginLeft={'0px'}>
            Reset Your Password
          </H1>
          <Form>
            <Flex
              justifyContent={'center'}
              alignItems={'left'}
              flexDirection={'column'}
            >
              <Box width={7 / 8}>
                <PasswordInput
                  onPasswordChanged={onPasswordChanged}
                  label={'New password'}
                  id={'new-password'}
                />
              </Box>
              <Box width={7 / 8}>
                <PasswordInput
                  onPasswordChanged={onConfirmationChanged}
                  label={'Confirm password'}
                  id={'confirm-password'}
                />
                {isValid && isSubmitted && 'Passwords must match!'}
              </Box>
              <Box>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  variant={ButtonVariant.Primary}
                >
                  Submit
                </Button>
              </Box>
            </Flex>
          </Form>
        </MaxWidthBox>
      </Flex>
    );
  };
  /**
   * Function that calls the reset password function once the form is submitted.
   */
  const handleSubmit = () => {
    setIsSubmitted(true);
    if (!isValid) {
      return;
    }
    try {
      const authToken: string | string[] = getTokenFromQuery();
      Auth.resetPassword(password, authToken)
        .then((value: AxiosResponse) => {
          // Good response
          if (value.status === 200) {
            console.log('Reset password');
            // Redirec to login page
            props.history.push(FrontendRoute.LOGIN_PAGE);
          }
        })
        .catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
          if (response && response.data) {
            ValidationErrorGenerator(response.data);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * Callback that is called once password is updated.
   * @param password The updated password
   */
  const onPasswordChanged = (password: string) => {
    setPassword(password);
  };

  /**
   * Callback that is called once password is updated.
   * @param password The updated password
   */
  const onConfirmationChanged = (confirmation: string) => {
    setIsValid(password === confirmation && password.length > 0);
  };

  return (
    <MediaQuery minWidth={1224}>
      {(matches) =>
        matches ? (
          <LeftContainer>
            {renderPassReset()}
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
            {renderPassReset()}
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
};

export default withRouter(WithToasterContainer(ResetPasswordContainer));
