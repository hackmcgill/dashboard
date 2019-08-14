import * as React from 'react';
import ManageAccountContainer, {
  ManageAccountModes,
} from './ManageAccountContainer';

const EditAccountContainer = () => (
  <ManageAccountContainer mode={ManageAccountModes.EDIT} />
);

export default EditAccountContainer;
