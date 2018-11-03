import * as React from 'react';
import PasswordInputComponent from '../components/passwordInputComponent';
import Auth from '../api/auth';
import { AxiosResponse } from 'axios';
import * as QueryString from 'query-string';

export interface IResetPasswordContainerState {
    isInvalid: boolean;
    isSubmitted: boolean;
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
        this.onConfirmationChanged = this.onConfirmationChanged.bind(this);
        this.state = {
            isInvalid: false,
            isSubmitted: false,
            password: ''
        }
    }
    public render() {
        return (
            <div>
                <h2>Reset your password</h2>
                <form>
                    <PasswordInputComponent
                        onPasswordChanged={this.onPasswordChanged} label={'New Password'}
                    />
                    <PasswordInputComponent
                        onPasswordChanged={this.onConfirmationChanged} label={'Confirm Password'}
                    />
                    {this.state.isInvalid && this.state.isSubmitted && 'Passwords must match!'}
                    <button type='button' onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
    /**
     * Function that calls the reset password function once the form is submitted.
     */
    private handleSubmit(): void {
        const { isInvalid } = this.state;
        this.setState({isSubmitted: true});
        if (!isInvalid) {
            alert('Passwords must match!');
            return;
        }
        // TODO: try/catch
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
     * Callback that is called once password is updated.
     * @param password The updated password
     */
    private onConfirmationChanged(confirmation: string) {
        this.setState((state) => ({ isInvalid: state.password !== confirmation }));
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
