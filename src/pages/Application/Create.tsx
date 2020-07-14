import React from 'react';
import ManageApplicationContainer, {
  ManageApplicationModes,
} from '../../features/Application/ManageApplicationContainer';

const CreateApplicationPage: React.FC = () => (
  <ManageApplicationContainer mode={ManageApplicationModes.CREATE} />
);

export default CreateApplicationPage;
