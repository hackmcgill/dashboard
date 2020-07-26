import React from 'react';
import ManageAccountContainer, {
  ManageAccountModes,
} from '../../features/Account/ManageAccountContainer';

const CreateAccountPage: React.FC = () => {
  return <ManageAccountContainer mode={ManageAccountModes.CREATE} />;
};

export default CreateAccountPage;
