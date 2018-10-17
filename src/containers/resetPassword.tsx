import * as React from 'react';
import PasswordInputComponent from '../components/passwordInputComponent';
import Auth from '../api/auth';
import { AxiosResponse } from 'axios';
import * as QueryString from 'query-string';

export interface IResetPasswordContainerState {
    password: string;
}

/**
 * Container that renders form to reset a person's password. The auth token must be present in the URL for this to work.
 */
export default class ResetPasswordContainer extends React.Component<{}, IResetPasswordContainerState>{
    constructor(props: {}) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
    }
    public render() {
        return (
            <div>
                <h2>Reset your password</h2>
                <form>
                    <PasswordInputComponent
                        onPasswordChanged={this.onPasswordChanged}
                    />
                    <button type='button' onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
    /**
     * Function that calls the reset password function once the form is submitted.
     */
    private handleSubmit(): void {
        const authToken: string = this.getAuthTokenFromQuery();
        Auth.resetPassword(
            this.state.password,
            authToken
        ).then((value: AxiosResponse) => {
            // Good response
            if (value.status === 200) {
                // Probably want to redirect to login page or something
                console.log('Reset password');
            }
        }).catch((reason) => {
            console.error(reason);
        });
    }
    /**
     * Callback that is called once password is updated.
     * @param password The updated password
     */
    private onPasswordChanged(password: string) {
        this.setState({ password });
    }
    /**
     * Returns the auth token that is present in the query, or undefined if it doesn't exist.
     */
    private getAuthTokenFromQuery(): string {
        const queries: { token: string } = QueryString.parse(location.search);
        if (!queries.token) {
            throw new Error("Token not present in the query body");
        }
        return queries.token;
    }
}
