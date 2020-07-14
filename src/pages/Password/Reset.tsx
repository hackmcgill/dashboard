import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import * as React from 'react';
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
class ResetPasswordContainer extends React.Component<
  RouteComponentProps,
  IResetPasswordContainerState
<<<<<<< HEAD
  > {
=======
> {
>>>>>>> develop
  constructor(props: RouteComponentProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onConfirmationChanged = this.onConfirmationChanged.bind(this);
    this.state = {
      isValid: false,
      isSubmitted: false,
      password: '',
    };
  }
  public render() {
    return (
      <MediaQuery minWidth={1224}>
        {(matches) =>
          matches ? (
            <LeftContainer>
              {this.renderPassReset()}
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
<<<<<<< HEAD
              <div>
                {this.renderPassReset()}
                <BackgroundImage
                  src={BackgroundLandscape}
                  top={'0px'}
                  left={'0px'}
                  imgHeight={'100%'}
                />
              </div>
            )
=======
            <div>
              {this.renderPassReset()}
              <BackgroundImage
                src={BackgroundLandscape}
                top={'0px'}
                left={'0px'}
                imgHeight={'100%'}
              />
            </div>
          )
>>>>>>> develop
        }
      </MediaQuery>
    );
  }

  private renderPassReset() {
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
                  onPasswordChanged={this.onPasswordChanged}
                  label={'New password'}
                  id={'new-password'}
                />
              </Box>
              <Box width={7 / 8}>
                <PasswordInput
                  onPasswordChanged={this.onConfirmationChanged}
                  label={'Confirm password'}
                  id={'confirm-password'}
                />
                {!this.state.isValid &&
                  this.state.isSubmitted &&
                  'Passwords must match!'}
              </Box>
              <Box>
                <Button
                  type="button"
                  onClick={this.handleSubmit}
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
  }
  /**
   * Function that calls the reset password function once the form is submitted.
   */
  private handleSubmit(): void {
    const { isValid } = this.state;
    this.setState({ isSubmitted: true });
    if (!isValid) {
      return;
    }
    try {
      const authToken: string | string[] = getTokenFromQuery();
      Auth.resetPassword(this.state.password, authToken)
        .then((value: AxiosResponse) => {
          // Good response
          if (value.status === 200) {
            console.log('Reset password');
            // Redirec to login page
            this.props.history.push(FrontendRoute.LOGIN_PAGE);
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
  }
  /**
   * Callback that is called once password is updated.
   * @param password The updated password
   */
  private onPasswordChanged(password: string) {
    this.setState({ password });
  }

  /**
   * Callback that is called once password is updated.
   * @param password The updated password
   */
  private onConfirmationChanged(confirmation: string) {
    this.setState((state) => ({
      isValid: state.password === confirmation && state.password.length > 0,
    }));
  }
}

<<<<<<< HEAD
export default withRouter(
=======
export default withRouter<RouteComponentProps>(
>>>>>>> develop
  WithToasterContainer(ResetPasswordContainer)
);
