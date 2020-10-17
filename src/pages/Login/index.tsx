import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import * as QueryString from 'query-string';
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { useHistory } from 'react-router-dom';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';

import {
  BackgroundImage,
  Image,
  LeftContainer,
  MaxWidthBox,
} from '../../shared/Elements';
import Button from '../../shared/Elements/Button';
import { EmailInput, Form, PasswordInput } from '../../shared/Form';

import LookAtSky from '../../assets/images/lookAtSky.svg';
import MartletTitle from '../../assets/images/martlet-text.svg';
import WithToasterContainer from '../../shared/HOC/withToaster';
import SponsorsBar from '../../features/Sponsor/SocialMediaBar';

import { APIResponse, Auth } from '../../api';

import {
  EMAIL_LABEL,
  FrontendRoute,
  HACKATHON_NAME,
  PASSWORD_LABEL,
} from '../../config';
import SignUpLink from '../../features/Login/SignUpLink';

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
  // something big time wrong in the left padding of the form
  const renderForm = (isDesktop: boolean) => (
    <div>
      <MaxWidthBox className="formBox">
        <Helmet>
          <title>Login | {HACKATHON_NAME}</title>
        </Helmet>
        <Form>
          <Flex
            alignItems={'left'}
            flexDirection={'column'}
            p={'1rem 5.8rem 0rem 0rem'}
          >
            <Image
              src={MartletTitle}
              imgHeight="60px"
              imgWidth="200px"
              padding="60px 0px"
            />
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
            <Box pr={'5px'} pt={'40px'} pb={'20px'}>
              <Button type="button" onClick={handleSubmit}>
                Sign in
              </Button>
            </Box>
            <SignUpLink />
            <SponsorsBar pt={'20px'} pb={'50px'} />
          </Flex>
        </Form>
      </MaxWidthBox>
      <style jsx>{`
        .formBox {
          width: 500px;
          padding: 0px 50px;
          position: absolute;
        }
      `}</style>
      {isDesktop && (
        <style jsx>{`
          .formBox {
            left: 55%;
            right: 0;
          }
        `}</style>
      )}
    </div>
  );

  return (
    <MediaQuery minWidth={1224} width={'100%'}>
      {(matches) =>
        matches ? (
          <LeftContainer>
            {renderForm(false)}
            <BackgroundImage src={LookAtSky} imgWidth={'100%'} />
          </LeftContainer>
        ) : (
          <div>
            {renderForm(true)}
            <BackgroundImage
              src={LookAtSky}
              top={'90px'}
              left={'0px'}
              imgWidth={'50%'}
              position={'fixed' as 'fixed'}
            />
          </div>
        )
      }
    </MediaQuery>
  );
};

export default WithToasterContainer(LoginPage);
