import * as React from 'react';

import { BUS_GENERAL_INFO, BUS_SHOPIFY_PAGE, ITravel } from '../../config';
import { LinkDuo } from '../../shared/Elements';

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
      <br />
      <br />
      <h2>Bus</h2>
      {BUS_GENERAL_INFO} <LinkDuo to={BUS_SHOPIFY_PAGE}>here</LinkDuo>.
    </div>
  );
};

export default TravelStatusNone;
