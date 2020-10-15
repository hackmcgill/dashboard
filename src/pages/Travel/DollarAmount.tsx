import * as React from 'react';

import { H2 } from '../../shared/Elements';

const DollarAmount: React.FunctionComponent<{ amount: number }> = ({
  amount,
}) => (
  <H2
    fontSize={'30px'}
    textAlign={'center'}
    marginTop={'30px'}
    marginBottom={'30px'}
    fontWeight={'normal'}
  >
    ${amount.toFixed(2)}
  </H2>
);

export default DollarAmount;
