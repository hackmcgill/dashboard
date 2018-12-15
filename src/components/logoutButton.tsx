import * as React from 'react';
import Button from '../shared/Button';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { FrontendRoute, IValidationError } from '../config';
import { APIResponse, Auth } from '../api';
import ValidationErrorGenerator from './ValidationErrorGenerator';

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
