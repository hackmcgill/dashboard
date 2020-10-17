import React from 'react';
import Helmet from 'react-helmet';
import ManageAccountContainer, {
  ManageAccountModes,
} from '../../features/Account/ManageAccountForm';

import * as CONSTANTS from '../../config/constants';
import { BackgroundImage, H1, MaxWidthBox } from '../../shared/Elements';
import MediaQuery from 'react-responsive';

import SingleCoder from '../../assets/images/singleCoder.svg';

const CreateAccountPage: React.FC = () => (
  <>
    <Helmet>
      <title>Create Account | {CONSTANTS.HACKATHON_NAME}</title>
    </Helmet>

    <MediaQuery maxWidth="991px">
      <MaxWidthBox className="mobile">
        <H1 className="title">Create your account</H1>
        <ManageAccountContainer mode={ManageAccountModes.CREATE} />
      </MaxWidthBox>
      <style jsx>{`
        .mobile {
          margin: auto;
          max-width: 500px;
          padding: 0 50px;
        }
      `}</style>
    </MediaQuery>

    <MediaQuery minWidth="992px">
      <MaxWidthBox className="desktop">
        <H1 className="title">Create your account</H1>
        <ManageAccountContainer mode={ManageAccountModes.CREATE} />
      </MaxWidthBox>
      <style jsx>{`
        .desktop {
          position: absolute;
          left: 50%;
          width: 500px;
          padding: 0 50px;
        }
      `}</style>
    </MediaQuery>
    <style jsx>{`
      .title {
        font-size: 30px;
        text-align: left;
        margin: 0px 0px 20px 0px;
        padding: 70px 0px 20px;
      }
    `}</style>
    <MediaQuery minWidth="992px">
      <BackgroundImage src={SingleCoder} className="singleCoderBG" />
      <style jsx>{`
        .singleCoderBG {
          top: 60px;
          left: 0px;
          height: 100%;
          position: fixed;
        }
      `}</style>
    </MediaQuery>
  </>
);

export default CreateAccountPage;
