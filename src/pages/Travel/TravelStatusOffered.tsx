import * as React from 'react';

import { ITravel, TRAVEL_RECEIPTS_FORM } from '../../config';
import { LinkDuo } from '../../shared/Elements';
import DollarAmount from './DollarAmount';

interface ITravelStatusProps {
  travel: ITravel;
}

const TravelStatusOffered: React.FunctionComponent<ITravelStatusProps> = ({
  travel,
}) => {
  if (travel.offer > 0) {
    return (
      <div>
        We're happy to offer an amount to subsidize your travel to McHacks. We
        can reimburse you up to:
        <DollarAmount amount={travel.offer} />
        <div
          style={{
            textAlign: 'center',
            border: '2px dashed #ddd',
            padding: '8px 0',
          }}
        >
          Please{' '}
          <LinkDuo to={TRAVEL_RECEIPTS_FORM}>upload your receipts</LinkDuo>.
        </div>
      </div>
    );
  } else {
    return (
      <div>
        Unfortunately, we’re unable to offer you any travel reimbursement to
        McHacks.
        <DollarAmount amount={travel.offer} />
      </div>
    );
  }
};

export default TravelStatusOffered;
