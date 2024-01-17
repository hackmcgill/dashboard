import { Box } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import QueryString from 'query-string';
import React, { FormEvent, useState } from 'react';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';

import { Image } from '../../shared/Elements';
import { ButtonVariant } from '../../shared/Elements';
import { EmailInput, PasswordInput, SubmitBtn } from '../../shared/Form';

import launchpad from '../../assets/images/launchpad.svg';
import MartletTitle from '../../assets/images/martlet-text.svg';
import SocialMediaBar from '../../features/Sponsor/SocialMediaBar';
import WithToasterContainer from '../../shared/HOC/withToaster';

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

  // Get access to router's navigation to allow for programtic
  // page navigation
  const navigate = useNavigate();

  /**
   * Trigger authentication function once the form is submitted
   * then redirect user to appropriate page depending upon
   * success of login attempt
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    Auth.login(email, password)
      .then((value: AxiosResponse) => {
        // Good response
        if (value.status === 200) {
          // Probably want to redirect to login page or something
          console.log('Logged in');
          const redir = getRedirectLink();
          if (redir) {
            navigate(redir);
          } else {
            navigate(FrontendRoute.HOME_PAGE);
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
    <div className="centered-container">
      <Helmet>
        <title>Login | {HACKATHON_NAME}</title>
      </Helmet>

      <div className="form-container">
        <div className="art-wrapper">
          <img src={launchpad} className="art" alt="Background" />
        </div>

        <form className="form-content" onSubmit={handleSubmit}>
          <Image
            src={MartletTitle}
            imgHeight="60px"
            imgWidth="200px"
            padding="0 0 60px 0"
          />
          <EmailInput
            label={EMAIL_LABEL}
            onEmailChanged={setEmail}
            value={email}
            isTight={true}
            placeholder="your_email@gmail.com"
          />
          <PasswordInput
            label={PASSWORD_LABEL}
            onPasswordChanged={setPassword}
            value={password}
            isTight={true}
            hasResetLink={true}
            placeholder="your_password"
          />
          <SubmitBtn variant={ButtonVariant.Primary}>Sign in</SubmitBtn>
          <SignUpLink />
          <Box pt={'80px'}>
            <SocialMediaBar />
          </Box>
        </form>
      </div>

      <style jsx={true}>{`
        .centered-container {
          width: 100%;
          height: 100%;
          min-height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .form-container {
          padding: 96px 0;
          max-width: 1080px;
          flex: 1;
          display: flex;
        }

        .art-wrapper {
          flex: 1 1 auto;
          display: flex;
          align-items: center;
        }

        .art {
          width: 100%;
          height: auto;
        }

        .form-content {
          box-sizing: content-box;
          flex: 0 0 360px;
          margin-left: 120px;
          margin-right: 80px;
        }

        @media screen and (max-width: 959px) {
          .form-container {
            padding: 108px 0;
          }

          .art-wrapper {
            display: none;
          }

          .form-content {
            flex: 1;
            max-width: 360px;
            margin: auto;
            padding: 0 40px;
          }
        }

        @media screen and (min-width: 960px) and (max-width: 1200px) {
          .art {
            margin: 0 80px;
            width: 90%;
          }

          .form-content {
            margin-right: 80px;
          }
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
