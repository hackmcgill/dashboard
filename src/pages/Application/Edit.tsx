import * as React from 'react';
import ManageApplicationContainer, {
  ManageApplicationModes,
} from '../../features/Application/ManageApplicationContainer';

const EditApplicationContainer = () => (
  <ManageApplicationContainer mode={ManageApplicationModes.EDIT} />
);

export default EditApplicationContainer;
