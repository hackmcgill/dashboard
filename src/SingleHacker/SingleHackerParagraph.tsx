import * as React from 'react';

import { Box } from '@rebass/grid';
import { Paragraph } from '../shared/Elements';

interface IParagraphProps {
  text: string | number | undefined;
  label: string;
}

const SingleHackerParagraph: React.SFC<IParagraphProps> = ({ text, label }) => {
  return (
    <Box width={1}>
      <strong>{label}</strong>{' '}
      <Paragraph fontSize="16px">{text || 'N/A'}</Paragraph>
    </Box>
  );
};

export default SingleHackerParagraph;
