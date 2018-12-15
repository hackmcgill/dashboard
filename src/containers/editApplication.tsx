import * as React from 'react';
import ManageApplication, {
  ManageApplicationModes,
} from '../components/applicationComponent';

const EditApplicationContainer = () => (
  <ManageApplication mode={ManageApplicationModes.EDIT} />
);

export default EditApplicationContainer;
