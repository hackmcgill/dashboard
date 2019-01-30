import * as React from 'react';

import { Box } from '@rebass/grid';

interface ILinkProps {
  link?: string;
  linkText?: string;
  label: string;
  newTab?: boolean;
}

const SingleHackerLink: React.SFC<ILinkProps> = ({
  link,
  linkText,
  label,
  newTab,
}) => {
  return (
    <Box width={[1, 1 / 2]}>
      <strong>{label}</strong>:{' '}
      {link ? (
        <a href={link} target={newTab ? '_blank' : ''}>
          {linkText ? linkText : link}
        </a>
      ) : (
        'None'
      )}
    </Box>
  );
};

export default SingleHackerLink;
