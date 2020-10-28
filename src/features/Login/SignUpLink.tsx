import React from 'react';
import { FrontendRoute } from '../../config';
import { LinkDuo } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';

const SignUpLink: React.FC<{}> = (props) => {
  return (
    <div className="SignUpLink" style={{fontFamily: theme.fonts.header}}>
      Don't have an account?{' '}&nbsp;
      <LinkDuo to={FrontendRoute.CREATE_ACCOUNT_PAGE}>
        <span>Sign up</span>
      </LinkDuo>
    </div>
  );
};

export default SignUpLink;
