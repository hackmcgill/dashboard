import * as React from 'react';

import {
  BUS_SHOPIFY_PAGE,
  BUS_SLACK_CHANNEL,
  BUS_SLACK_PAGE,
  ITravel,
} from '../../config';
import { LinkDuo } from '../../shared/Elements';

interface ITravelStatusProps {
  travel: ITravel;
}

const TravelStatusBus: React.FunctionComponent<ITravelStatusProps> = ({
  travel,
}) => {
  return (
    <div>
      Congratulations, you've secured a seat on our Toronto bus to/from McHacks!
      <br />
      <br />
      <h2>Bus</h2>
      Join the {BUS_SLACK_CHANNEL} on our official{' '}
      <LinkDuo to={BUS_SLACK_PAGE}>Slack</LinkDuo> for details and more
      information about your bus route.
      <br />
      <br />
      If you can no longer make it to McHacks, please{' '}
      <LinkDuo to={BUS_SHOPIFY_PAGE}>contact</LinkDuo>
      us so we can refund your deposit and open the seat up to another hacker.
    </div>
  );
};

export default TravelStatusBus;
