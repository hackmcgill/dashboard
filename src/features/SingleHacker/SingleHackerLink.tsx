import * as React from 'react';

import { Box } from '@rebass/grid';

interface ILinkProps {
  link?: string;
  linkText?: string;
  label: string;
  fullWidth?: boolean;
}

const SingleHackerLink: React.FunctionComponent<ILinkProps> = ({
  link,
  linkText,
  label,
  fullWidth = false,
}) => {
  const width = fullWidth ? 1 : [1, 1 / 2];
  if (link) {
    const normalized = link.trim();
    const href =
      normalized.startsWith('http://') || normalized.startsWith('https://')
        ? normalized
        : `https://${normalized}`;
    let target = '';
    try {
      const url = new URL(href);
      target = ['https:', 'http:'].indexOf(url.protocol) !== -1 ? '_blank' : '';
    } catch {
      return (
        <Box width={width}>
          <strong>{label}</strong>: {link}
        </Box>
      );
    }
    return (
      <Box width={width}>
        <strong>{label}</strong>:{' '}
        <a href={href} target={target}>
          {linkText ? linkText : link}
        </a>
      </Box>
    );
  } else {
    return (
      <Box width={width}>
        <strong>{label}</strong>: None
      </Box>
    );
  }
};

export default SingleHackerLink;
