import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import * as QueryString from 'query-string';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import ForgotPasswordLinkComponent from './ForgotPasswordLink';

import {
  BackgroundImage,
  Button,
  H1,
  LeftContainer,
  MaxWidthBox,
} from '../shared/Elements';
import { EmailInput, Form, PasswordInput } from '../shared/Form';

import BackgroundLandscape from '../assets/images/backgroundLandscape.svg';

import WithToasterContainer from '../shared/HOC/withToaster';

import { APIResponse, Auth } from '../api';

import { EMAIL_LABEL, FrontendRoute, PASSWORD_LABEL } from '../config';

export interface ILoginState {
  email: string;
  password: string;
}

/**
 * Container that renders form to log in.
 */
class LoginContainer extends React.Component<RouteComponentProps, ILoginState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
  }
  public render() {
    return (
      <MediaQuery minWidth={1224}>
        {(matches) =>
          matches ? (
            <LeftContainer>
              {this.renderForm()}
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
              {this.renderForm()}
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

  private renderForm() {
    return (
      <MaxWidthBox maxWidth={'600px'} pl={'50px'} pr={'50px'}>
        <Form>
          <Flex alignItems={'center'} flexDirection={'column'}>
            <Box alignSelf={'flex-start'}>
              <H1 fontSize={'24px'}>Sign in / Register</H1>
            </Box>
            <EmailInput
              label={EMAIL_LABEL}
              onEmailChanged={this.onEmailChanged}
              value={this.state.email}
              isTight={true}
            />
            <PasswordInput
              label={PASSWORD_LABEL}
              onPasswordChanged={this.onPasswordChanged}
              value={this.state.password}
              isTight={true}
            />
            <Box alignSelf={'flex-end'} mb={'30px'} pr={'10px'}>
              <ForgotPasswordLinkComponent />
            </Box>
            <Flex>
              <Box pr={'5px'}>
                <Button type="button" onClick={this.handleSubmit}>
                  Sign in
                </Button>
              </Box>
              <Box pl={'5px'}>
                <Link
                  to={{
                    pathname: FrontendRoute.CREATE_ACCOUNT_PAGE,
                    state: { ...this.state },
                  }}
                >
                  <Button type="button" secondary={true}>
                    Register
                  </Button>
                </Link>
              </Box>
            </Flex>
          </Flex>
        </Form>
      </MaxWidthBox>
    );
  }

  /**
   * Function that calls the login function once the form is submitted.
   */
  private handleSubmit(): void {
    Auth.login(this.state.email, this.state.password)
      .then((value: AxiosResponse) => {
        // Good response
        if (value.status === 200) {
          // Probably want to redirect to login page or something
          console.log('Logged in');
          const redir = this.getRedirectLink();
          if (redir) {
            this.props.history.push(redir);
          } else {
            this.props.history.push(FrontendRoute.HOME_PAGE);
          }
        } else {
          console.error(value);
        }
      })
      .catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
        if (response && response.data) {
          ValidationErrorGenerator(response.data);
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
  /**
   * Callback that is called once password is added.
   * @param password The updated password
   */
  private onPasswordChanged(password: string) {
    this.setState({ password });
  }
  /**
   * Returns the redirect link, or undefined if it doesn't exist.
   */
  private getRedirectLink(): any {
    const queries: any = QueryString.parse(location.search);
    if (queries.redir) {
      return queries.redir.toString();
    } else {
      return undefined;
    }
  }
}
export default WithToasterContainer(
  withRouter<RouteComponentProps>(LoginContainer)
);
