import { Box, Flex } from '@rebass/grid';
import React from 'react';
import { Image } from '../../shared/Elements';

import Facebook from '../../assets/images/fb-logo.svg';
import Instagram from '../../assets/images/ig-logo.svg';
import Twitter from '../../assets/images/twitter-logo.svg';
import GitHub from '../../assets/images/github-logo.svg';

const SocialMediaBar: React.FC = () => {
  return (
    <Flex alignItems={'center'} pr={'30px'}>
      <Box className="SocialMediaBar--box">
        <a href="https://www.facebook.com/mcgillhacks/" target="_blank" rel="noopener noreferrer">
          <Image src={Facebook} height="24px" />
        </a>
      </Box>
      <Box className="SocialMediaBar--box">
        <a href="https://www.instagram.com/mcgillhacks/" target="_blank" rel="noopener noreferrer">
          <Image src={Instagram} height="24px" />
        </a>
      </Box>
      <Box className="SocialMediaBar--box">
        <a
          href="https://twitter.com/McGillHacks?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={Twitter} height="24px" />
        </a>
      </Box>
      <Box className="SocialMediaBar--box">
        <a href="https://github.com/hackmcgill" target="_blank" rel="noopener noreferrer">
          <Image src={GitHub} height="24px" />
        </a>
      </Box>
      <style jsx>
        {`
          .SocialMediaBar--box {
            padding-right: 20px;
            transition: filter 0.25s ease-in;
          }

          .SocialMediaBar--box:hover {
            filter: invert(41%) sepia(9%) saturate(3131%) hue-rotate(197deg) brightness(92%) contrast(84%);
          }

          .SocialMediaBar--box a {
            display: flex;
          }
        `}
      </style>
    </Flex>
  );
};

export default SocialMediaBar;
