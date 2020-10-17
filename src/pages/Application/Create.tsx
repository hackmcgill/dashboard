import React from 'react';
import Helmet from 'react-helmet';

import {
  BackgroundImage,
  FormDescription,
  H1,
  MaxWidthBox,
} from '../../shared/Elements';

import ManageApplicationForm, {
  ManageApplicationModes,
} from '../../features/Application/ManageApplicationForm';

import * as CONSTANTS from '../../config/constants';
import theme from '../../shared/Styles/theme';

import Bulby from '../../assets/images/bulby.svg';
import Drone from '../../assets/images/drone.svg';

const CreateApplicationPage: React.FC = () => (
  <MaxWidthBox m={'auto'} maxWidth={'500px'}>
    <Helmet>
      <title>Create Application | {CONSTANTS.HACKATHON_NAME}</title>
    </Helmet>

    <H1
      color={theme.colors.red}
      fontSize={'30px'}
      textAlign={'left'}
      marginTop={'0px'}
      marginBottom={'20px'}
      marginLeft={'0px'}
      paddingBottom={'20px'}
      paddingTop={'70px'}
    >
      Create your Application
    </H1>
    <FormDescription>{CONSTANTS.REQUIRED_DESCRIPTION}</FormDescription>

    <ManageApplicationForm mode={ManageApplicationModes.CREATE} />

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
  </MaxWidthBox>
);

export default CreateApplicationPage;
