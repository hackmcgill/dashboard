import React from 'react';
import Helmet from 'react-helmet';

import { MaxWidthBox } from '../../shared/Elements';

import ManageApplicationForm, {
  ManageApplicationModes,
} from '../../features/Application/ManageApplicationForm';

import * as CONSTANTS from '../../config/constants';
import withBackground from '../../shared/HOC/withBackground';


const CreateApplicationPage: React.FC = () => (
  <MaxWidthBox m={'auto'} maxWidth={'1000px'}>
    <Helmet>
      <title>Create Application | {CONSTANTS.HACKATHON_NAME}</title>
    </Helmet>

    <ManageApplicationForm mode={ManageApplicationModes.CREATE} />
  </MaxWidthBox>
);

export default withBackground(CreateApplicationPage);
