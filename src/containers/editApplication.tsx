import * as React from 'react';
import ManageApplication, { ManageApplicationModes } from 'src/components/applicationComponent';

const EditApplicationContainer = () =>
    <ManageApplication mode={ManageApplicationModes.EDIT} />;

export default EditApplicationContainer;