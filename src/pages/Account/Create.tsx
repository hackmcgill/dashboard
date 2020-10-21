import React from 'react';
import Helmet from 'react-helmet';
import ManageAccountForm, {
  ManageAccountModes,
} from '../../features/Account/ManageAccountForm';

import * as CONSTANTS from '../../config/constants';
import { H1 } from '../../shared/Elements';

import GirlAtHome from '../../assets/images/girl-at-home.svg';

const CreateAccountPage: React.FC = () => (
  <>
    <Helmet>
      <title>Create Account | {CONSTANTS.HACKATHON_NAME}</title>
    </Helmet>

    <div className="SignUp--form-container">
      <div className="SignUp--art-wrapper">
        <img src={GirlAtHome} className="SignUp--art" alt="Background" />
      </div>

      <form className="SignUp--form">
        <H1>Create your account</H1>
        <ManageAccountForm mode={ManageAccountModes.CREATE} />
      </form>

      <style jsx>{`
        /* Prefixing styles with SignUp until styled-jsx plugin integrated with babel to avoid global scoped styling conflicts */
        .SignUp--form-container {
          max-width: 1080px;
          margin: auto;
          margin-top: 72px;
          padding-bottom: 120px;
          flex: 1;
          display: flex;
        }

        .SignUp--art-wrapper {
          flex: 1 1 auto;
          display: flex;
          align-items: flex-start;
        }

        .SignUp--art {
          margin-top: 112px;
          width: 100%;
          height: auto;
        }

        .SignUp--form {
          box-sizing: content-box;
          flex: 0 0 360px;
          margin-left: 180px;
          margin-right: 80px;
        }
      `}</style>
    </div>
  </>
);

export default CreateAccountPage;
