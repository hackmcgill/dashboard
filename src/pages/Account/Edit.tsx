import React from 'react';
import Helmet from 'react-helmet';
import ManageAccountContainer, { ManageAccountModes } from '../../features/Account/ManageAccountForm';

import * as CONSTANTS from '../../config/constants';
import {
  BackgroundImage,
  H1,
  MaxWidthBox,
} from '../../shared/Elements';

import Coders from '../../assets/images/coders.svg';

const EditAccountPage: React.FC = () => (
  <MaxWidthBox paddingLeft={'100px'} paddingRight={'50px'} maxWidth={'500px'}>
    <>
      <BackgroundImage
        src={Coders}
        top={'60px'}
        right={'0px'}
        imgHeight={'100%'}
      />
    </>
    <Helmet>
      <title>
        Edit Profile | {CONSTANTS.HACKATHON_NAME}
      </title>
    </Helmet>
    <H1
      fontSize={'30px'}
      textAlign={'left'}
      marginTop={'0px'}
      marginBottom={'20px'}
      marginLeft={'0px'}
      paddingBottom={'20px'}
      paddingTop={'70px'}
    >
      Your Account
    </H1>
    <ManageAccountContainer mode={ManageAccountModes.EDIT} />
  </MaxWidthBox>
);

export default EditAccountPage;
