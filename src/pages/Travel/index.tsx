import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

import { Travel } from '../../api';
import { HACKATHON_NAME, ITravel, TRAVEL_POLICY } from '../../config';
import {
  BackgroundImage,
  H1,
  LinkDuo,
  MaxWidthBox,
} from '../../shared/Elements';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';

import Train from '../../assets/images/train.svg';

import TravelStatusBus from './TravelStatusBus';
import TravelStatusClaimed from './TravelStatusClaimed';
import TravelStatusNone from './TravelStatusNone';
import TravelStatusOffered from './TravelStatusOffered';
import TravelStatusPolicy from './TravelStatusPolicy';

/**
 * Container that renders form to log in.
 */
const TravelPage: React.FC = () => {
  // Travel details for signed in hacker
  const [travel, setTravel] = useState<ITravel | null>(null);

  // Is the page currently waiting for data?
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // When this component mounts, get signed in hacker's travel info
  useEffect(() => {
    (async () => {
      try {
        const newTravel = (await Travel.getSelf()).data.data;
        setTravel(newTravel);
      } catch (e) {
        if (e && e.data) {
          ValidationErrorGenerator(e.data);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  let reimbursement = (
    <div>We don't have a request for a reimbursement from you.</div>
  );
  if (travel) {
    switch (travel.status) {
      case 'None':
        reimbursement = <TravelStatusNone travel={travel} />;
        break;
      case 'Bus':
        reimbursement = <TravelStatusBus travel={travel} />;
        break;
      case 'Policy':
        reimbursement = <TravelStatusPolicy travel={travel} />;
        break;
      case 'Offered':
      case 'Valid':
      case 'Invalid':
        // TODO: Handle Valid and Invalid cases once reciepts are handled
        reimbursement = <TravelStatusOffered travel={travel} />;
        break;
      case 'Claimed':
        // TODO: Handle Valid and Invalid cases once reciepts are handled
        reimbursement = <TravelStatusClaimed travel={travel} />;
        break;
    }
  }

  return (
    <div>
      <Helmet>
        <title>Travel | {HACKATHON_NAME}</title>
      </Helmet>
      {isLoading ? (
        <div />
      ) : (
        <MaxWidthBox maxWidth={'400px'} mx={[5, 'auto']}>
          <H1 fontSize={'30px'} marginTop={'100px'} marginLeft={'0px'}>
            Travel
          </H1>
          <h2>Status</h2>
          {reimbursement}
          <br />
          <br />
          <div>
            Please ensure you've reviewed our{' '}
            <LinkDuo to={TRAVEL_POLICY}>travel policy</LinkDuo> if using any of
            our travel accommodation options.
          </div>
        </MaxWidthBox>
      )}
      <BackgroundImage
        right={'0'}
        bottom={'0'}
        src={Train}
        imgWidth={'80%'}
        position={'fixed' as 'fixed'}
      />
    </div>
  );
};

export default WithToasterContainer(TravelPage);
