import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import * as QueryString from 'query-string';
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { Link, useHistory } from 'react-router-dom';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import ForgotPasswordLinkComponent from '../../features/Login/ForgotPasswordLink';

import {
  BackgroundImage,
  H1,
  LeftContainer,
  MaxWidthBox,
} from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import { EmailInput, Form, PasswordInput } from '../../shared/Form';

import Coders from '../../assets/images/coders.svg';

import WithToasterContainer from '../../shared/HOC/withToaster';

import { APIResponse, Auth } from '../../api';

import {
  EMAIL_LABEL,
  FrontendRoute,
  HACKATHON_NAME,
  PASSWORD_LABEL,
} from '../../config';

const LoginPage: React.FC = () => {
  // Store form's email and password values in state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Get access to router's history to allow for programtic
  // page navigation
  const history = useHistory();

  /**
   * Returns the redirect link (page user will be sent to if login
   * attempt is successful), or undefined if it doesn't exist.
   */
  const getRedirectLink: any = () => {
    const queries: any = QueryString.parse(window.location.search);
    if (queries.redir) {
      return queries.redir.toString();
    } else {
      return undefined;
    }
  };

  /**
   * Trigger authentication function once the form is submitted
   * then redirect user to appropriate page depending upon
   * success of login attempt
   */
  const handleSubmit = () => {
    Auth.login(email, password)
      .then((value: AxiosResponse) => {
        // Good response
        if (value.status === 200) {
          // Probably want to redirect to login page or something
          console.log('Logged in');
          const redir = getRedirectLink();
          if (redir) {
            history.push(redir);
          } else {
            history.push(FrontendRoute.HOME_PAGE);
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
  };

  /**
   * Display login form to user
   */
  const renderForm = () => (
    <MaxWidthBox maxWidth={'500px'} paddingLeft={'50px'} paddingRight={'50px'}>
      <Helmet>
        <title>Login | {HACKATHON_NAME}</title>
      </Helmet>
      <Form>
        <Flex
          alignItems={'center'}
          flexDirection={'column'}
          p={'4rem 0rem 0rem 5.8rem'}
        >
          <Box alignSelf={'flex-start'}>
            <H1 fontSize={'24px'} marginLeft={'0px'}>
              Sign in / Register
            </H1>
          </Box>
          <EmailInput
            label={EMAIL_LABEL}
            onEmailChanged={setEmail}
            value={email}
            isTight={true}
          />
          <PasswordInput
            label={PASSWORD_LABEL}
            onPasswordChanged={setPassword}
            value={password}
            isTight={true}
          />
          <Box alignSelf={'flex-end'} mb={'30px'} pr={'10px'}>
            <ForgotPasswordLinkComponent />
          </Box>
          <Flex>
            <Box pr={'5px'}>
              <Button type="button" onClick={handleSubmit}>
                Sign in
              </Button>
            </Box>
            <Box pl={'5px'}>
              <Link
                to={{
                  pathname: FrontendRoute.CREATE_ACCOUNT_PAGE,
                  state: { email, password },
                }}
              >
                <Button type="button" variant={ButtonVariant.Secondary}>
                  Register
                </Button>
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Form>
    </MaxWidthBox>
  );

  return (
    <MediaQuery minWidth={1224} width={'100%'}>
      {(matches) =>
        matches ? (
          <LeftContainer>
            {renderForm()}
            <BackgroundImage
              src={Coders}
              top={'60px'}
              right={'0px'}
              imgWidth={'100%'}
              imgHeight={'100%'}
              minHeight={'600px'}
            />
          </LeftContainer>
        ) : (
            <>
              {renderForm()}
              <BackgroundImage
                src={Coders}
                top={'60px'}
                right={'0px'}
                imgHeight={'100%'}
              />
            </>
          )
      }
    </MediaQuery>
  );
};

export default WithToasterContainer(LoginPage);
