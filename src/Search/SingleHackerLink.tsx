import * as React from 'react';

import { Box } from '@rebass/grid';

interface ILinkProps {
  link: string | undefined;
  label: string;
}

const SingleHackerLink: React.SFC<ILinkProps> = ({ link, label }) => {
  return (
    <Box width={[1, 1 / 2]}>
      <strong>{label}</strong>:{' '}
      {link ? (
        <a href={link} target="_blank">
          {link}
        </a>
      ) : (
        'None'
      )}
    </Box>
  );
};

export default SingleHackerLink;
