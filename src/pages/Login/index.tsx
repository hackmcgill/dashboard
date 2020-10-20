import { Box } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import * as QueryString from 'query-string';
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';

import { Image } from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import { EmailInput, PasswordInput } from '../../shared/Form';

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

  return (
    <div className="Login--centered-container">
      <Helmet>
        <title>Login | {HACKATHON_NAME}</title>
      </Helmet>

      <div className="Login--form-container">
        <div className="Login--art-wrapper">
          <img src={LookAtSky} className="Login--art" />
        </div>

        <form className="Login--form">
          <Image
            src={MartletTitle}
            imgHeight="60px"
            imgWidth="200px"
            padding="20px 0 60px 0"
          />
          <EmailInput
            label={EMAIL_LABEL}
            onEmailChanged={setEmail}
            value={email}
            isTight={false}
            placeholder="your_email@gmail.com"
          />
          <PasswordInput
            label={PASSWORD_LABEL}
            onPasswordChanged={setPassword}
            value={password}
            isTight={false}
            hasResetLink={true}
            placeholder="your_password"
          />
          <Box pr={'5px'} pt={'36px'} pb={'40px'}>
            <Button type="button" variant={ButtonVariant.Primary} onClick={handleSubmit}>
              Sign in
            </Button>
          </Box>
          <SignUpLink />
          <SponsorsBar pt={'20px'} pb={'50px'} />
        </form>
      </div>

      <style jsx>{`
        /* Prefixing styles with Login until styled-jsx plugin integrated with babel to avoid global scoped styling conflicts */
        .Login--centered-container {
          width: 100%;
          height: 100%;
          min-height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .Login--form-container {
          max-width: 1080px;
          flex: 1;
          display: flex;
        }

        .Login--art-wrapper {
          flex: 1 1 auto;
          display: flex;
          align-items: center;
        }

        .Login--art {
          width: 100%;
          height: auto;
        }

        .Login--form {
          box-sizing: content-box;
          flex: 0 0 360px;
          margin-left: 120px;
          margin-right: 80px;
        }
      `}</style>
    </div>
  );
};

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

export default WithToasterContainer(LoginPage);
