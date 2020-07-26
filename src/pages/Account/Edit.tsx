import React from 'react';
import ManageAccountContainer, {
  ManageAccountModes,
} from '../../features/Account/ManageAccountForm';

const EditAccountPage: React.FC = () => (
  <ManageAccountContainer mode={ManageAccountModes.EDIT} />
);

export default EditAccountPage;
