import * as React from 'react';
import PasswordInputComponent from 'src/components/passwordInputComponent';
import Auth from '../api/auth';
import { AxiosResponse } from 'axios';
import EmailInputComponent from 'src/components/emailInputComponent';
import * as QueryString from 'query-string';

export interface ILoginState {
    email: string;
    password: string;
}

/**
 * Container that renders form to log in.
 */
export default class LoginContainer extends React.Component<{}, ILoginState>{
    constructor(props: {}) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
    }
    public render() {
        return (
            <div>
                <h2>Login</h2>
                <form>
                    <EmailInputComponent
                        onEmailChanged={this.onEmailChanged}
                    />

                    <PasswordInputComponent
                        onPasswordChanged={this.onPasswordChanged}
                    />
                    <button type='button' onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
    /**
     * Function that calls the login function once the form is submitted.
     */
    private handleSubmit(): void {
        Auth.login(
            this.state.email,
            this.state.password
        ).then((value: AxiosResponse) => {
            // Good response
            if (value.status === 200) {
                // Probably want to redirect to login page or something
                console.log('Logged in');
                // check if there's a redirect link
                const redir = this.getRedirectLink();
                if (redir) {
                    console.log("requested redirect.")
                    // TODO: implement redirect after react-router is implemented.
                }
            } else {
                console.error(value);
            }
        }).catch((reason) => {
            console.error(reason);
        });
    }
    /**
     * Callback that is called once email is added.
     * @param email The updated email
     */
    private onEmailChanged(email: string) {
        this.setState({ email });
    }
    /**
     * Callback that is called once password is added.
     * @param password The updated password
     */
    private onPasswordChanged(password: string) {
        this.setState({ password });
    }
    /**
     * Returns the redirect link, or undefined if it doesn't exist.
     */
    private getRedirectLink(): any {
        const queries: any = QueryString.parse(location.search);
        return queries.redir.toString();
    }
}
