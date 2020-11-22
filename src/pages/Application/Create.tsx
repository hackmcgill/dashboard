import React from 'react';
import Helmet from 'react-helmet';

import ManageApplicationForm, {
  ManageApplicationModes,
} from '../../features/Application/ManageApplicationForm';

import * as CONSTANTS from '../../config/constants';

const CreateApplicationPage: React.FC = () => (
  <>
    <Helmet>
      <title>Create Application | {CONSTANTS.HACKATHON_NAME}</title>
    </Helmet>

    <ManageApplicationForm mode={ManageApplicationModes.CREATE} />
  </>
);

export default CreateApplicationPage;
