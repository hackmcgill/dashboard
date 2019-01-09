import * as React from 'react';
import ManageAccount, { ManageAccountModes } from './AccountManagement';

const EditAccount = () => <ManageAccount mode={ManageAccountModes.EDIT} />;

export default EditAccount;
