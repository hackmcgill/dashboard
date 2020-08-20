import * as React from 'react';
import { RouteProps } from 'react-router';
import ManageSponsor, {
  ManageSponsorModes,
} from '../../features/Sponsor/SponsorProfileForm';

const EditSponsorPage: React.FC = (props: RouteProps) => {
  return <ManageSponsor mode={ManageSponsorModes.EDIT} {...props} />;
};

export default EditSponsorPage;
