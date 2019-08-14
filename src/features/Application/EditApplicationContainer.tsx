import * as React from 'react';
import ManageApplicationContainer, {
  ManageApplicationModes,
} from './ManageApplicationContainer';

const EditApplicationContainer = () => (
  <ManageApplicationContainer mode={ManageApplicationModes.EDIT} />
);

export default EditApplicationContainer;
