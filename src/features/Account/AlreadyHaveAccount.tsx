import React from 'react';
import { Link } from 'react-router-dom';
import { FrontendRoute } from '../../config';
import theme from '../../shared/Styles/theme';

const AlreadyHaveAccount: React.FC<{}> = (props) => {
  return (
    <div className="SignUpLink" style={{ fontFamily: theme.fonts.header }}>
      Already have an account?{' '}&nbsp;
      <Link to={FrontendRoute.LOGIN_PAGE}>
        <span>Sign in</span>
      </Link>
    </div>
  );
};

export default AlreadyHaveAccount;
