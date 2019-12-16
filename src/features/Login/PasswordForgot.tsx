import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import * as React from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { RouteComponentProps, withRouter } from 'react-router';

import { APIResponse, Auth } from '../../api';
// import Key from '../../assets/images/key.svg';
import { EMAIL_LABEL } from '../../config';
import { BackgroundImage, LeftContainer } from '../../shared/Elements';
import { H1, MaxWidthBox, Paragraph } from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import { EmailInput, Form } from '../../shared/Form';
import validationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';
import PasswordResetEmailConfirmationContainer from './PasswordForgotConfirmation';

import BackgroundLandscape from '../../assets/images/backgroundLandscape.svg';

export interface IForgotState {
  email: string;
  sentEmail: boolean;
}

/**
 * Container that renders form to log in.
 */
class ForgotPasswordContainer extends React.Component<
  RouteComponentProps,
  IForgotState
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.state = {
      email: '',
      sentEmail: false,
    };
  }
  public render() {
    if (this.state.sentEmail) {
      return <PasswordResetEmailConfirmationContainer />;
    } else {
      return (
        <MediaQuery minWidth={1224}>
          {(matches) =>
            matches ? (
              <LeftContainer>
                {this.renderPassForgot()}
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
                {this.renderPassForgot()}
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

  private renderPassForgot() {
    return (
      <Flex
        flexWrap={'wrap'}
        justifyContent={'center'}
        alignItems={'left'}
        flexDirection={'column'}
        // px={2}
        p={'5rem'}
      >
        <Helmet>
          <title>Forgot your password? | McHacks 7</title>
        </Helmet>
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
          <Form onSubmit={this.formSubmitHandler}>
            <Flex
              justifyContent={'center'}
              alignItems={'left'}
              flexDirection={'column'}
            >
              <MaxWidthBox width={'60%'}>
                <EmailInput
                  label={EMAIL_LABEL}
                  required={true}
                  onEmailChanged={this.onEmailChanged}
                  placeholder={'foo@bar.ca'}
                />
              </MaxWidthBox>
              <Box>
                <Button
                  type="button"
                  onClick={this.handleSubmit}
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
  }
  private formSubmitHandler(e: any) {
    e.preventDefault();
  }

  /**
   * Function that calls the login function once the form is submitted.
   */
  private handleSubmit(): void {
    Auth.forgotPassword(this.state.email)
      .then((value: AxiosResponse) => {
        // Good response
        if (value.status === 200) {
          console.log('reset password');
          // Log them out, in case they were already logged in.
          Auth.logout()
            .then(() => {
              // Redirect to confirmation page that we sent an email
              this.setState({
                sentEmail: true,
              });
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
  }
  /**
   * Callback that is called once email is added.
   * @param email The updated email
   */
  private onEmailChanged(email: string) {
    this.setState({ email });
  }
}

export default WithToasterContainer(
  withRouter<RouteComponentProps>(ForgotPasswordContainer)
);
