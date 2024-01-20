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

    <div className="form-container">
      <div className="art-wrapper">
        <img src={GirlAtHome} className="art" alt="Background" />
      </div>

      <div className="form-content">
        <H1>Create your account</H1>
        <ManageAccountForm mode={ManageAccountModes.CREATE} />
      </div>

      <style jsx={true}>{`
        .form-container {
          max-width: 1080px;
          margin: auto;
          margin-top: 72px;
          padding-bottom: 120px;
          flex: 1;
          display: flex;
        }

        .art-wrapper {
          flex: 1 1 auto;
          display: flex;
          align-items: flex-start;
        }

        .art {
          margin-top: 112px;
          width: 100%;
          height: auto;
        }

        .form-content {
          box-sizing: content-box;
          flex: 0 0 360px;
          margin-left: 180px;
          margin-right: 80px;
        }

        @media (max-width: 959px) {
          .form-container {
            margin-top: 40px;
          }

          .art-wrapper {
            display: none;
          }

          .form-content {
            flex: 1;
            margin: auto;
            padding: 0 25px;
          }
        }

        @media screen and (min-width: 960px) and (max-width: 1200px) {
          .art {
            padding: 0 60px;
            width: 90%;
          }

          .form-content {
            margin-left: 120px;
          }
        }
      `}</style>
    </div>
  </>
);

export default CreateAccountPage;
