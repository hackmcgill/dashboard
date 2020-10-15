import * as React from 'react';

import { ITravel } from '../../config';
import DollarAmount from './DollarAmount';

interface ITravelStatusProps {
  travel: ITravel;
}

const TravelStatusClaimed: React.FunctionComponent<ITravelStatusProps> = ({
  travel,
}) => {
  return (
    <div>
      We reimbursed you for <DollarAmount amount={travel.offer} /> which you
      have already claimed.
    </div>
  );
};

export default TravelStatusClaimed;
