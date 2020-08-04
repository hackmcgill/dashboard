import React from 'react';
import Helmet from 'react-helmet';
import ManageAccountForm, { ManageAccountModes } from '../../features/Account/ManageAccountForm';

import * as CONSTANTS from '../../config/constants';
import {
  BackgroundImage,
  H1,
  MaxWidthBox,
} from '../../shared/Elements';
import MediaQuery from 'react-responsive';

import Coders from '../../assets/images/coders.svg';

const CreateAccountPage: React.FC = () => (
  <>
    <Helmet>
      <title>
        Create Account | {CONSTANTS.HACKATHON_NAME}
      </title>
    </Helmet>

    <MediaQuery maxWidth="991px">
      <MaxWidthBox m={'auto'} paddingLeft={'50px'} paddingRight={'50px'} maxWidth={'500px'}>
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
        <ManageAccountForm mode={ManageAccountModes.CREATE} />
      </MaxWidthBox>
    </MediaQuery>

    <MediaQuery minWidth="992px">
      <MaxWidthBox paddingLeft={'100px'} paddingRight={'50px'} maxWidth={'500px'}>
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
        <ManageAccountForm mode={ManageAccountModes.CREATE} />
      </MaxWidthBox>
    </MediaQuery>

    <MediaQuery minWidth="992px" maxWidth="1093px">
      <BackgroundImage
        src={Coders}
        top={'60px'}
        right={'0px'}
        imgHeight={'70%'}
      />
    </MediaQuery>
    <MediaQuery minWidth="1094px" maxWidth="1199px">
      <BackgroundImage
        src={Coders}
        top={'60px'}
        right={'0px'}
        imgHeight={'80%'}
      />
    </MediaQuery>
    <MediaQuery minWidth="1200px">
      <BackgroundImage
        src={Coders}
        top={'60px'}
        right={'0px'}
        imgHeight={'90%'}
        position={'fixed' as 'fixed'}
      />
    </MediaQuery>
  </>
);

export default CreateAccountPage;
