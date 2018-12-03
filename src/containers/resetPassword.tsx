import * as React from 'react';
import { AxiosResponse } from 'axios';

import PasswordInputComponent from 'src/components/passwordInputComponent';
import Auth from 'src/api/auth';
import getTokenFromQuery from 'src/config/authToken';
import H1 from 'src/shared/H1';
import Button from 'src/shared/Button';
import { Box, Flex } from '@rebass/grid';
import MaxWidthBox from 'src/shared/MaxWidthBox';
import WithToasterContainer from 'src/hoc/withToaster';
import ValidationErrorGenerator from 'src/components/ValidationErrorGenerator';
import APIResponse from 'src/api/APIResponse';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import FrontendRoute from 'src/config/FrontendRoute';

export interface IResetPasswordContainerState {
    isValid: boolean;
    isSubmitted: boolean;
    password: string;
}

/**
 * Container that renders form to reset a person's password. The auth token must be present in the URL for this to work.
 */
class ResetPasswordContainer extends React.Component<RouteComponentProps, IResetPasswordContainerState>{
    constructor(props: RouteComponentProps) {
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
            <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                <MaxWidthBox maxWidth={'600px'} width={1} ml={'10%'}>
                    <H1 fontSize='24px'>
                        Reset your password
                    </H1>
                </MaxWidthBox>
                <MaxWidthBox maxWidth={'600px'} width={1}>
                    <form>
                        <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                            <Box width={7 / 8}>
                                <PasswordInputComponent
                                    onPasswordChanged={this.onPasswordChanged}
                                    label={'New password'}
                                    id={'new-password'}
                                />
                            </Box>
                            <Box width={7 / 8}>
                                <PasswordInputComponent
                                    onPasswordChanged={this.onConfirmationChanged}
                                    label={'Confirm password'}
                                    id={'confirm-password'}
                                />
                                {!this.state.isValid && this.state.isSubmitted && 'Passwords must match!'}
                            </Box>
                            <Box>
                                <Button type='button' onClick={this.handleSubmit}>Submit</Button>
                            </Box>
                        </Flex>
                    </form>
                </MaxWidthBox>
            </Flex>
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
        try {
            const authToken: string | string[] = getTokenFromQuery();
            Auth.resetPassword(
                this.state.password,
                authToken
            ).then((value: AxiosResponse) => {
                // Good response
                if (value.status === 200) {
                    console.log('Reset password');
                    // Redirec to login page
                    this.props.history.push(FrontendRoute.LOGIN_PAGE);
                }
            }).catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
                if (response) {
                    ValidationErrorGenerator(response.data);
                }
            });
        } catch (error) {
            console.error(error);
        }
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

export default withRouter<RouteComponentProps>(WithToasterContainer(ResetPasswordContainer));