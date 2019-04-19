import * as React from 'react';
import ManageApplication, {
  ManageApplicationModes,
} from './ApplicationManagement';

const CreateApplication = () => (
  <ManageApplication mode={ManageApplicationModes.CREATE} />
);

export default CreateApplication;
