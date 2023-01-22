import * as React from 'react';

import { ITravel } from '../../config';

interface ITravelStatusProps {
  travel: ITravel;
}

const TravelStatusNone: React.FunctionComponent<ITravelStatusProps> = ({
  travel,
}) => {
  return (
    <div>
      Your request to recieve ${travel.request.toFixed(2)} in reimbursement for
      travel is still being processed.
    </div>
  );
};

export default TravelStatusNone;
