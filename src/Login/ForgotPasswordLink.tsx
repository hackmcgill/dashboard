import * as React from 'react';
import { Link } from 'react-router-dom';
import { FrontendRoute } from '../config';

const ForgotPasswordLinkComponent: React.StatelessComponent<{}> = (props) => {
  return (
    <Link to={FrontendRoute.FORGOT_PASSWORD_PAGE}>
      <span>Forgot password?</span>
    </Link>
  );
};

export default ForgotPasswordLinkComponent;
