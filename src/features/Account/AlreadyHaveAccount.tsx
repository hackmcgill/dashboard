import React from 'react';
import { FrontendRoute } from '../../config';
import { LinkDuo } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';

const AlreadyHaveAccount: React.FC<{}> = (props) => {
  return (
    <div className="SignUpLink" style={{ fontFamily: theme.fonts.header }}>
      Already have an account? &nbsp;
      <LinkDuo to={FrontendRoute.LOGIN_PAGE}>
        <span>Sign in</span>
      </LinkDuo>
    </div>
  );
};

export default AlreadyHaveAccount;
