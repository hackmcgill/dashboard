import * as React from 'react';
import { FrontendRoute } from '../../config';
import { LinkDuo } from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';

const LoginBtn: React.FunctionComponent = () => {
  return (
    <LinkDuo
      to={FrontendRoute.LOGIN_PAGE}
      style={{
        textDecoration: 'none',
        overflow: 'none',
      }}
    >
      <Button variant={ButtonVariant.Primary} isOutlined={true}>
        Sign in
      </Button>
    </LinkDuo>
  );
};

export default LoginBtn;
