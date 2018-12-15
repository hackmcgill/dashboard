import * as React from 'react';
import Footer from '../shared/Footer';
import { Flex, Box } from '@rebass/grid';

import Image from '../shared/Image';

import Facebook from '../assets/images/facebook.svg';
import Twitter from '../assets/images/twitter.svg';
import Instagram from '../assets/images/instagram.svg';
import Github from '../assets/images/github.svg';
import Mailto from '../assets/images/mailto.svg';
import SocialLink from '../shared/SocialLink';

interface IFooterProps {
    showDivider?: boolean;
}

const Navbar: React.StatelessComponent<IFooterProps> = (props) => {
    return (
        <Footer borderThickness={props.showDivider ? '1px' : '0px'} >
            <Flex flexDirection={'row'} justifyContent={'flex-end'} width={'100%'} >
                <Box p={'0.4rem'}>
                    <SocialLink href="https://fb.com/mcgillhacks">
                        <Image src={Facebook} imgHeight={'15px'} />
                    </SocialLink>
                </Box>
                <Box p={'0.4rem'}>
                    <SocialLink href="https://twitter.com/mcgillhacks">
                        <Image src={Twitter} imgHeight={'15px'} />
                    </SocialLink>
                </Box>
                <Box p={'0.4rem'}>
                    <SocialLink href="https://twitter.com/mcgillhacks">
                        <Image src={Instagram} imgHeight={'15px'} />
                    </SocialLink>
                </Box>
                <Box p={'0.4rem'}>
                    <SocialLink href="https://github.com/hackmcgill">
                        <Image src={Github} imgHeight={'15px'} />
                    </SocialLink>
                </Box>
                <Box p={'0.4rem'} pr={'0.5rem'}>
                    <SocialLink href="mailto:contact@mchacks.ca?Subject=Hello!">
                        <Image src={Mailto} imgHeight={'15px'} />
                    </SocialLink>
                </Box>
            </Flex>
        </Footer >
    );
}

export default Navbar;