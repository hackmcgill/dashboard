import * as React from 'react';
import PasswordInputComponent from 'src/components/passwordInputComponent';
import Auth from 'src/api/auth';
import { AxiosResponse } from 'axios';
import GetToken from 'src/config/authToken';
export interface IResetPasswordContainerState {
    isValid: boolean;
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
            isValid: false,
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
                    {!this.state.isValid && this.state.isSubmitted && 'Passwords must match!'}
                    <button type='button' onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
    /**
     * Function that calls the reset password function once the form is submitted.
     */
    private handleSubmit(): void {
        const { isValid } = this.state;
        this.setState({ isSubmitted: true });
        if (!isValid) {
            return;
        }
        // TODO: try/catch
        const authToken: string = GetToken();
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
        this.setState((state) => ({ isValid: state.password === confirmation && state.password.length > 0 }));
    }
}
