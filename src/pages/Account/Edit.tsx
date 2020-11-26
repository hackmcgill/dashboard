import React from 'react';
import Helmet from 'react-helmet';
import ManageAccountContainer, { ManageAccountModes } from '../../features/Account/ManageAccountForm';

import * as CONSTANTS from '../../config/constants';
import {
  H1,
  MaxWidthBox,
} from '../../shared/Elements';

import Gears from '../../assets/images/hacker2-dots.svg';

const EditAccountPage: React.FC = () => (
  <>
    <Helmet>
      <title>
        Edit Profile | {CONSTANTS.HACKATHON_NAME}
      </title>
    </Helmet>

    <MaxWidthBox m={'auto'} maxWidth={'500px'} paddingLeft={'50px'} paddingRight={'50px'}>
      <div className="gears-art-container">
        <img src={Gears} alt="Background" className="gears-art" />
      </div>

      <H1
        fontSize={'30px'}
        textAlign={'left'}
        marginTop={'0px'}
        marginBottom={'20px'}
        marginLeft={'74px'}
        paddingBottom={'20px'}
        paddingTop={'70px'}
      >
        Your Account
      </H1>
      <ManageAccountContainer mode={ManageAccountModes.EDIT} />
    </MaxWidthBox>

    <style jsx>{`
      .gears-art-container {
        position: absolute;
        widht: 0;
        height: 0;
      }

      .gears-art {
        position: relative;
        left: -30px;
        top: 36px;

        width: 80px;
        height: auto;
      }
    `}</style>
  </>
);

export default EditAccountPage;
