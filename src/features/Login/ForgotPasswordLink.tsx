import React from 'react';
import { FrontendRoute } from '../../config';
import { LinkDuo } from '../../shared/Elements';

const ForgotPasswordLinkComponent: React.FC<{}> = (props) => {
  return (
    <LinkDuo to={FrontendRoute.FORGOT_PASSWORD_PAGE}>
      <span>Forgot password?</span>
    </LinkDuo>
  );
};

export default ForgotPasswordLinkComponent;
