import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import Helmet from 'react-helmet';
import { RouteComponentProps, withRouter } from 'react-router';
import { LinkDuo } from '../shared/Elements';

import { HACKATHON_NAME } from '../config';

import Construction from '../assets/images/construction-notfound.svg';

import Button from '../shared/Elements/Button';
import H1 from '../shared/Elements/H1';
import Image from '../shared/Elements/Image';
import MaxWidthBox from '../shared/Elements/MaxWidthBox';
import Paragraph from '../shared/Elements/Paragraph';

/**
 * Container that renders 404 not found page.
 */
class NotFoundContainer extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Flex
        flexWrap={'wrap'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        px={3}
      >
        <Helmet>
          <title>Page not found | {HACKATHON_NAME}</title>
        </Helmet>
        <Box>
          <Image src={Construction} imgHeight={'7rem'} padding={'0rem'} />
        </Box>
        <Box>
          <H1>404: Page not Found</H1>
        </Box>
        <MaxWidthBox fontSize={[2, 3, 4]}>
          <Paragraph paddingBottom={'20px'} textAlign={'center'}>
            The page you're looking for doesn't exist or has been moved
          </Paragraph>
        </MaxWidthBox>
        <Box width={'100%'}>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <Box>
              <LinkDuo to={'/'}>
                <Button type="button">Click to go home</Button>
              </LinkDuo>
            </Box>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default withRouter(NotFoundContainer);
