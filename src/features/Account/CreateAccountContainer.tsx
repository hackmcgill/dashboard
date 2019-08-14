import * as React from 'react';
import { RouteProps } from 'react-router';
import ManageAccountContainer, {
  ManageAccountModes,
} from './ManageAccountContainer';

const CreateAccountContainer = (props: RouteProps) => {
  return <ManageAccountContainer mode={ManageAccountModes.CREATE} {...props} />;
};

export default CreateAccountContainer;
