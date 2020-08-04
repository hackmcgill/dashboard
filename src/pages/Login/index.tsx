import { AxiosResponse } from 'axios';
import * as QueryString from 'query-string';
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import ForgotPasswordLinkComponent from '../../features/Login/ForgotPasswordLink';

import { H1 } from '../../shared/Elements';
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
  const renderLoginForm = () => (
    <Form>
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
      <div className="forgot-password-container">
        <ForgotPasswordLinkComponent />
      </div>
      <div className="submit-buttons-container">
        <Button type="button" onClick={handleSubmit}>
          Sign in
        </Button>
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
      </div>
    </Form>
  );

  return (
    <>
      <Helmet>
        <title>Login | {HACKATHON_NAME}</title>
      </Helmet>

      <div className="login-form-container">
        <H1
          fontSize={'30px'}
          textAlign={'left'}
          marginTop={'0px'}
          marginBottom={'20px'}
          marginLeft={'0px'}
          paddingBottom={'20px'}
          paddingTop={'70px'}
        >
          Sign in / Register
        </H1>
        {renderLoginForm()}
      </div>

      <img className="background-image coders" src={Coders} />

      <style jsx>{`
        .login-form-container {
          max-width: 500px;
          padding-left: 100px;
          padding-right: 50px;
          box-sizing: border-box;
        }

        .forgot-password-container {
          margin-bottom: 30px;
          margin-right: 10px;
          text-align: right;
        }

        .submit-buttons-container {
          text-align: center;
        }

        .submit-buttons-container > * {
          padding: 0 10px;
        }

        /* When on small screen-size, center login form */
        @media only screen and (max-width: 991px) {
          .login-form-container {
            margin: auto;
            padding-left: 50px;
            padding-right: 50px;
          }
        }

        /* Adjust position and size of background image based on screen-size */
        @media only screen and (max-width: 991px) {
          .coders {
            display: none;
          }
        }
        @media only screen and (min-width: 992px) and (max-width: 1093px) {
          .coders {
            top: 60px;
            right: 0;
            height: 70%;
          }
        }
        @media only screen and (min-width: 1094px) and (max-width: 1199px) {
          .coders {
            top: 60px;
            right: 0;
            height: 80%;
          }
        }
        @media only screen and (min-width: 1200px) {
          .coders {
            top: 60px;
            right: 0;
            height: 90%;
          }
        }
      `}</style>
    </>
  );
};

export default WithToasterContainer(LoginPage);
