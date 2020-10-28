import React, { useEffect, useState } from 'react';
import { Account } from '../../api';
import Hacker from '../../api/hacker';
import { HackerStatus, IAccount } from '../../config';
import WithToasterContainer from '../../shared/HOC/withToaster';
import { isConfirmed } from '../../util';
import StatusPage from '../Status/StatusPage';

const HackerDashboard: React.FC = () => {
  // Account object for logged in hacker
  const [account, setAccount] = useState<IAccount>(Object());

  // Currently logged in hacker's status (e.g. APPLIED, CONFIRMED, etc.)
  const [status, setStatus] = useState<HackerStatus>(HackerStatus.HACKER_STATUS_NONE);

  // Is the currently logged in hacker confirmed as attending event?
  const [confirmed, setConfirmed] = useState<boolean>(false);

  // Has the page finished loading needed data
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // When component mounts, figure out user's account type
  useEffect(() => {
    (async () => {
      try {
        const response = await Account.getSelf();
        setAccount(response.data.data);
      } catch (e) {
        // Should not set the account if it doesn't exist.
      }

      // Set hacker status
      try {
        const response = await Hacker.getSelf();
        setStatus(response.data.data.status);
      } catch (e) {
        if (e.status === 401) {
          setStatus(HackerStatus.HACKER_STATUS_NONE);
        }
      }

      // Check if hacker is confirmed
      try {
        setConfirmed(await isConfirmed());
      } catch (e) {
        setConfirmed(false);
      }

      // Whatever the results are, we've finshed loading at this point
      setIsLoaded(true);
    })();
  }, []);

  // this will prevent loading the default confirm email component page if the componentDidMount has not finished it's async methods
  return isLoaded ? <StatusPage {...{ account, status, confirmed }} /> : null;
}

export default WithToasterContainer(HackerDashboard);
