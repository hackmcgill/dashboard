import * as React from 'react';

import { Box } from '@rebass/grid';

interface ILinkProps {
  link?: string;
  linkText?: string;
  label: string;
}

const SingleHackerLink: React.SFC<ILinkProps> = ({ link, linkText, label }) => {
  if (link) {
    const url = new URL(link);
    const target =
      ['https:', 'http:'].indexOf(url.protocol) === -1 ? '' : '_blank';
    return (
      <Box width={[1, 1 / 2]}>
        <strong>{label}</strong>:{' '}
        <a href={link} target={target}>
          {linkText ? linkText : link}
        </a>
      </Box>
    );
  } else {
    return (
      <Box width={[1, 1 / 2]}>
        <strong>{label}</strong>: None
      </Box>
    );
  }
};

export default SingleHackerLink;
