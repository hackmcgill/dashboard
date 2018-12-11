import * as React from 'react';
import ManageApplication, { ManageApplicationModes } from 'src/components/applicationComponent';

const CreateApplication = () =>
    <ManageApplication mode={ManageApplicationModes.CREATE} />;

export default CreateApplication;