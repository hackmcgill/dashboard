import React from 'react';
import Helmet from 'react-helmet';

import { HACKATHON_NAME } from '../../config/constants';
import ExistingInvites from '../../features/Invite/ExistingInvites';
import InviteForm from '../../features/Invite/InviteForm';
import { H1, MaxWidthBox } from '../../shared/Elements';
import GridTwoColumn from '../../shared/Elements/GridTwoColumn';
import WithToaster from '../../shared/HOC/withToaster';

const InvitePage: React.FC = () => (
  <>
    <Helmet>
      <title>Invite User | {HACKATHON_NAME}</title>
    </Helmet>
    <MaxWidthBox m={'auto'} maxWidth={'1000px'}>
      <H1
        fontSize={'30px'}
        textAlign={'center'}
        marginTop={'0px'}
        marginBottom={'20px'}
        marginLeft={'0px'}
        paddingBottom={'20px'}
        paddingTop={'70px'}
      >
        User Invites
      </H1>
      <GridTwoColumn>
        <InviteForm />
        <ExistingInvites />
      </GridTwoColumn>
    </MaxWidthBox>
  </>
);

export default WithToaster(InvitePage);
