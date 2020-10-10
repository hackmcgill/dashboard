import { Box } from '@rebass/grid';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { FrontendRoute } from '../../config';

const AlreadyHaveAccount: React.StatelessComponent<{}> = (props) => {
  return (
    <Box>
      <p>
        Already have an account?{' '}
        <Link to={FrontendRoute.LOGIN_PAGE}>
          <span>Sign in</span>
        </Link>
      </p>
    </Box>
  );
};

export default AlreadyHaveAccount;
