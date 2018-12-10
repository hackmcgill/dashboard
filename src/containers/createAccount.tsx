import * as React from 'react';
import ManageAccount, { ManageAccountModes } from "src/containers/manageAccount";
import { RouteProps } from 'react-router';

const CreateAccount = (props: RouteProps) => {
    return <ManageAccount mode={ManageAccountModes.CREATE} {...props} />
}

export default CreateAccount;
