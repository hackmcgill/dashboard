import React from 'react';
import Helmet from 'react-helmet';

import {
  BackgroundImage,
  MaxWidthBox,
} from '../../shared/Elements';

import ManageApplicationForm, {
  ManageApplicationModes,
} from '../../features/Application/ManageApplicationForm';

import * as CONSTANTS from '../../config/constants';
// import theme from '../../shared/Styles/theme';

import Bulby from '../../assets/images/bulby.svg';
import Drone from '../../assets/images/drone.svg';

const CreateApplicationPage: React.FC = () => (
  <MaxWidthBox m={'auto'} maxWidth={'1000px'}>
    <Helmet>
      <title>Create Application | {CONSTANTS.HACKATHON_NAME}</title>
    </Helmet>

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
