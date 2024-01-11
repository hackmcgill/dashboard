import React, { useEffect, useState } from 'react';
import { Account } from '../../api';
import { IInviteInfo } from '../../config';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import { ExistingInvitesTable } from './ExistingInvitesTable';

export const ExistingInvites: React.FC = () => {
  // Are we fetching the invites?
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Invites array
  const [invites, setInvites] = useState<IInviteInfo[]>([]);

  useEffect(() => {
    (async () => {
      // Load invites
      try {
        const result = await Account.getInvites();
        const allInvites = result.data.data.invites;
        console.log(allInvites);
        setInvites(allInvites);
      } catch (e: any) {
        if (e && e.data) {
          ValidationErrorGenerator(e);
        }
      }
      setIsLoading(false);
    })();
  }, []);
  return <ExistingInvitesTable invites={invites} isLoading={isLoading} />;
};

export default ExistingInvites;
