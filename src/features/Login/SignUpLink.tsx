import React from 'react';
import { Link } from 'react-router-dom';
import { FrontendRoute } from '../../config';
import theme from '../../shared/Styles/theme';

const SignUpLink: React.FC<{}> = (props) => {
  return (
    <div className="SignUpLink" style={{fontFamily: theme.fonts.header}}>
      Don't have an account?{' '}&nbsp;
      <Link to={FrontendRoute.CREATE_ACCOUNT_PAGE}>
        <span>Sign up</span>
      </Link>
    </div>
  );
};

export default SignUpLink;
