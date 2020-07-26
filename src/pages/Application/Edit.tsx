import React from 'react';
import ManageApplicationContainer, {
  ManageApplicationModes,
} from '../../features/Application/ManageApplicationContainer';

const EditApplicationPage: React.FC = () => (
  <ManageApplicationContainer mode={ManageApplicationModes.EDIT} />
);

export default EditApplicationPage;
