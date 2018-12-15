import * as React from 'react';
import { RouteProps } from 'react-router';
import ManageAccount, { ManageAccountModes } from '../containers/manageAccount';

const CreateAccount = (props: RouteProps) => {
    return <ManageAccount mode={ManageAccountModes.CREATE} {...props} />;
};

export default CreateAccount;
