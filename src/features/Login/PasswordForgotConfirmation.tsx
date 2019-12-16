import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import Helmet from 'react-helmet';
// import { Link } from 'react-router-dom';

import resetLogo from '../../assets/images/passwordReset.svg';

// import { FrontendRoute } from '../../config';
import { H1, Image, MaxWidthBox, Paragraph } from '../../shared/Elements';

class PasswordResetEmailConfirmationContainer extends React.Component<{}, {}> {
  public render() {
    return (
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Helmet>
          <title>Password Sent | McHacks 6</title>
        </Helmet>
        <Flex alignItems={'center'}>
          <Box>
            <H1 paddingTop={'8rem'} text-align={'left'}>
              Password reset
            </H1>
          </Box>
        </Flex>
        <MaxWidthBox width={1} fontSize={[2, 3, 4]}>
          <Paragraph paddingBottom={'20px'} textAlign={'center'}>
            We've sent you a link to reset your password. Check your inbox and
            follow the instructions there.
          </Paragraph>
        </MaxWidthBox>
        <Box>
          <Image src={resetLogo} imgHeight={'4.5rem'} padding={'0.5rem'} />
        </Box>
        {/* <Box>
          <Link to={FrontendRoute.LOGIN_PAGE}>
            <Button type="button">Login page</Button>
          </Link>
        </Box> */}
      </Flex>
    );
  }
}
export default PasswordResetEmailConfirmationContainer;
