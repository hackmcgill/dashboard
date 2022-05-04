import { Box, Flex } from '@rebass/grid';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Account, Hacker } from '../../../api';
import { IHacker, UserType } from '../../../config';
import { H1, H2 } from '../../../shared/Elements';
import withContext from '../../../shared/HOC/withContext';

import HackerSelect from '../../../features/Search/HackerSelect';
import SingleHackerView from '../../../features/SingleHacker/SingleHackerView';

import NomineeContext from '../../../features/Search/Context';

const SingleHackerPage: React.FC = () => {
  // Is the page currently fetching data about the specified hacker
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Data on the hacker we are viewing
  const [hacker, setHacker] = useState<IHacker | null>(null);

  // The type of user viewing this page (Organzier, Sponsor_TIER, etc.)
  const [userType, setUserType] = useState<UserType>(UserType.UNKNOWN);

  // Get the id param from url's query
  const { id } = useParams();

  const nomineeContext = useContext(NomineeContext);

  // When this component mounts, load hackers data
  useEffect(() => {
    (async () => {
      try {
        const viewer = (await Account.getSelf()).data.data;
        console.log(viewer, viewer.accountType);
        setUserType(viewer.accountType);
        const newHacker = (await Hacker.get(id)).data.data;
        const account = (await Account.get(newHacker.accountId)).data.data;
        newHacker.account = account;
        setHacker(newHacker);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  // If data on hacker has loaded, display that hacker's info
  if (hacker) {
    return (
      <Flex justify-content={'center'} m={'10px'} flexDirection={'column'}>
        <Box m={'auto'}>
          <SingleHackerView
            hacker={hacker}
            account={hacker.account}
            userType={userType}
          />
          {nomineeContext && nomineeContext.nominees && (
            <>
              <hr />
              <Flex m={'auto'}>
                <Box>
                  <H2 marginBottom={'3px'}>Save Hacker:</H2>
                </Box>
                <Box>
                  <HackerSelect hackerId={hacker.identifier} />
                </Box>
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    );
  }

  // ... otherwise if still loading display loading state
  else if (isLoading) {
    return (
      <Flex alignItems={'center'}>
        <Box m={'auto'}>
          <H1>Loading...</H1>
        </Box>
      </Flex>
    );
  }

  // If not loading, but hacker data didn't return, in an error state so redirect to 404 page
  else {
    return <Redirect to={'/404'} />;
  }
};

export default withContext(SingleHackerPage);
