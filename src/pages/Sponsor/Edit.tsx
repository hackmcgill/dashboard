import * as React from 'react';
import { RouteProps } from 'react-router';
import ManageSponsor, { ManageSponsorModes } from '../../features/Sponsor/SponsorManagement';

const EditSponsorPage: React.FC = (props: RouteProps) => {
  return <ManageSponsor mode={ManageSponsorModes.EDIT} {...props} />;
};

export default EditSponsorPage;
