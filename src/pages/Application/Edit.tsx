import React from 'react';
import Helmet from 'react-helmet';

import ManageApplicationForm, {
  ManageApplicationModes,
} from '../../features/Application/ManageApplicationForm';

import * as CONSTANTS from '../../config/constants';

const EditApplicationPage: React.FC = () => (
  <>
    <Helmet>
      <title>Edit Application | {CONSTANTS.HACKATHON_NAME}</title>
    </Helmet>

    <ManageApplicationForm mode={ManageApplicationModes.EDIT} />
  </>
);

export default EditApplicationPage;
