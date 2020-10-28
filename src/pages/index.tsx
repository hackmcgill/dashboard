import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { UserType } from '../config';
import { H1 } from '../shared/Elements';
import { getUserInfo } from '../util';
import HackerDashboard from '../features/Dashboard/HackerDashboard';
import SponsorDashboard from '../features/Dashboard/SponsorDashboard';
import StaffDashboardContainer from '../features/Dashboard/StaffDashboard';

const DashboardPage: React.FC = () => {
  // Until we figure out what type of user account we are dealing with, store as UNKNOWN
  const [accountType, setAccountType] = useState<UserType>(UserType.UNKNOWN);

  // Track if we are still loading data or not
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // When component mounts, figure out user's account type
  useEffect(() => {
    (async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setAccountType(userInfo.accountType);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  switch (accountType) {
    case UserType.HACKER:
      return <HackerDashboard />;
    case UserType.STAFF:
      return <StaffDashboardContainer />;
    case UserType.SPONSOR_T1:
      return <SponsorDashboard userType={UserType.SPONSOR_T1} />;
    case UserType.SPONSOR_T2:
      return <SponsorDashboard userType={UserType.SPONSOR_T2} />;
    case UserType.SPONSOR_T3:
      return <SponsorDashboard userType={UserType.SPONSOR_T3} />;
    case UserType.SPONSOR_T4:
      return <SponsorDashboard userType={UserType.SPONSOR_T4} />;
    case UserType.SPONSOR_T5:
      return <SponsorDashboard userType={UserType.SPONSOR_T5} />;
  }

  if (isLoading) {
    return <H1>Loading...</H1>;
  }

  return <Redirect to={'/404'} />;
}

export default DashboardPage;
