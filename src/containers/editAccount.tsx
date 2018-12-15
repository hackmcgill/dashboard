import * as React from 'react';
import ManageAccount, { ManageAccountModes } from '../containers/manageAccount';

const EditAccount = () => <ManageAccount mode={ManageAccountModes.EDIT} />;

export default EditAccount;
