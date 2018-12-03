import * as React from 'react';
import Auth from '../api/auth';
import { AxiosResponse } from 'axios';
import EmailInputComponent from 'src/components/emailInputComponent';
import Key from 'src/assets/images/key.svg';
import Button from 'src/shared/Button';
import Image from 'src/shared/Image';
import { Flex, Box } from '@rebass/grid';
import Paragraph from 'src/shared/Paragraph';
import H1 from 'src/shared/H1';
import Form from 'src/shared/Form';
import { withRouter, RouteComponentProps } from 'react-router';
import MaxWidthBox from 'src/shared/MaxWidthBox';
import PasswordResetEmailConfirmationContainer from 'src/containers/passwordResetEmailConfirmation';
import UserInfoController from 'src/config/UserInfoController';
import ValidationErrorGenerator from 'src/components/ValidationErrorGenerator';
import APIResponse from 'src/api/APIResponse';
import WithToasterContainer from 'src/hoc/withToaster';

export interface IForgotState {
    email: string;
    sentEmail: boolean;
}

/**
 * Container that renders form to log in.
 */
class ForgotPasswordContainer extends React.Component<RouteComponentProps, IForgotState>{
    constructor(props: RouteComponentProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.state = {
            email: '',
            sentEmail: false
        }
    }
    public render() {
        if (this.state.sentEmail) {
            return <PasswordResetEmailConfirmationContainer />
        } else {
            return (
                <Flex
                    flexWrap={'wrap'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    px={2}
                >
                    <Box>
                        <Image src={Key} height={"4rem"} padding={'0rem'} />
                    </Box>
                    <Box>
                        <H1>
                            Password Reset
                        </H1>
                    </Box>
                    <MaxWidthBox fontSize={[2, 3, 4]}>
                        <Paragraph
                            center={true}
                            paddingBottom={'20px'}
                            color={'#4D4D4D'}
                        >
                            Enter your email and we will send you a link to reset your password
                        </Paragraph>
                    </MaxWidthBox>
                    <Box width={'100%'}>
                        <Form onSubmit={this.formSubmitHandler}>
                            <Flex
                                justifyContent={'center'}
                                alignItems={'center'}
                                flexDirection={'column'}>
                                <MaxWidthBox
                                    width={'80%'}
                                >
                                    <EmailInputComponent
                                        onEmailChanged={this.onEmailChanged}
                                        placeholder={'foo@bar.ca'}
                                    />
                                </MaxWidthBox>
                                <Box>
                                    <Button type='button' onClick={this.handleSubmit}>Reset password</Button>
                                </Box>
                            </Flex>
                        </Form>
                    </Box>
                </Flex>
            );
        }
    }

    private formSubmitHandler(e: any) {
        e.preventDefault();
    }

    /**
     * Function that calls the login function once the form is submitted.
     */
    private handleSubmit(): void {
        Auth.forgotPassword(
            this.state.email
        ).then((value: AxiosResponse) => {
            // Good response
            if (value.status === 200) {
                console.log('reset password');
                // Log them out, in case they were already logged in.
                UserInfoController.logOut().then(() => {
                    // Redirect to confirmation page that we sent an email
                    this.setState({
                        sentEmail: true
                    });
                }).catch((error) => {
                    console.error('Could not log out', error);
                });
            } else {
                console.error(value);
            }
        }).catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
            if (response) {
                ValidationErrorGenerator(response.data);
            }
        });
    }
    /**
     * Callback that is called once email is added.
     * @param email The updated email
     */
    private onEmailChanged(email: string) {
        this.setState({ email });
    }
}

export default WithToasterContainer(withRouter<RouteComponentProps>(ForgotPasswordContainer));
