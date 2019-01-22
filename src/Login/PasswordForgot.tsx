import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import * as React from 'react';
import Helmet from 'react-helmet';
import { RouteComponentProps, withRouter } from 'react-router';

import { APIResponse, Auth } from '../api';
import Key from '../assets/images/key.svg';
import { EMAIL_LABEL } from '../config';
import { Button, H1, Image, MaxWidthBox, Paragraph } from '../shared/Elements';
import { EmailInput, Form } from '../shared/Form/';
import validationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import PasswordResetEmailConfirmationContainer from './PasswordForgotConfirmation';

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
        <Flex
          flexWrap={'wrap'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          px={2}
        >
          <Helmet>
            <title>Forgot your password? | McHacks 6</title>
          </Helmet>
          <Box>
            <Image src={Key} imgHeight={'4rem'} padding={'0rem'} />
          </Box>
          <Box>
            <H1>Password Reset</H1>
          </Box>
          <MaxWidthBox fontSize={[2, 3, 4]}>
            <Paragraph paddingBottom={'20px'} textAlign={'center'}>
              Enter your email and we will send you a link to reset your
              password
            </Paragraph>
          </MaxWidthBox>
          <Box width={'100%'}>
            <Form onSubmit={this.formSubmitHandler}>
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
              >
                <MaxWidthBox width={'80%'}>
                  <EmailInput
                    label={EMAIL_LABEL}
                    required={true}
                    onEmailChanged={this.onEmailChanged}
                    placeholder={'foo@bar.ca'}
                  />
                </MaxWidthBox>
                <Box>
                  <Button type="button" onClick={this.handleSubmit}>
                    Reset password
                  </Button>
                </Box>
              </Flex>
            </Form>
          </Box>
        </Flex>
      );
    }
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
