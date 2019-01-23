import * as React from 'react';
import { RouteProps } from 'react-router';
import ManageSponsor, { ManageSponsorModes } from './SponsorManagement';

const CreateSponsorContainer = (props: RouteProps) => {
  return <ManageSponsor mode={ManageSponsorModes.CREATE} {...props} />;
};

export default CreateSponsorContainer;
