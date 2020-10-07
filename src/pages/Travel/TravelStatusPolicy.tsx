import * as React from 'react';

import { ITravel, TRAVEL_POLICY } from '../../config';
import { Button, LinkDuo } from '../../shared/Elements';

interface ITravelStatusProps {
  travel: ITravel;
}

const TravelStatusPolicy: React.FunctionComponent<ITravelStatusProps> = () => {
  return (
    <div>
      Your travel reimbursement decision has been released. In order to see how
      much you will be reimbursed, you must first agree to our{' '}
      <LinkDuo to={TRAVEL_POLICY}>travel policy</LinkDuo>.
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Button>I agree to McHacks Travel Policy</Button>
      </div>
    </div>
  );
};

export default TravelStatusPolicy;
