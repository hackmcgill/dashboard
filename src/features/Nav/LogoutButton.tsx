import { AxiosResponse } from 'axios';
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { APIResponse, Auth } from '../../api';
import { FrontendRoute, IValidationError } from '../../config';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';

const LogoutBtn: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant={ButtonVariant.Primary}
      isOutlined={true}
      onClick={handleLogout(navigate)}
    >
      Sign out
    </Button>
  );
};

function handleLogout(navigate: NavigateFunction): () => void {
  return () => {
    Auth.logout()
      .then(() => {
        navigate(FrontendRoute.LOGIN_PAGE);
      })
      .catch((response: AxiosResponse<APIResponse<IValidationError>>) => {
        if (response && response.data) {
          ValidationErrorGenerator(response.data);
        }
      });
  };
}

export default LogoutBtn;
