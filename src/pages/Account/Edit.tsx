import React from 'react';
import Helmet from 'react-helmet';
import ManageAccountForm, { ManageAccountModes } from '../../features/Account/ManageAccountForm';

import * as CONSTANTS from '../../config/constants';
import {
  BackgroundImage,
  H1,
  MaxWidthBox,
} from '../../shared/Elements';

import Bulby from '../../assets/images/bulby.svg';
import Drone from '../../assets/images/drone.svg';
import MediaQuery from 'react-responsive';
import theme from '../../shared/Styles/theme';

const EditAccountPage: React.FC = () => (
  <MaxWidthBox m={'auto'} maxWidth={'500px'} paddingLeft={'50px'} paddingRight={'50px'}>
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
    <ManageAccountForm mode={ManageAccountModes.EDIT} />

    <MediaQuery minWidth={theme.screens.smUp} maxWidth={'986px'}>
      <BackgroundImage
        right={'2%'}
        top={'178px'}
        src={Drone}
        imgHeight={'99px'}
        position={'fixed' as 'fixed'}
      />
    </MediaQuery>

    <MediaQuery minWidth={'987px'} maxWidth={'1199px'}>
      <BackgroundImage
        right={'5%'}
        top={'150px'}
        src={Drone}
        imgHeight={'133px'}
        position={'fixed' as 'fixed'}
      />
      <BackgroundImage
        left={'2%'}
        bottom={'2%'}
        src={Bulby}
        imgHeight={'190px'}
        position={'fixed' as 'fixed'}
      />
    </MediaQuery>

    <MediaQuery minWidth={'1200px'}>
      <BackgroundImage
        right={'10%'}
        top={'178px'}
        src={Drone}
        imgHeight={'133px'}
        position={'fixed' as 'fixed'}
      />
      <BackgroundImage
        left={'3%'}
        bottom={'6%'}
        src={Bulby}
        imgHeight={'250px'}
        position={'fixed' as 'fixed'}
      />
    </MediaQuery>
  </MaxWidthBox>
);

export default EditAccountPage;
