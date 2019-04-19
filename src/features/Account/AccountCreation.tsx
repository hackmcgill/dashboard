import * as React from 'react';
import { RouteProps } from 'react-router';
import ManageAccount, { ManageAccountModes } from './AccountManagement';

const CreateAccount = (props: RouteProps) => {
  return <ManageAccount mode={ManageAccountModes.CREATE} {...props} />;
};

export default CreateAccount;
