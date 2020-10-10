import { Box } from '@rebass/grid';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { FrontendRoute } from '../../config';

const SignUpLink: React.StatelessComponent<{}> = (props) => {
  return (
    <Box>
      <p>
        Don't have an account?{' '}
        <Link to={FrontendRoute.CREATE_ACCOUNT_PAGE}>
          <span>Sign up</span>
        </Link>
      </p>
    </Box>
  );
};

export default SignUpLink;
