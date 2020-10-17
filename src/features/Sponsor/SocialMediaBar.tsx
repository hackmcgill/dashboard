import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import { Image } from '../../shared/Elements';
import Facebook from '../../assets/images/fb-logo.svg';
import Instagram from '../../assets/images/ig-logo.svg';
import Twitter from '../../assets/images/twitter-logo.svg';
import GitHub from '../../assets/images/github-logo.svg';

export interface SocialMediaBarProps {
  pt?: string;
  pb?: string;
}

const SocialMediaBar = (props: SocialMediaBarProps) => {
  return (
    <Flex alignItems={'center'} pr={'45px'} pt={props.pt} pb={props.pb}>
      <Box className="box">
        <a href="https://www.facebook.com/mcgillhacks/" target="_blank">
          <Image src={Facebook} />
        </a>
      </Box>
      <Box className="box">
        <a href="https://www.instagram.com/mcgillhacks/" target="_blank">
          <Image src={Instagram} />
        </a>
      </Box>
      <Box className="box">
        <a
          href="https://twitter.com/McGillHacks?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
          target="_blank"
        >
          <Image src={Twitter} />
        </a>
      </Box>
      <Box className="box">
        <a href="https://github.com/hackmcgill" target="_blank">
          <Image src={GitHub} />
        </a>
      </Box>
      <style jsx>
        {`
          .box {
            padding-right: 20px;
          }
        `}
      </style>
    </Flex>
  );
};

export default SocialMediaBar;
