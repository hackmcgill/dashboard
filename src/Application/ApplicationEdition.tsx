import * as React from 'react';
import ManageApplication, {
  ManageApplicationModes,
} from './ApplicationManagement';

const EditApplicationContainer = () => (
  <ManageApplication mode={ManageApplicationModes.EDIT} />
);

export default EditApplicationContainer;
