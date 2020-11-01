import React from 'react';
import Helmet from 'react-helmet';

import { HACKATHON_NAME } from '../../config/constants';
import InviteForm from '../../features/Invite/InviteForm';
import { H1, MaxWidthBox } from '../../shared/Elements';

const InvitePage: React.FC = () => (
  <>
    <Helmet>
      <title>Invite User | {HACKATHON_NAME}</title>
    </Helmet>
    <MaxWidthBox
      m={'auto'}
      maxWidth={'500px'}
      paddingLeft={'50px'}
      paddingRight={'50px'}
    >
      <H1
        fontSize={'30px'}
        textAlign={'left'}
        marginTop={'0px'}
        marginBottom={'20px'}
        marginLeft={'0px'}
        paddingBottom={'20px'}
        paddingTop={'70px'}
      >
        Invite User
      </H1>
      <InviteForm />
    </MaxWidthBox>
  </>
);

export default InvitePage;
