import React from 'react';
import Helmet from 'react-helmet';
import ManageAccountContainer, { ManageAccountModes } from '../../features/Account/ManageAccountForm';

import * as CONSTANTS from '../../config/constants';
import {
  BackgroundImage,
  H1,
  MaxWidthBox,
} from '../../shared/Elements';

import Bulby from '../../assets/images/bulby.svg';
import Drone from '../../assets/images/drone.svg';

const EditAccountPage: React.FC = () => (
  <MaxWidthBox m={'auto'} maxWidth={'500px'}>
    <BackgroundImage
      right={'10%'}
      top={'178px'}
      src={Drone}
      imgHeight={'133px'}
      position={'fixed' as 'fixed'}
    />
    <BackgroundImage
      left={'5%'}
      bottom={'5%'}
      src={Bulby}
      imgHeight={'290px'}
      position={'fixed' as 'fixed'}
    />
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
