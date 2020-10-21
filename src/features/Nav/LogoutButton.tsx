import React from 'react';
import { AxiosResponse } from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { APIResponse, Auth } from '../../api';
import { FrontendRoute, IValidationError } from '../../config';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';

const LogoutBtn: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  return (
    <Button variant={ButtonVariant.Primary} isOutlined={true} onClick={handleLogout(props)}>
      Sign out
    </Button>
  );
};

function handleLogout(props: RouteComponentProps): () => void {
  return () => {
    Auth.logout()
      .then(() => {
        props.history.push(FrontendRoute.LOGIN_PAGE);
      })
      .catch((response: AxiosResponse<APIResponse<IValidationError>>) => {
        if (response && response.data) {
          ValidationErrorGenerator(response.data);
        }
      });
  };
}

export default withRouter(LogoutBtn);
