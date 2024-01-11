import * as React from 'react';

import { Box } from '@rebass/grid';

interface IFieldProps {
  text: string | number | undefined;
  label: string;
}

const SingleHackerField: React.FunctionComponent<IFieldProps> = ({
  text,
  label,
}) => {
  return (
    <Box width={[1, 1 / 2]}>
      <strong>{label}</strong>: {text}
    </Box>
  );
};

export default SingleHackerField;
