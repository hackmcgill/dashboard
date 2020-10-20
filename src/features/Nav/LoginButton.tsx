import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { FrontendRoute } from '../../config';
import { LinkDuo } from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';

const LoginBtn: React.FC<RouteComponentProps> = () => {
  return (
    <LinkDuo
      to={FrontendRoute.LOGIN_PAGE}
      style={{
        textDecoration: 'none',
        overflow: 'none',
      }}
    >
      <Button variant={ButtonVariant.Secondary} isOutlined={true}>Sign In</Button>
    </LinkDuo>
  );
};

export default withRouter(LoginBtn);
