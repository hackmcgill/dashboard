import React, { useEffect, useState } from 'react';
import { Account } from '../../api';
import Hacker from '../../api/hacker';
import { HackerStatus, HackerReviewerStatus, IAccount } from '../../config';
import WithToasterContainer from '../../shared/HOC/withToaster';
import { isConfirmed } from '../../util';
import StatusCTAContainer from '../Status/StatusCTAContainer';

const HackerDashboard: React.FC = () => {
  // Account object for logged in hacker
  const [account, setAccount] = useState<IAccount>(Object());

  // Currently logged in hacker's status (e.g. APPLIED, CONFIRMED, etc.)
  const [status, setStatus] = useState<HackerStatus>(
    HackerStatus.HACKER_STATUS_NONE
  );

  const [reviewerStatus, setReviewerStatus] = useState<HackerReviewerStatus>(
    HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE
  );
  const [reviewerStatus2, setReviewerStatus2] = useState<HackerReviewerStatus>(
    HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE
  );

  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewerName2, setReviewerName2] = useState<string>('');

  const [reviewerComments, setReviewerComments] = useState<string>('');
  const [reviewerComments2, setReviewerComments2] = useState<string>('');

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
      } catch (e: any) {
        if (e.status === 401) {
          setStatus(HackerStatus.HACKER_STATUS_NONE);
        }
      }

      // Set hacker reviewer status
      try {
        const response = await Hacker.getSelf();
        setReviewerStatus(response.data.data.reviewerStatus);
      } catch (e: any) {
          setReviewerStatus(HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE);
      }

      // Set hacker reviewer status 2
      try {
        const response = await Hacker.getSelf();
        setReviewerStatus2(response.data.data.reviewerStatus2);
      } catch (e: any) {
          setReviewerStatus2(HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE);
      }

      // Set hacker reviewer name 
      try {
        const response = await Hacker.getSelf();
        setReviewerName(response.data.data.reviewerName);
      } catch (e: any) {
          setReviewerName('');
      }

      // Set hacker reviewer name 2
      try {
        const response = await Hacker.getSelf();
        setReviewerName2(response.data.data.reviewerName2);
      } catch (e: any) {
          setReviewerName2('');
      }

      // Set hacker reviewer comments
      try {
        const response = await Hacker.getSelf();
        setReviewerComments(response.data.data.reviewerComments);
      } catch (e: any) {
          setReviewerComments('');
      }

      // Set hacker reviewer comments 2
      try {
        const response = await Hacker.getSelf();
        setReviewerComments2(response.data.data.reviewerComments2);
      } catch (e: any) {
          setReviewerComments2('');
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
  return isLoaded ? (
    <StatusCTAContainer {...{ account, status, confirmed }} /> // reviewerStatus
  ) : null;
};

export default WithToasterContainer(HackerDashboard);
