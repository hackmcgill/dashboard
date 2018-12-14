import * as React from 'react';
import Button from '../shared/Button';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import FrontendRoute from '../config/FrontendRoute';
import { AxiosResponse } from 'axios';
import APIResponse from '../api/APIResponse';
import ValidationErrorGenerator from './ValidationErrorGenerator';
import Auth from '../api/auth';
import IValidationError from '../config/ValidationError';

const LogoutBtn: React.StatelessComponent<RouteComponentProps> = (props: RouteComponentProps) => {
    return (
        <Button onClick={handleLogout(props)}>
            Logout
        </Button>
    )
}

function handleLogout(props: RouteComponentProps): () => void {
    return () => {
        Auth.logout().then(() => {
            props.history.push(FrontendRoute.LOGIN_PAGE);
        }).catch((response: AxiosResponse<APIResponse<IValidationError>>) => {
            if (response && response.data) {
                ValidationErrorGenerator(response.data);
            }
        });
    }
}

export default withRouter<RouteComponentProps>(LogoutBtn);
