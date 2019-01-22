import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import Footer from '../shared/Elements/Footer';

import Image from '../shared/Elements/Image';

import Facebook from '../assets/images/facebook.svg';
import Github from '../assets/images/github.svg';
import Instagram from '../assets/images/instagram.svg';
import Mailto from '../assets/images/mailto.svg';
import Twitter from '../assets/images/twitter.svg';
import SocialLink from '../shared/Elements/SocialLink';

interface IFooterProps {
  showDivider?: boolean;
}

export const FooterComponent: React.StatelessComponent<IFooterProps> = (
  props
) => {
  const imageHeight = '25px';
  return (
    <Footer>
      <Flex flexDirection={'row'} justifyContent={'flex-end'} width={'100%'}>
        <Box p={'0.4rem'}>
          <SocialLink href="https://fb.com/mcgillhacks">
            <Image src={Facebook} imgHeight={imageHeight} />
          </SocialLink>
        </Box>
        <Box p={'0.4rem'}>
          <SocialLink href="https://twitter.com/mcgillhacks">
            <Image src={Twitter} imgHeight={imageHeight} />
          </SocialLink>
        </Box>
        <Box p={'0.4rem'}>
          <SocialLink href="https://instagram.com/mcgillhacks/">
            <Image src={Instagram} imgHeight={imageHeight} />
          </SocialLink>
        </Box>
        <Box p={'0.4rem'}>
          <SocialLink href="https://github.com/hackmcgill">
            <Image src={Github} imgHeight={imageHeight} />
          </SocialLink>
        </Box>
        <Box p={'0.4rem'} pr={'0.9rem'}>
          <SocialLink href="mailto:contact@mchacks.ca?Subject=Hello!">
            <Image src={Mailto} imgHeight={imageHeight} />
          </SocialLink>
        </Box>
      </Flex>
    </Footer>
  );
};

export default FooterComponent;
