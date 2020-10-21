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
      <Button variant={ButtonVariant.Primary} isOutlined={true}>Sign in</Button>
    </LinkDuo>
  );
};

export default withRouter(LoginBtn);
