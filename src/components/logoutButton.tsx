import * as React from 'react';
import Button from 'src/shared/Button';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { FrontendRoute } from 'src/config';
import APIResponse from 'src/api/APIResponse';
import Auth from 'src/api/auth';
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
        }).catch((response: AxiosResponse<APIResponse>) => {
            if (response && response.data) {
                ValidationErrorGenerator(response.data);
            }
        });
    }
}

export default withRouter<RouteComponentProps>(LogoutBtn);