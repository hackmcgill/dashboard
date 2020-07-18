import * as React from 'react';
import ManageApplicationContainer, {
  ManageApplicationModes,
} from '../../features/Application/ManageApplicationContainer';

const CreateApplicationContainer = () => (
  <ManageApplicationContainer mode={ManageApplicationModes.CREATE} />
);

export default CreateApplicationContainer;
