import { AxiosResponse } from 'axios';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { APIResponse, Auth } from '../../api';
import { FrontendRoute, IValidationError } from '../../config';
import CTAButton from '../../shared/Elements/CTAButton';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';

const LogoutBtn: React.StatelessComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  return <CTAButton onClick={handleLogout(props)}>Logout</CTAButton>;
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

export default withRouter<RouteComponentProps>(LogoutBtn);
