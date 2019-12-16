import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { FrontendRoute } from '../../config';
import { LinkDuo } from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';

const LoginBtn: React.StatelessComponent<RouteComponentProps> = () => {
  return (
    <LinkDuo
      to={FrontendRoute.LOGIN_PAGE}
      style={{
        textDecoration: 'none',
        overflow: 'scroll',
      }}
    >
      <Button variant={ButtonVariant.CallToAction}>Login</Button>
    </LinkDuo>
  );
};

export default withRouter<RouteComponentProps>(LoginBtn);