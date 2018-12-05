import * as React from 'react';
import ManageAccount, { ManageAccountModes } from "src/containers/manageAccount";

const CreateAccount = () =>
    <ManageAccount mode={ManageAccountModes.CREATE} />

export default CreateAccount;